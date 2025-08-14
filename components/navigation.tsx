"use client"

import Link from "next/link"

interface NavigationProps {
  currentPage?: "home" | "join"
}

export default function Navigation({ currentPage = "home" }: NavigationProps) {
  return (
    <header className="w-full flex justify-between items-center">
      <Link href="/" className="text-lg font-medium transition-colors" style={{ color: "var(--theme-secondary)" }}>
        Network Administration
      </Link>
      <nav className="flex items-center space-x-2">
        <Link
          className="px-4 py-2 border rounded-full transition-colors"
          style={{
            borderColor: "var(--theme-secondary)",
            backgroundColor: "transparent",
            color: "var(--theme-secondary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--theme-secondary)"
            e.currentTarget.style.color = "var(--theme-primary-foreground)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent"
            e.currentTarget.style.color = "var(--theme-secondary)"
          }}
          href="/#about"
        >
          关于我们
        </Link>
        <Link
          className="px-4 py-2 border rounded-full transition-colors"
          style={{
            borderColor: "var(--theme-secondary)",
            backgroundColor: "transparent",
            color: "var(--theme-secondary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--theme-secondary)"
            e.currentTarget.style.color = "var(--theme-primary-foreground)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent"
            e.currentTarget.style.color = "var(--theme-secondary)"
          }}
          href="/#departments"
        >
          部门介绍
        </Link>
        <Link
          className={`px-4 py-2 border rounded-full transition-colors`}
          style={{
            borderColor: "var(--theme-secondary)",
            backgroundColor: currentPage === "join" ? "var(--theme-secondary)" : "transparent",
            color: currentPage === "join" ? "var(--theme-primary-foreground)" : "var(--theme-secondary)",
          }}
          onMouseEnter={(e) => {
            if (currentPage !== "join") {
              e.currentTarget.style.backgroundColor = "var(--theme-secondary)"
              e.currentTarget.style.color = "var(--theme-primary-foreground)"
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== "join") {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.color = "var(--theme-secondary)"
            }
          }}
          href="/join"
        >
          加入我们
        </Link>
      </nav>
    </header>
  )
}
