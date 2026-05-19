import React from "react"
import type { Metadata } from 'next'
import { Audiowide, DM_Sans, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  variable: '--font-audiowide'
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: '--font-dm-sans'
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: '--font-space-mono'
});

export const metadata: Metadata = {
  title: 'AIVIVE - The First Recursive AI Protocol',
  description: 'An AI image feed where a programmable share of platform revenue automatically deflates the underlying network. Use the product. The asset becomes rarer.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${audiowide.variable} ${spaceMono.variable} font-sans antialiased`}>
        {children}
        <Toaster
          theme="dark"
          position="bottom-center"
          toastOptions={{
            style: {
              background: 'oklch(0.199 0.015 172.2 / 0.95)',
              border: '1px solid oklch(0.902 0.152 174.5 / 0.2)',
              color: 'oklch(0.95 0.02 174.5)',
              backdropFilter: 'blur(12px)',
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
