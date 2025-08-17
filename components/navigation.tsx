"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const isDepartments = pathname === "/departments"
  const isJoin = pathname === "/join"
  return (
    <header className="w-full flex flex-row items-start gap-0">
      <Link href="/" className="text-sm sm:text-base font-semibold leading-tight transition-colors" style={{ color: "var(--theme-secondary)" }}>
        Network Administration
      </Link>
      <nav className="flex items-start flex-nowrap gap-1 ml-auto justify-end">
        <Link
          className="px-2 md:px-3 py-1 border rounded-sm font-normal text-xs md:text-sm transition-colors"
          style={{
            borderColor: "var(--theme-secondary)",
            backgroundColor: isHome ? "var(--theme-secondary)" : "transparent",
            color: isHome ? "var(--theme-primary)" : "var(--theme-secondary)",
          }}
          onMouseEnter={(e) => {
            // hover 时背景填充副主题色，文字为主题色（无论是否激活）
            e.currentTarget.style.backgroundColor = "var(--theme-secondary)"
            e.currentTarget.style.color = "var(--theme-primary)"
          }}
          onMouseLeave={(e) => {
            // 离开时：激活保持填充+主题色文字；未激活恢复透明+副主题色文字
            e.currentTarget.style.backgroundColor = isHome ? "var(--theme-secondary)" : "transparent"
            e.currentTarget.style.color = isHome ? "var(--theme-primary)" : "var(--theme-secondary)"
          }}
          href="/"
        >
          关于我们
        </Link>
        <Link
          className="px-2 md:px-3 py-1 border rounded-sm font-normal text-xs md:text-sm transition-colors"
          style={{
            borderColor: "var(--theme-secondary)",
            backgroundColor: isDepartments ? "var(--theme-secondary)" : "transparent",
            color: isDepartments ? "var(--theme-primary)" : "var(--theme-secondary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--theme-secondary)"
            e.currentTarget.style.color = "var(--theme-primary)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = isDepartments ? "var(--theme-secondary)" : "transparent"
            e.currentTarget.style.color = isDepartments ? "var(--theme-primary)" : "var(--theme-secondary)"
          }}
          href="/departments"
        >
          部门介绍
        </Link>
        <Link
          className={`px-2 md:px-3 py-1 border rounded-sm font-normal text-xs md:text-sm transition-colors`}
          style={{
            borderColor: "var(--theme-secondary)",
            backgroundColor: isJoin ? "var(--theme-secondary)" : "transparent",
            color: isJoin ? "var(--theme-primary)" : "var(--theme-secondary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--theme-secondary)"
            e.currentTarget.style.color = "var(--theme-primary)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = isJoin ? "var(--theme-secondary)" : "transparent"
            e.currentTarget.style.color = isJoin ? "var(--theme-primary)" : "var(--theme-secondary)"
          }}
          href="/join"
        >
          加入我们
        </Link>
      </nav>
    </header>
  )
}
