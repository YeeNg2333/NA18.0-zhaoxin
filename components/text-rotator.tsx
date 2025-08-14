"use client"

import { useEffect, useRef, useState } from "react"

interface TextRotatorProps {
  items: React.ReactNode[]
  intervalMs?: number // 每条展示的停留时间
  durationMs?: number // 切换动画时长
}

export default function TextRotator({ items, intervalMs = 1500, durationMs = 300 }: TextRotatorProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const itemRef = useRef<HTMLDivElement | null>(null)
  const [height, setHeight] = useState<number>(0)
  const [index, setIndex] = useState<number>(0)

  // 只测量第一条的高度，统一容器高度，保证平滑下移
  useEffect(() => {
    const measure = () => {
      if (itemRef.current) {
        const h = itemRef.current.offsetHeight
        if (h !== height) setHeight(h)
      }
    }
    measure()

    // 监听窗口变化
    const onResize = () => measure()
    window.addEventListener("resize", onResize)

    // 字体加载后重测
    ;(document as any).fonts?.ready?.then(() => measure())

    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [height])

  // 轮播逻辑
  useEffect(() => {
    if (!items || items.length === 0) return
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length)
    }, intervalMs)
    return () => clearInterval(t)
  }, [items, intervalMs])

  return (
    <div ref={containerRef} className="overflow-hidden" style={{ height: height ? `${height}px` : undefined }}>
      <div
        className="flex flex-col"
        style={{
          transform: `translateY(-${index * height}px)`,
          transition: `transform ${durationMs}ms ease-out`,
        }}
      >
        {items.map((node, i) => (
          <div key={i} ref={i === 0 ? itemRef : undefined} className="text-item">
            {node}
          </div>
        ))}
      </div>
    </div>
  )
}
