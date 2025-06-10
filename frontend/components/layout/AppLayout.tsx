"use client"

import type React from "react"
import { useState, useEffect } from "react"

import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/contexts/ThemeContext"
import Sidebar from "./Sidebar"
import Header from "./Header"
import { Toaster } from "@/components/ui/toaster"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { isAuthenticated } = useAuth()
  const { isDarkMode } = useTheme()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Check initial size

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Subscribe to sidebar collapse state changes from Sidebar component
  const handleSidebarCollapse = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed)
  }

  if (!isAuthenticated) {
    return (
      <div className={isDarkMode ? "dark" : ""}>
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a]">
          {children}
          <Toaster />
        </div>
      </div>
    )
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] flex">
        <Sidebar onCollapseChange={handleSidebarCollapse} />
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
          <Header />
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
        <Toaster />
      </div>
    </div>
  )
}
