import type { Metadata } from 'next'
import './globals.css'
import { Footer } from '@/components/ui/footer'
import { NavbarWrapper } from '@/components/ui/navbar-wrapper'
import React from 'react'

export const metadata: Metadata = {
  title: 'OSLearn - Gamified Operating Systems Learning',
  description: 'Master Operating Systems through an engaging, game-based learning experience',
  generator: 'v0.dev',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <NavbarWrapper />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
