"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"

interface TextLineRotatorProps {
  // 每项为一组行文本
  items: string[][]
  intervalMs?: number // 兼容旧用法：总周期（停留 + 动画）
  pauseMs?: number // 新增：固定停留时长，优先级高于 intervalMs 推导
  durationMs?: number // 退出（滑出）单行动画时长
  enterDurationMs?: number // 进入（滑入）单行动画时长
  staggerMs?: number // 单行错峰延时（越大越有“瀑布”感）
  enterEasing?: string // 进入动画缓动（建议使用 ease-in 类型，先慢后快）
  exitEasing?: string // 退出动画缓动
  className?: string
  style?: React.CSSProperties
  lineClassName?: string
}

export default function TextLineRotator({
  items,
  intervalMs = 1800,
  pauseMs,
  durationMs = 300,
  enterDurationMs = 200,
  staggerMs = 60,
  enterEasing = "cubic-bezier(0.4, 0, 1, 1)", // ease-in：先慢后快
  exitEasing = "cubic-bezier(0.22, 1, 0.36, 1)", // 丝滑下滑
  className,
  style,
  lineClassName,
}: TextLineRotatorProps) {
  const [index, setIndex] = useState(0)
  // 动画阶段：idle（停留）、exiting（当前向下滑出）、entering（下一段快速滑入）
  const [phase, setPhase] = useState<"idle" | "exiting" | "entering">("idle")
  const containerRef = useRef<HTMLDivElement | null>(null)
  const measureRef = useRef<HTMLDivElement | null>(null)
  const lineMeasureRef = useRef<HTMLDivElement | null>(null)
  const [height, setHeight] = useState<number>(0)
  const [lineHeight, setLineHeight] = useState<number>(0)

  const currentLines = useMemo(() => items[index] || [], [items, index])
  const nextLines = useMemo(() => items[(index + 1) % items.length] || [], [items, index])
  const linesCount = Math.max(currentLines.length, nextLines.length)
  const safeCurrent = Array.from({ length: linesCount }, (_, i) => currentLines[i] ?? "")
  const safeNext = Array.from({ length: linesCount }, (_, i) => nextLines[i] ?? "")

  // 测量容器高度与单行高度，保持不抖动和行容器固定高度
  useEffect(() => {
    const measure = () => {
      if (measureRef.current) {
        const h = measureRef.current.offsetHeight
        if (h && h !== height) setHeight(h)
      }
      if (lineMeasureRef.current) {
        const lh = lineMeasureRef.current.offsetHeight
        if (lh && lh !== lineHeight) setLineHeight(lh)
      }
    }
    measure()
    const onResize = () => measure()
    window.addEventListener("resize", onResize)
    ;(document as any).fonts?.ready?.then(measure)
    return () => window.removeEventListener("resize", onResize)
  }, [safeCurrent.join("|"), height, lineHeight])

  useEffect(() => {
    if (!items || items.length === 0) return

    const exitTotal = durationMs + (staggerMs || 0) * Math.max(0, linesCount - 1)
    const enterTotal = enterDurationMs + 0 // 进入阶段默认同时，无错峰
    const stayTime = pauseMs != null ? Math.max(0, pauseMs) : Math.max(0, intervalMs - (exitTotal + enterTotal))

    let tIdle: ReturnType<typeof setTimeout> | null = null
    let tExit: ReturnType<typeof setTimeout> | null = null
    let tEnter: ReturnType<typeof setTimeout> | null = null

    const schedule = () => {
      setPhase("idle")
      tIdle = setTimeout(() => {
        // 开始仅“当前行”下滑出
        setPhase("exiting")
        tExit = setTimeout(() => {
          // 当前行刚滑出，立即让下一段“快速滑入”
          setPhase("entering")
          tEnter = setTimeout(() => {
            // 进入完成，切换到下一组，回到 idle 停留
            setIndex((prev) => (prev + 1) % items.length)
            setPhase("idle")
          }, enterDurationMs)
        }, exitTotal)
      }, stayTime)
    }
    schedule()
    return () => {
      tIdle && clearTimeout(tIdle)
      tExit && clearTimeout(tExit)
      tEnter && clearTimeout(tEnter)
    }
  }, [items, index, intervalMs, durationMs, enterDurationMs, staggerMs, pauseMs, linesCount])

  return (
    <div ref={containerRef} className={"overflow-hidden " + (className || "")} style={{ ...(style || {}), height: height || undefined }}>
      {/* 用于测量高度的不可见层 */}
      <div aria-hidden ref={measureRef} className="inline-block" style={{ visibility: "hidden", position: "absolute", pointerEvents: "none" }}>
        <div>
          {safeCurrent.map((text, i) => (
            <div key={i} className={lineClassName || "m-0 text-7xl font-light leading-tight"}>{text}</div>
          ))}
        </div>
      </div>
      {/* 单行高度测量节点 */}
      <div aria-hidden ref={lineMeasureRef} className={lineClassName || "m-0 text-7xl font-light leading-tight"} style={{ visibility: "hidden", position: "absolute", pointerEvents: "none" }}>
        {safeCurrent[0] ?? "示例"}
      </div>

      {/* 可见层：逐行蒙版 + 双层叠放
          规则：
          - idle：当前在 0%，下一段在 -100%
          - exiting：仅当前 0%→100%（先慢后快），下一段保持 -100% 不动
          - entering：当前保持 100%，下一段 -100%→0%（快速滑入）
      */}
      <div>
        {safeCurrent.map((cur, i) => {
          const nxt = safeNext[i]
          const delay = (staggerMs || 0) * i // 允许传入 0 达到“同时移动”的效果
          const transitionCur =
            phase === "exiting"
              ? `transform ${durationMs}ms ${exitEasing} ${delay}ms`
              : "none"
          const transitionNext =
            phase === "entering"
              ? `transform ${enterDurationMs}ms ${enterEasing}`
              : "none" // 非滑动阶段禁用过渡，避免反向错觉
          return (
            <div key={i} className="overflow-hidden" style={{ height: lineHeight || undefined }}>
              <div className="relative" style={{ height: "auto" }}>
                {/* 当前行 */}
                <div
                  className={lineClassName || "m-0 text-7xl font-light leading-tight"}
                  style={{
                    transform: phase === "idle" ? "translateY(0)" : "translateY(100%)",
                    transition: transitionCur,
                  }}
                >
                  {cur}
                </div>
                {/* 下一行：初始在上方，进入时下滑至 0 */}
                <div
                  className={lineClassName || "m-0 text-7xl font-light leading-tight"}
                  style={{
                    position: "absolute",
                    inset: 0,
                    transform:
                      phase === "entering"
                        ? "translateY(0)"
                        : "translateY(-100%)",
                    transition: transitionNext,
                  }}
                >
                  {nxt}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
