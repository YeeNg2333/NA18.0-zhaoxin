import type React from "react"
import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import "./globals.css"
import Navigation from "../components/navigation"
import ThirdSection from "../components/third-section"

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
})

export const metadata: Metadata = {
  title: "NA 网络管理工作站 招新",
  description: "NA协会招新官网 - 网络技术创新未来领航",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`${roboto.variable} antialiased`}>
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
