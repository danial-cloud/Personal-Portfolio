"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, Menu, PanelLeft, Eye } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/sidebar"
import { ThemeDropdown } from "@/components/theme-dropdown"

interface PortfolioSuiteProps {
  children: React.ReactNode
}

export function PortfolioSuite({ children }: PortfolioSuiteProps) {
  const pathname = usePathname()
  const activeTab = pathname === "/" ? "home" : pathname.substring(1)

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Refs for each tab trigger to measure their position and width
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})
  const tabsListRef = useRef<HTMLDivElement | null>(null)

  // State to store the underline's dynamic style
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 })

  // Effect to update underline position and width when activeTab changes
  useEffect(() => {
    if (activeTab && tabRefs.current[activeTab] && tabsListRef.current) {
      const activeTabElement = tabRefs.current[activeTab]
      const tabsListElement = tabsListRef.current
      const tabRect = activeTabElement.getBoundingClientRect()
      const listRect = tabsListElement.getBoundingClientRect()
      setUnderlineStyle({
        left: tabRect.left - listRect.left,
        width: tabRect.width,
      })
    }
  }, [activeTab])

  return (
    <div className="relative min-h-screen overflow-hidden bg-background transition-colors duration-300">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-20 dark:opacity-10"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(120, 41, 190, 0.5) 0%, rgba(53, 71, 125, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 30% 70%, rgba(233, 30, 99, 0.5) 0%, rgba(81, 45, 168, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 70% 30%, rgba(76, 175, 80, 0.5) 0%, rgba(32, 119, 188, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 50% 50%, rgba(120, 41, 190, 0.5) 0%, rgba(53, 71, 125, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
          ],
        }}
        transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
      <Sidebar
        sidebarOpen={sidebarOpen}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        currentSection={activeTab}
      />

      {/* Main Content */}
      <div className={cn("min-h-screen transition-all duration-300 ease-in-out", sidebarOpen ? "md:pl-64" : "md:pl-0")}>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden !cursor-pointer"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <PanelLeft className="h-5 w-5" />
          </Button>
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            {/* Right side actions - Clean and organized */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle Dropdown */}
              <ThemeDropdown />
              {/* Social Links */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-2xl max-md:hidden" asChild>
                      <a href="https://github.com/dev-shehzad" target="_blank" rel="noopener noreferrer">
                        <Github className="h-5 w-5" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>GitHub Profile</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-2xl max-md:hidden" asChild>
                      <a href="https://www.linkedin.com/in/dev-shehzad" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>LinkedIn Profile</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* Direct Email Link */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-2xl max-md:hidden" asChild>
                      <a href="mailto:info@muhammad-shehzad.com">
                        <Mail className="h-5 w-5" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Send Email</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* View CV Button Only */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-2xl bg-transparent hidden max-[810px]:!hidden sm:flex" asChild>
                      <a href="/resume/shehzad.pdf" target="_blank" rel="noopener noreferrer">
                        <Eye className="mr-2 h-4 w-4" />
                        View CV
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>View Resume</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* Contact Section Button */}
              <Button
                className="rounded-2xl cursor-pointer bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors duration-200"
                size="sm"
                asChild
              >
                <Link href="/contact">
                  <span className="hidden sm:inline">Get In Touch</span>
                  <span className="sm:hidden">Contact</span>
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <Tabs value={activeTab} className="w-full">
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <TabsList
                ref={tabsListRef}
                className="grid max-md:mx-auto w-full max-w-[600px] grid-cols-5 rounded-2xl p-1 bg-transparent relative"
              >
                <Link href="/">
                  <TabsTrigger
                    ref={(el) => {
                      tabRefs.current["home"] = el
                    }}
                    value="home"
                    className="rounded-xl cursor-pointer transition-all duration-200 hover:text-foreground hover:font-semibold hover:shadow-none data-[state=active]:text-foreground data-[state=active]:font-semibold data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Home
                  </TabsTrigger>
                </Link>
                <Link href="/projects">
                  <TabsTrigger
                    ref={(el) => {
                      tabRefs.current["projects"] = el
                    }}
                    value="projects"
                    className="rounded-xl cursor-pointer transition-all duration-200 hover:text-foreground hover:font-semibold hover:shadow-none data-[state=active]:text-foreground data-[state=active]:font-semibold data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Projects
                  </TabsTrigger>
                </Link>
                <Link href="/about">
                  <TabsTrigger
                    ref={(el) => {
                      tabRefs.current["about"] = el
                    }}
                    value="about"
                    className="rounded-xl cursor-pointer transition-all duration-200 hover:text-foreground hover:font-semibold hover:shadow-none data-[state=active]:text-foreground data-[state=active]:font-semibold data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    About
                  </TabsTrigger>
                </Link>
                <Link href="/reviews">
                  <TabsTrigger
                    ref={(el) => {
                      tabRefs.current["reviews"] = el
                    }}
                    value="reviews"
                    className="rounded-xl cursor-pointer transition-all duration-200 hover:text-foreground hover:font-semibold hover:shadow-none data-[state=active]:text-foreground data-[state=active]:font-semibold data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Reviews
                  </TabsTrigger>
                </Link>
                <Link href="/contact">
                  <TabsTrigger
                    ref={(el) => {
                      tabRefs.current["contact"] = el
                    }}
                    value="contact"
                    className="rounded-xl cursor-pointer transition-all duration-200 hover:text-foreground hover:font-semibold hover:shadow-none data-[state=active]:text-foreground data-[state=active]:font-semibold data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Contact
                  </TabsTrigger>
                </Link>
                {/* Single animated underline at the bottom of TabsList */}
                {activeTab && (
                  <motion.div
                    className="absolute bottom-0 h-0.5 tab-underline"
                    style={{ left: underlineStyle.left, width: underlineStyle.width }}
                    transition={{ duration: 0.2 }}
                    layout
                  />
                )}
              </TabsList>
              {/* Mobile View CV Button */}
              <div className="flex sm:hidden max-md:hidden">
                <Button variant="outline" size="sm" className="rounded-2xl bg-transparent" asChild>
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    <Eye className="mr-2 h-4 w-4" />
                    View CV
                  </a>
                </Button>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
