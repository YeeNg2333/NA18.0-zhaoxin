"use client"

import React, { useEffect, useRef, useState } from "react"
import TextLineRotator from "./text-line-rotator"
import Navigation from "./navigation"
import Image from "next/image"


export default function ThirdSection() {
  const [showQR, setShowQR] = useState(false)
  const [animIn, setAnimIn] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)
  const scrollDirRef = useRef<'down' | 'up'>("down")
  const lastYRef = useRef<number>(0)
  // 桌面端鼠标倾斜效果所需引用与状态
  const imgWrapRef = useRef<HTMLDivElement | null>(null)
  const rafIdRef = useRef<number | null>(null)
  const targetRotRef = useRef({ rx: 0, ry: 0 })
  const currentRotRef = useRef({ rx: 0, ry: 0 })
  // 下滑自动贴齐（平滑滚动）的一次性开关
  const hasAutoSnappedRef = useRef<boolean>(false)
  // 正在执行平滑滚动，防重入与可中断
  const isAnimatingRef = useRef<boolean>(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0
      if (y > lastYRef.current) {
        scrollDirRef.current = 'down'
      } else if (y < lastYRef.current) {
        scrollDirRef.current = 'up'
      }

      // 计算当前公共页可见比例（更精确的可视区域计算）
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      const visible = Math.max(0, Math.min(vh, rect.bottom) - Math.max(0, rect.top))
      const base = Math.min(vh, rect.height)
      const ratio = base > 0 ? visible / base : 0

      // 向下滚动且比例≥0.3：仅触发一次平滑贴齐（自定义动画控制速度）
      if (scrollDirRef.current === 'down' && ratio >= 0.3 && !hasAutoSnappedRef.current && !isAnimatingRef.current) {
        hasAutoSnappedRef.current = true
        const targetY = Math.max(0, window.scrollY + rect.top)
        smoothScrollTo(targetY, 800)
      }

      // 当完全离开该区块很远（可见比例很小）或方向为上，复位一次性标记
      if (ratio < 0.05 || scrollDirRef.current === 'up') {
        hasAutoSnappedRef.current = false
      }

      lastYRef.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // 自定义平滑滚动，时长可控，支持中断
  function smoothScrollTo(targetY: number, duration = 800) {
    const startY = window.scrollY || window.pageYOffset || 0
    const delta = targetY - startY
    if (Math.abs(delta) < 1) return
    const startTime = performance.now()
    isAnimatingRef.current = true

    const ease = (t: number) => {
      // easeOutCubic
      return 1 - Math.pow(1 - t, 3)
    }

    const step = (now: number) => {
      const elapsed = now - startTime
      const t = Math.min(1, elapsed / duration)
      const p = ease(t)
      window.scrollTo(0, startY + delta * p)
      if (t < 1 && isAnimatingRef.current) {
        requestAnimationFrame(step)
      } else {
        isAnimatingRef.current = false
      }
    }

    // 用户上滑则立即中断
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        isAnimatingRef.current = false
        window.removeEventListener('wheel', onWheel)
      }
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    requestAnimationFrame(step)
  }

  const showWeChatQR = () => {
    setShowQR(true)
    // 下一帧触发进入动画
    requestAnimationFrame(() => setAnimIn(true))
  }

  // 按下 ESC 关闭弹窗
  useEffect(() => {
    if (!showQR) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAnimIn(false)
        setTimeout(() => setShowQR(false), 220)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showQR])

  // 仅桌面端（pointer: fine）启用的轻微 3D 倾斜效果
  useEffect(() => {
    const wrap = imgWrapRef.current
    const sectionEl = sectionRef.current
    if (!wrap || !sectionEl) return

    const isFinePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
    if (!isFinePointer) return

    const startRAF = () => {
      if (rafIdRef.current) return
      const step = () => {
        const cur = currentRotRef.current
        const tgt = targetRotRef.current
        cur.rx += (tgt.rx - cur.rx) * 0.12
        cur.ry += (tgt.ry - cur.ry) * 0.12
        wrap.style.transform = `perspective(900px) rotateX(${cur.rx.toFixed(2)}deg) rotateY(${cur.ry.toFixed(2)}deg)`
        if (Math.abs(cur.rx - tgt.rx) < 0.01 && Math.abs(cur.ry - tgt.ry) < 0.01) {
          if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
          rafIdRef.current = null
          return
        }
        rafIdRef.current = requestAnimationFrame(step)
      }
      rafIdRef.current = requestAnimationFrame(step)
    }

    const onMouseMove = (e: MouseEvent) => {
      // 使用整个第三屏 section 的范围进行跟踪
      const rect = sectionEl.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / rect.width
      const dy = (e.clientY - cy) / rect.height
      targetRotRef.current.ry = dx * 10 // 左右倾斜
      targetRotRef.current.rx = -dy * 10 // 上下倾斜
      startRAF()
    }

    const onMouseLeave = () => {
      targetRotRef.current = { rx: 0, ry: 0 }
      startRAF()
    }

    wrap.style.willChange = 'transform'
    // 监听整个 section，这样鼠标在左半部分也能驱动右侧图片
    sectionEl.addEventListener('mousemove', onMouseMove)
    sectionEl.addEventListener('mouseleave', onMouseLeave)
    return () => {
      sectionEl.removeEventListener('mousemove', onMouseMove)
      sectionEl.removeEventListener('mouseleave', onMouseLeave)
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col justify-between p-6 md:p-8 snap-start">
      <Navigation />
      <main className="flex-grow flex flex-col md:flex-row items-start md:items-center justify-center w-full gap-6 md:gap-0">
        <div className="w-full md:w-1/2 relative">
          <TextLineRotator
            intervalMs={1800}
            pauseMs={1500}
            durationMs={650}
            enterDurationMs={300}
            staggerMs={0}
            enterEasing="cubic-bezier(0.23, 1, 0.32, 1)"
            exitEasing="cubic-bezier(0.755, 0.05, 0.855, 0.06)"
            items={[
              ["网络", "让我们相遇", "合作", "共创美好未来"],
              ["技术", "创新", "未来", "领航"],
            ]}
            className=""
            lineClassName="m-0 text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-medium leading-tight"
            style={{ color: 'var(--theme-secondary)' }}
          />
        </div>
        <div ref={imgWrapRef} className="hidden md:block md:w-1/2 md:h-[360px] lg:h-[460px] relative mt-4 md:mt-0">
          <Image
            src="/images/ui/na.svg"
            alt="装饰图形"
            fill
            className="object-contain anti-moire"
            priority
          />
        </div>
      </main>

      <footer className="w-full flex flex-row justify-between items-center gap-4 md:gap-0 mt-6">
        <div className="text-2xl md:text-3xl font-bold" style={{ color: "var(--theme-secondary)" }}>
          NA
        </div>
        <div className="flex space-x-4">
          <button
            onClick={showWeChatQR}
            className="transition-colors cursor-pointer px-3 py-2 text-base md:text-lg"
            style={{ color: "var(--theme-secondary)" }}
          >
            微信
          </button>
        </div>
      </footer>

      {showQR && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity duration-200 ${animIn ? 'bg-black/60 opacity-100' : 'bg-black/0 opacity-0'}`}
          onClick={() => {
            setAnimIn(false)
            setTimeout(() => setShowQR(false), 220)
          }}
        >
          <div
            className={`relative max-w-[92vw] max-h-[92vh] transition-all duration-200 ${animIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/images/uploads/WeChat_Group.jpeg"
              alt="微信群二维码"
              className="max-w-full max-h-[85vh] rounded-md shadow-2xl"
              onClick={() => {
                setAnimIn(false)
                setTimeout(() => setShowQR(false), 220)
              }}
            />
            <button
              aria-label="关闭"
              className="absolute -top-3 -right-3 bg-white/90 text-stone-700 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-white"
              onClick={() => {
                setAnimIn(false)
                setTimeout(() => setShowQR(false), 220)
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
