"use client"

import { Monitor, Moon, Sun, Check } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useCallback, useEffect, useState } from "react"

export function ThemeDropdown() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const getThemeIcon = useCallback(() => {
    if (!mounted) {
      return <Monitor className="h-5 w-5 transition-all duration-200" />
    }
    if (theme === "light") {
      return <Sun className="h-5 w-5 transition-all duration-200" />
    } else if (theme === "dark") {
      return <Moon className="h-5 w-5 transition-all duration-200" />
    } else {
      return <Monitor className="h-5 w-5 transition-all duration-200" />
    }
  }, [theme, mounted])

  const getThemeLabel = useCallback(() => {
    if (theme === "light") return "Light"
    if (theme === "dark") return "Dark"
    return "System"
  }, [theme])

  const handleThemeChange = useCallback(
    (newTheme: "light" | "dark" | "system") => {
      setTheme(newTheme)
    },
    [setTheme],
  )

  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-2xl cursor-pointer transition-colors duration-200">
                {getThemeIcon()}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <DropdownMenuContent align="end" className="rounded-2xl min-w-[140px] dropdown-content">
            <DropdownMenuItem
              onClick={() => handleThemeChange("light")}
              className="rounded-xl cursor-pointer flex items-center justify-between transition-colors duration-150"
            >
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <span>Light</span>
              </div>
              {theme === "light" && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleThemeChange("dark")}
              className="rounded-xl cursor-pointer flex items-center justify-between transition-colors duration-150"
            >
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                <span>Dark</span>
              </div>
              {theme === "dark" && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleThemeChange("system")}
              className="rounded-xl cursor-pointer flex items-center justify-between transition-colors duration-150"
            >
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                <span>System</span>
              </div>
              {theme === "system" && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <TooltipContent className="tooltip-content">
          Current: {getThemeLabel()} {mounted && theme === "system" && `(${resolvedTheme})`}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
