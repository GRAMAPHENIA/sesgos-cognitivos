import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Sesgos Cognitivos - Juego Educativo",
  description: "Un juego narrativo educativo sobre sesgos cognitivos",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="fixed top-4 right-4 z-50">
            
          </div>
          <main className="container mx-auto px-4 py-8 relative">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
