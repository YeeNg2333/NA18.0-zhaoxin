"use client"

import { Button } from "../components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div>
      {/* First Section - Hero */}
      <section className="h-[60vh] flex flex-col p-6 md:p-8">
        <main className="flex-grow flex items-start justify-start w-full pt-8 md:pt-16">
          <div className="max-w-4xl pr-2">
            <h1 className="text-5xl sm:text-5xl md:text-6xl font-light leading-tight text-[var(--theme-secondary)]">
              网络管理工作站招新
            </h1>
          </div>
        </main>
      </section>

      {/* Second Section - About Us (with secondary theme color background) */}
      <section
        className="min-h-[70vh] p-6 md:p-8 flex items-start"
        id="about"
        style={{ backgroundColor: "var(--theme-secondary)", color: "var(--theme-primary)" }}
      >
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-stretch justify-start md:justify-between gap-6 md:gap-0 min-h-[70vh]">
          <div className="w-full md:w-1/3 md:pr-12">
            <h2 className="text-4xl sm:text-4xl md:text-5xl ">关于我们</h2>
          </div>
          <div className="w-full md:w-2/3 md:pl-12 flex flex-col justify-between">
            <p className="text-2xl sm:text-2xl md:text-3xl font-light leading-relaxed">
              我们与学生、企业和教育机构合作，致力于通过真实的技术体验、创新项目和专业服务来塑造网络管理文化
            </p>
            <div className="pt-8 mt-auto hidden md:block">
              <Button
                asChild
                variant="default"
                size="lg"
                className="rounded-full px-7 md:px-10 h-12 text-base md:text-lg w-fit bg-[var(--theme-primary)] text-[var(--theme-secondary)] hover:bg-white hover:text-[var(--theme-primary)] transition-colors"
              >
                <Link href="/departments">部门介绍</Link>
              </Button>
            </div>
          </div>
          {/* Mobile-only bottom button */}
          <div className="pt-8 mt-auto md:hidden">
            <Button
              asChild
              variant="default"
              size="lg"
              className="rounded-full px-7 md:px-10 h-12 text-base md:text-lg w-fit bg-[var(--theme-primary)] text-[var(--theme-secondary)] hover:bg-white hover:text-[var(--theme-primary)] transition-colors"
            >
              <Link href="/departments">部门介绍</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
