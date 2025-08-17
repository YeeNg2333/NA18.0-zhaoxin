import type React from "react"
import type { Metadata } from "next"
import type { Viewport } from "next"
import { Noto_Sans_SC } from "next/font/google"
import "./globals.css"
import Navigation from "../components/navigation"
import ThirdSection from "../components/third-section"

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-sc",
  weight: ["400", "500"],
})

export const metadata: Metadata = {
  title: "NA18.0 2025招新",
  description: "NA协会招新官网 - 网络技术创新未来领航",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`${notoSansSC.variable} antialiased`}>
      <body className="font-sans">
        <div style={{ backgroundColor: "var(--theme-primary)" }} className="text-stone-300 font-light min-h-screen">
          {/* 全站统一头部 */}
          <div className="px-6 py-6 md:px-8 lg:px-12">
            <Navigation />
          </div>

          {/* 页面内容 */}
          {children}

          {/* 全站统一底部（首页最后一页组件复用） */}
          <ThirdSection />
        </div>
      </body>
    </html>
  )
}
