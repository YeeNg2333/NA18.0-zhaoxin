"use client"

import React, { useEffect, useRef } from "react"
import TextLineRotator from "./text-line-rotator"
import Navigation from "./navigation"

export default function ThirdSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const scrollDirRef = useRef<'down' | 'up'>("down")
  const lastYRef = useRef<number>(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio
          // 仅在“向下滑动且明显进入最后一页”时启用吸附；向上滑动时关闭吸附，保持自由滑动
          if (entry.isIntersecting) {
            if (scrollDirRef.current === 'down' && ratio > 0.3) {
              if (document.documentElement.style.scrollSnapType !== 'y proximity') {
                document.documentElement.style.scrollSnapType = 'y proximity'
              }
            } else if (scrollDirRef.current === 'up') {
              if (document.documentElement.style.scrollSnapType !== 'none') {
                document.documentElement.style.scrollSnapType = 'none'
              }
            }
          } else {
            if (document.documentElement.style.scrollSnapType !== 'none') {
              document.documentElement.style.scrollSnapType = 'none'
            }
          }
        })
      },
      { root: null, threshold: [0, 0.3, 1] }
    )

    io.observe(el)
    
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0
      if (y > lastYRef.current) {
        scrollDirRef.current = 'down'
      } else if (y < lastYRef.current) {
        scrollDirRef.current = 'up'
      }
      lastYRef.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      document.documentElement.style.scrollSnapType = 'none'
    }
  }, [])

  const showWeChatQR = () => {
    alert("微信二维码功能待实现")
  }

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col justify-between p-8 snap-start">
      <Navigation />
      <main className="flex-grow flex items-center justify-start w-full">
        <div className="w-1/2 relative">
          <TextLineRotator
            intervalMs={1800}
            pauseMs={1500}
            durationMs={650}
            enterDurationMs={300}
            staggerMs={0}
            enterEasing="cubic-bezier(0.23, 1, 0.32, 1)"
            exitEasing="cubic-bezier(0.755, 0.05, 0.855, 0.06)"
            items={[
              ["网络", "和谐", "文明", "集体"],
              ["技术", "创新", "未来", "领航"],
            ]}
            className=""
            lineClassName="m-0 text-7xl font-light leading-tight"
            style={{ color: 'var(--theme-secondary)' }}
          />
        </div>
        <div className="w-1/2 h-full relative">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" viewBox="0 0 400 400">
            <path
              d="M 350,50 L 350,200 L 200,350 L 50,200 L 200,50 L 350,200"
              fill="none"
              style={{ stroke: 'var(--theme-secondary)' }}
              strokeWidth="2"
            ></path>
          </svg>
        </div>
      </main>

      <footer className="w-full flex justify-between items-center">
        <div className="text-3xl font-bold" style={{ color: "var(--theme-secondary)" }}>
          NA
        </div>
        <div className="flex space-x-4">
          <button
            onClick={showWeChatQR}
            className="transition-colors cursor-pointer"
            style={{ color: "var(--theme-secondary)" }}
          >
            微信
          </button>
        </div>
      </footer>
    </section>
  )
}
