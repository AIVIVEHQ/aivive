import React from "react"
import type { Metadata } from 'next'
import { Audiowide, DM_Sans, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
  description: 'An AI image feed where every dollar of platform revenue automatically buys back and burns $AVV on Solana. Use the product. Make the asset rarer.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${dmSans.variable} ${audiowide.variable} ${spaceMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
