"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ChevronDown, X, Search, Sun, Moon, Copy, ExternalLink, User, FileText, Mail } from "lucide-react"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { sidebarItems } from "@/data/sidebar-data"
import { allProjects } from "@/data/projects-data"
import { contactInfo } from "@/data/contact-data"
import { reviewsStats } from "@/data/reviews-data"
import { blogPosts } from "@/data/blog-data"
import { services } from "@/data/services-data"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SidebarProps {
  sidebarOpen: boolean
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  currentSection?: string
}

export function Sidebar({ sidebarOpen, mobileMenuOpen, setMobileMenuOpen, currentSection = "home" }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)
  const { theme, setTheme } = useTheme()
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Auto-expand sidebar categories based on current page
  useEffect(() => {
    // Check if we're on a blog slug page
    if (pathname.startsWith('/blog/') && pathname !== '/blog') {
      const blogSlug = pathname.split('/blog/')[1]
      const currentBlog = blogPosts.find(blog => blog.slug === blogSlug)
      if (currentBlog) {
        setExpandedItems(prev => ({
          ...prev,
          'Blog': true
        }))
      }
    }
    
    // Check if we're on a service slug page
    if (pathname.startsWith('/services/') && pathname !== '/services') {
      const serviceSlug = pathname.split('/services/')[1]
      const currentService = services.find(service => service.slug === serviceSlug)
      if (currentService) {
        setExpandedItems(prev => ({
          ...prev,
          'Services': true
        }))
      }
    }
  }, [pathname])


  // Use static sidebar items
  const dynamicSidebarItems = sidebarItems

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => {
      // If clicking on the same item, toggle it
      if (prev[title]) {
        return {
          ...prev,
          [title]: false,
        }
      } else {
        // If clicking on a different item, close all others and open this one
        const newState: Record<string, boolean> = {}
        Object.keys(prev).forEach(key => {
          newState[key] = false
        })
        newState[title] = true
        return newState
      }
    })
  }


  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setShowSearchSuggestions(value.length > 0)
    // Don't navigate immediately - just show suggestions
  }

  // Simple focus management
  useEffect(() => {
    if (searchInputRef.current && searchQuery && document.activeElement !== searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchQuery])

  const handleSearchFocus = () => {
    setShowSearchSuggestions(searchQuery.length > 0)
  }


  const handleSearchBlur = (e: React.FocusEvent) => {
    // Only hide suggestions if focus is moving to a different element
    // Don't hide if clicking on suggestions
    const relatedTarget = e.relatedTarget as HTMLElement
    if (!relatedTarget || !relatedTarget.closest('.search-suggestions')) {
      setTimeout(() => {
        setShowSearchSuggestions(false)
      }, 150)
    }
  }

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push(`/projects?search=${encodeURIComponent(searchQuery)}`)
      setShowSearchSuggestions(false)
      setMobileMenuOpen(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit()
    }
  }

  const handleCategoryClick = (category: string) => {
    const url = category === "All" ? "/projects" : `/projects?category=${encodeURIComponent(category)}`
    router.push(url)
    setMobileMenuOpen(false)
  }

  const handleSectionClick = (section: string) => {
    const sectionPath = section.toLowerCase() === "home" ? "/" : `/${section.toLowerCase()}`
    router.push(sectionPath)
    setMobileMenuOpen(false)
  }

  const handleSubItemClick = (item: any, subItem: any) => {
    if (item.title === "Projects") {
      const categoryToFilter = subItem.category || "All"
      handleCategoryClick(categoryToFilter)
    } else if (item.title === "About") {
      const filter = subItem.category || subItem.title
      const url = filter === "All" ? "/about" : `/about?filter=${encodeURIComponent(filter)}`
      router.push(url)
      setMobileMenuOpen(false)
    } else if (item.title === "Services") {
      const filter = subItem.category || subItem.title
      if (filter === "All Services") {
        router.push("/services")
      } else {
        router.push(`/services?category=${encodeURIComponent(filter)}`)
      }
      setMobileMenuOpen(false)
    } else if (item.title === "Pricing") {
      router.push("/pricing")
      setMobileMenuOpen(false)
    } else if (item.title === "Blog") {
      const filter = subItem.category || subItem.title
      if (filter === "All Articles") {
        router.push("/blog")
      } else {
        router.push(`/blog?category=${encodeURIComponent(filter)}`)
      }
      setMobileMenuOpen(false)
    } else if (item.title === "Reviews") {
      const filterValue = subItem.category
      if (subItem.category === "Upwork Profile") {
        window.open("https://www.upwork.com/freelancers/~010d7fa4fa17b2c487?mp_source=share", "_blank")
      } else {
        const url = filterValue === "All Reviews" ? "/reviews" : `/reviews?filter=${encodeURIComponent(filterValue)}`
        router.push(url)
      }
      setMobileMenuOpen(false)
    } else if (item.title === "Contact") {
      const filter = subItem.category || subItem.title
      const url = filter === "Contact" ? "/contact" : `/contact?filter=${encodeURIComponent(filter)}`
      router.push(url)
      setMobileMenuOpen(false)
    }
  }

  // Generate search suggestions with debouncing
  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return []
    const query = searchQuery.toLowerCase()
    const suggestions = new Set<string>()
    
    // Add projects
    allProjects.forEach((project) => {
      if (project.name.toLowerCase().includes(query)) {
        suggestions.add(project.name)
      }
      project.technologies.forEach((tech) => {
        if (tech.toLowerCase().includes(query)) {
          suggestions.add(tech)
        }
      })
      if (project.category) {
        project.category.forEach((cat) => {
          if (cat.toLowerCase().includes(query)) {
            suggestions.add(cat)
          }
        })
      }
    })
    
    // Add blog posts
    blogPosts.forEach((blog) => {
      if (blog.title.toLowerCase().includes(query)) {
        suggestions.add(blog.title)
      }
      if (blog.category.toLowerCase().includes(query)) {
        suggestions.add(blog.category)
      }
      blog.tags.forEach((tag) => {
        if (tag.toLowerCase().includes(query)) {
          suggestions.add(tag)
        }
      })
    })
    
    // Add services
    services.forEach((service) => {
      if (service.title.toLowerCase().includes(query)) {
        suggestions.add(service.title)
      }
      if (service.category.toLowerCase().includes(query)) {
        suggestions.add(service.category)
      }
      service.technologies.forEach((tech) => {
        if (tech.toLowerCase().includes(query)) {
          suggestions.add(tech)
        }
      })
    })
    
    return Array.from(suggestions).slice(0, 8)
  }, [searchQuery])

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    setShowSearchSuggestions(false)
    
    // Check if suggestion is a blog post
    const blogPost = blogPosts.find(blog => blog.title === suggestion)
    if (blogPost) {
      router.push(`/blog/${blogPost.slug}`)
      setMobileMenuOpen(false)
      return
    }
    
    // Check if suggestion is a service
    const service = services.find(service => service.title === suggestion)
    if (service) {
      router.push(`/services/${service.slug}`)
      setMobileMenuOpen(false)
      return
    }
    
    // Check if suggestion is a blog category
    const blogCategory = blogPosts.find(blog => blog.category === suggestion)
    if (blogCategory) {
      router.push(`/blog?category=${encodeURIComponent(suggestion)}`)
      setMobileMenuOpen(false)
      return
    }
    
    // Check if suggestion is a service category
    const serviceCategory = services.find(service => service.category === suggestion)
    if (serviceCategory) {
      router.push(`/services?category=${encodeURIComponent(suggestion)}`)
      setMobileMenuOpen(false)
      return
    }
    
    // Default to projects search
    router.push(`/projects?search=${encodeURIComponent(suggestion)}`)
    setMobileMenuOpen(false)
  }

  const handleSuggestionMouseDown = (e: React.MouseEvent) => {
    // Prevent input from losing focus when clicking suggestions
    e.preventDefault()
  }

  // Helper function to check if a submenu item is selected
  const isSubItemSelected = (item: any, subItem: any) => {
    if (item.title === "Projects") {
      const isProjectsSection = pathname === "/projects"
      const categoryParam = searchParams.get("category")
      const categoryMatches = categoryParam === subItem.category || (!categoryParam && subItem.category === "All")
      return isProjectsSection && categoryMatches
    } else if (item.title === "About") {
      const isAboutSection = pathname === "/about"
      const filterParam = searchParams.get("filter")
      const filterMatches =
        filterParam === subItem.category ||
        filterParam === subItem.title ||
        (!filterParam && (subItem.category === "All" || subItem.title === "All"))
      return isAboutSection && filterMatches
    } else if (item.title === "Services") {
      const isServicesSection = pathname === "/services"
      const isServiceSlug = pathname.startsWith("/services/") && pathname !== "/services"
      
      // For service slug pages, check if the current service matches the category
      if (isServiceSlug) {
        const serviceSlug = pathname.split('/services/')[1]
        const currentService = services.find(service => service.slug === serviceSlug)
        return currentService && currentService.category === subItem.category
      }
      
      // For services main page
      const categoryParam = searchParams.get("category")
      const categoryMatches = categoryParam === subItem.category || (!categoryParam && subItem.category === "All Services")
      return isServicesSection && categoryMatches
    } else if (item.title === "Pricing") {
      return pathname === "/pricing"
    } else if (item.title === "Blog") {
      const isBlogSection = pathname === "/blog"
      const isBlogSlug = pathname.startsWith("/blog/") && pathname !== "/blog"
      
      // For blog slug pages, check if the current blog matches the category
      if (isBlogSlug) {
        const blogSlug = pathname.split('/blog/')[1]
        const currentBlog = blogPosts.find(blog => blog.slug === blogSlug)
        return currentBlog && currentBlog.category === subItem.category
      }
      
      // For blog main page
      const categoryParam = searchParams.get("category")
      const categoryMatches = categoryParam === subItem.category || (!categoryParam && subItem.category === "All Articles")
      return isBlogSection && categoryMatches
    } else if (item.title === "Reviews") {
      const isReviewsSection = pathname === "/reviews"
      const filterParam = searchParams.get("filter")
      const filterMatches = filterParam === subItem.category || (!filterParam && subItem.category === "All Reviews")
      return isReviewsSection && filterMatches
    } else if (item.title === "Contact") {
      const isContactSection = pathname === "/contact"
      const filterParam = searchParams.get("filter")
      const filterMatches =
        filterParam === subItem.category ||
        filterParam === subItem.title ||
        (!filterParam && (subItem.category === "Contact" || subItem.title === "Contact"))
      return isContactSection && filterMatches
    }
    return false
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-background border-r border-border">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="flex aspect-square size-10 items-center justify-center rounded-[50%] overflow-hidden border-2 border-primary/20">
            <img
              src="/danial.png"
              alt={contactInfo.personal.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none"
                if (e.currentTarget.nextElementSibling) {
                  ;(e.currentTarget.nextElementSibling as HTMLElement).style.display = "flex"
                }
              }}
            />
            <div className="hidden aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white dark:from-purple-500 dark:to-blue-500">
              <User className="size-5" />
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-foreground">{contactInfo.personal.name}</h2>
            <p className="text-xs text-muted-foreground">{contactInfo.personal.title}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden cursor-pointer hover:bg-muted/50" 
          onClick={() => setMobileMenuOpen(false)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="px-3 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="Search projects, skills..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={handleSearchFocus}
            className="w-full rounded-2xl bg-muted/50 pl-9 pr-4 py-2 border-0 focus-visible:ring-1 focus-visible:ring-ring"
            autoComplete="off"
          />
          {showSearchSuggestions && searchSuggestions.length > 0 && (
            <div className="search-suggestions absolute top-full left-0 right-0 z-10 mt-1 bg-background border border-border rounded-2xl shadow-lg">
              {searchSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-2 hover:bg-muted/50 first:rounded-t-2xl last:rounded-b-2xl transition-colors cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseDown={handleSuggestionMouseDown}
                >
                  <div className="flex items-center gap-2">
                    <Search className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <ScrollArea className="flex-1 px-3 py-2">
        <div className="space-y-1">
          {dynamicSidebarItems.map((item) => (
            <div key={item.title} className="mb-1">
              {item.items ? (
                <button
                  className={cn(
                    "flex w-full items-center cursor-pointer justify-between rounded-2xl px-3 py-2 text-sm font-medium transition-colors",
                    pathname === `/${item.title.toLowerCase()}` || (item.title === "Home" && pathname === "/")
                      ? "bg-primary/8 text-primary dark:bg-primary/15"
                      : "hover:bg-muted/50 text-foreground",
                  )}
                  onClick={() => {
                    // Navigate to main page first
                    if (item.title === "Home") {
                      router.push("/")
                    } else if (item.title === "Services") {
                      router.push("/services")
                    } else if (item.title === "Pricing") {
                      router.push("/pricing")
                    } else if (item.title === "Case Studies") {
                      router.push("/case-studies")
                    } else if (item.title === "Blog") {
                      router.push("/blog")
                    } else {
                      router.push(`/${item.title.toLowerCase()}`)
                    }
                    setMobileMenuOpen(false)
                    // Also toggle expanded state
                    toggleExpanded(item.title)
                  }}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform", expandedItems[item.title] ? "rotate-180" : "")}
                    />
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (item.title === "Home") {
                      router.push("/")
                    } else if (item.title === "Services") {
                      router.push("/services")
                    } else if (item.title === "Pricing") {
                      router.push("/pricing")
                    } else if (item.title === "Case Studies") {
                      router.push("/case-studies")
                    } else if (item.title === "Blog") {
                      router.push("/blog")
                    } else {
                      router.push(`/${item.title.toLowerCase()}`)
                    }
                    setMobileMenuOpen(false)
                  }}
                  className={cn(
                    "flex w-full items-center cursor-pointer justify-between rounded-2xl px-3 py-2 text-sm font-medium transition-colors",
                    pathname === `/${item.title.toLowerCase()}` || (item.title === "Home" && pathname === "/")
                      ? "bg-primary/8 text-primary dark:bg-primary/15"
                      : "hover:bg-muted/50 text-foreground",
                  )}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                </button>
              )}
              {item.items && expandedItems[item.title] && (
                <div className="mt-1 ml-6 space-y-1 border-l border-border pl-3">
                  {item.items.map((subItem) => {
                    const isSelected = isSubItemSelected(item, subItem)
                    return (
                      <button
                        key={subItem.title}
                        onClick={() => handleSubItemClick(item, subItem)}
                        className={cn(
                          "flex w-full items-center justify-between cursor-pointer rounded-2xl px-3 py-2 text-sm transition-colors text-left group",
                          "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <div className="flex items-center gap-2">
                          {subItem.icon}
                          <span className={cn(isSelected && "text-foreground font-medium")}>{subItem.title}</span>
                        </div>
                        {isSelected && (
                          <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse shadow-sm" />
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
          {currentSection === "contact" && (
            <div className="mt-4 p-3 bg-muted/50 backdrop-blur-sm rounded-2xl border border-border/50">
              <h3 className="font-semibold text-sm mb-3">Get In Touch</h3>
              <div className="space-y-2">
                {contactInfo.contactMethods.map((method) => (
                  <div key={method.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <method.icon className="h-4 w-4" />
                    <span>{method.value}</span>
                  </div>
                ))}
                <div className="flex gap-2 mt-3">
                  {contactInfo.social.map((social) => (
                    <Button
                      key={social.name}
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-xl bg-background/80 backdrop-blur-sm"
                      asChild
                    >
                      <a href={social.href} target="_blank" rel="noopener noreferrer">
                        <social.icon className="h-4 w-4" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {currentSection === "reviews" && (
            <div className="mt-4 p-3 bg-muted/30 backdrop-blur-sm rounded-2xl border-[0.3px] border-border/10">
              <h3 className="font-semibold text-sm mb-3">Upwork Reviews</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>⭐ 5.0 Average Rating</p>
                <p>📝 {reviewsStats.totalReviews} Total Reviews</p>
                <p>✅ 100% Positive Feedback</p>
                <p>⚡ {reviewsStats.responseTime} Response Time</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-3 rounded-xl bg-background/80 backdrop-blur-sm"
                asChild
              >
                <a href="https://www.upwork.com/freelancers/~010d7fa4fa17b2c487?mp_source=share" target="_blank" rel="noopener noreferrer">
                  View Upwork Profile
                </a>
              </Button>
            </div>
          )}
          {currentSection === "about" && (
            <div className="mt-4 p-3 bg-muted/50 backdrop-blur-sm rounded-2xl border border-border/50">
              <h3 className="font-semibold text-sm mb-3">Quick Info</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                {contactInfo.quickInfo.map((info, index) => (
                  <p key={index}>{info}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t border-border p-3">
        <div className="space-y-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full overflow-hidden border border-border">
                    <img
                      src="/shehzad.jpg"
                      alt={contactInfo.personal.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                        if (e.currentTarget.nextElementSibling) {
                          ;(e.currentTarget.nextElementSibling as HTMLElement).style.display = "flex"
                        }
                      }}
                    />
                    <div className="hidden h-6 w-6 rounded-full bg-primary/10 items-center justify-center text-xs font-medium">
                      {contactInfo.personal.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </div>
                  <span className="text-foreground">{contactInfo.personal.name}</span>
                </div>
                <Badge
                  variant="outline"
                  className="ml-auto border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400"
                >
                  Available
                </Badge>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-2xl" align="end" side="right">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{contactInfo.personal.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{contactInfo.personal.title}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-xl cursor-pointer" asChild>
                <Link href="/about">
                  <User className="mr-2 h-4 w-4" />
                  <span>About Me</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl cursor-pointer" asChild>
                <a href={contactInfo.links.resumePdf} target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Download Resume</span>
                  <ExternalLink className="ml-auto h-3 w-3" />
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl cursor-pointer" asChild>
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Contact Me</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="rounded-xl cursor-pointer"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark Mode</span>
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarContent />
      </div>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden w-64 transform transition-transform duration-300 ease-in-out md:block",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarContent />
      </div>
    </>
  )
}
