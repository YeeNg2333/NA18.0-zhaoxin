"use client"

import React from "react"
import Navigation from "./navigation"
import TextLineRotator from "./text-line-rotator"

interface ThirdSectionProps {
  currentPage?: "home" | "join"
}

export default function ThirdSection({ currentPage = "home" }: ThirdSectionProps) {
  const showWeChatQR = () => {
    alert("微信二维码功能待实现")
  }

  return (
    <section className="min-h-screen flex flex-col justify-between p-8">
      <Navigation currentPage={currentPage} />

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
