"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "dark" | "light"
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  resolvedTheme: "light",
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("light")
  const [mounted, setMounted] = useState(false)

  const applyTheme = useCallback((newTheme: Theme) => {
    const root = window.document.documentElement

    // Remove existing theme classes efficiently
    root.classList.remove("light", "dark")

    let actualTheme: "dark" | "light"

    if (newTheme === "system") {
      actualTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    } else {
      actualTheme = newTheme
    }

    // Apply new theme class
    root.classList.add(actualTheme)
    setResolvedTheme(actualTheme)
  }, [])

  useEffect(() => {
    setMounted(true)

    // Get stored theme on mount
    const storedTheme = localStorage.getItem(storageKey) as Theme
    const initialTheme = storedTheme || defaultTheme

    setTheme(initialTheme)
    applyTheme(initialTheme)
  }, [defaultTheme, storageKey, applyTheme])

  useEffect(() => {
    if (!mounted) return

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleSystemThemeChange = () => {
      if (theme === "system") {
        applyTheme("system")
      }
    }

    mediaQuery.addEventListener("change", handleSystemThemeChange)
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange)
  }, [theme, applyTheme, mounted])

  const handleSetTheme = useCallback(
    (newTheme: Theme) => {
      // Update localStorage immediately
      localStorage.setItem(storageKey, newTheme)

      // Update state
      setTheme(newTheme)

      // Apply theme immediately
      applyTheme(newTheme)
    },
    [storageKey, applyTheme],
  )

  const value = {
    theme,
    setTheme: handleSetTheme,
    resolvedTheme,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
