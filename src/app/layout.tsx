import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { BottomNav } from "@/components/bottom-nav"
import { ServiceWorkerRegister } from "@/components/sw-register"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "PE Guidelines 2026",
  description: "AHA/ACC 2026 — Escalas clínicas y categorías para TEP agudo",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "PE Guidelines",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0a0a0a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <main className="flex-1 pb-20 overflow-y-auto">{children}</main>
        <BottomNav />
        <ServiceWorkerRegister />
      </body>
    </html>
  )
}
