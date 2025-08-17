import type { Metadata } from 'next'
import type React from 'react'

export const metadata: Metadata = {
  title: 'NA18.0 加入我们',
}

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
