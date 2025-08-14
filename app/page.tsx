"use client"

import Navigation from "../components/navigation"
import ThirdSection from "../components/third-section"
import { Button } from "../components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "var(--theme-primary)" }} className="text-stone-300 font-light">
      {/* First Section - Hero (75vh) */}
      <section className="h-[75vh] flex flex-col p-8">
        <Navigation currentPage="home" />

        <main className="flex-grow flex items-start justify-start w-full pt-16">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-light leading-tight">
              网络管理技术伙伴，专注网站建设、品牌推广与技术创新。
            </h1>
          </div>
        </main>
      </section>

      {/* Second Section - About Us (with secondary theme color background) */}
      <section
        id="about"
        className="min-h-[100vh] p-8 flex items-start"
        style={{ backgroundColor: "var(--theme-secondary)", color: "var(--theme-primary)" }}
      >
        <div className="max-w-6xl w-full flex items-stretch justify-between min-h-[100vh]">
          <div className="w-1/3 pr-12">
            <h2 className="text-6xl font-bold">关于我们</h2>
          </div>
          <div className="w-2/3 pl-12 flex flex-col justify-between">
            <p className="text-2xl md:text-3xl font-light leading-relaxed">
              我们与学生、企业和教育机构合作，致力于通过真实的技术体验、创新项目和专业服务来塑造网络管理文化。
            </p>
            <div className="pt-8">
              <Button
                asChild
                variant="default"
                size="lg"
                className="rounded-full px-8 h-11 text-base w-fit bg-[var(--theme-primary)] text-[var(--theme-secondary)] hover:bg-white hover:text-[var(--theme-primary)] transition-colors"
              >
                <Link href="/#departments">部门介绍</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Third Section - Using shared component */}
      <ThirdSection currentPage="home" />
    </div>
  )
}
