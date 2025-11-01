"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, ExternalLink, Github, X, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { allProjects } from "@/data/projects-data"

interface ProjectsTabProps {
  searchQuery?: string
  categoryFilter?: string
}

export function ProjectsTab({ searchQuery = "", categoryFilter = "All" }: ProjectsTabProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)
  const [localCategoryFilter, setLocalCategoryFilter] = useState(categoryFilter)
  const [statusFilter, setStatusFilter] = useState("All")
  const [showPrivateAlert, setShowPrivateAlert] = useState<string | null>(null)

  // Update local state when props change
  useMemo(() => {
    setLocalSearchQuery(searchQuery)
  }, [searchQuery])

  useMemo(() => {
    setLocalCategoryFilter(categoryFilter)
  }, [categoryFilter])

  // Helper function to check if project matches status filter
  const matchesStatus = (projectStatus: string | string[], filterStatus: string) => {
    if (filterStatus === "All") return true

    if (Array.isArray(projectStatus)) {
      return projectStatus.includes(filterStatus)
    }
    return projectStatus === filterStatus
  }

  // Helper function to get all unique statuses from projects
  const getAllStatuses = () => {
    const statusSet = new Set<string>()
    allProjects.forEach((project) => {
      if (Array.isArray(project.status)) {
        project.status.forEach((status) => statusSet.add(status))
      } else {
        statusSet.add(project.status)
      }
    })
    return Array.from(statusSet).sort()
  }

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesSearch =
        localSearchQuery === "" ||
        project.name.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(localSearchQuery.toLowerCase())) ||
        project.category?.some((cat) => cat.toLowerCase().includes(localSearchQuery.toLowerCase()))

      const matchesCategory = localCategoryFilter === "All" || project.category?.includes(localCategoryFilter)

      const matchesStatusFilter = matchesStatus(project.status, statusFilter)

      return matchesSearch && matchesCategory && matchesStatusFilter
    })
  }, [localSearchQuery, localCategoryFilter, statusFilter])

  const categories = ["All", "Web Development", "Mobile Apps", "UI/UX Design", "Full Stack", "Frontend", "Backend"]
  const statuses = ["All", ...getAllStatuses()]

  const clearFilters = () => {
    setLocalSearchQuery("")
    setLocalCategoryFilter("All")
    setStatusFilter("All")
  }

  const handleGithubClick = (project: (typeof allProjects)[0]) => {
    if (project.isPrivate) {
      // Show alert for private repository
      setShowPrivateAlert(project.name)
      // Auto-hide alert after 4 seconds
      setTimeout(() => setShowPrivateAlert(null), 4000)
    } else {
      // Open public repository in new tab
      window.open(project.githubUrl, "_blank", "noopener,noreferrer")
    }
  }

  // Helper function to render status badges - keeping original UI style
  const renderStatusBadges = (status: string | string[]) => {
    if (Array.isArray(status)) {
      // For multiple statuses, show them in a flex container
      return (
        <div className="flex gap-1 flex-wrap">
          {status.map((s, index) => (
            <Badge
              key={index}
              variant={s === "Completed" ? "default" : "secondary"}
              className="rounded-xl flex-shrink-0"
            >
              {s}
            </Badge>
          ))}
        </div>
      )
    }

    // For single status, show as before
    return (
      <Badge variant={status === "Completed" ? "default" : "secondary"} className="rounded-xl flex-shrink-0">
        {status}
      </Badge>
    )
  }

  return (
    <>
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-700 dark:via-purple-700 dark:to-indigo-700 p-8 text-white shadow-lg dark:shadow-2xl"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">My Projects</h2>
              <p className="max-w-[600px] text-white/80">
                Explore my portfolio of web applications, mobile apps, and design projects.
              </p>
            </div>
            <Badge className="w-fit bg-white/20 text-white hover:bg-white/30 rounded-xl border-0 shadow-lg">
              {filteredProjects.length} Projects
            </Badge>
          </div>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="rounded-2xl bg-background pl-9 pr-4 py-2 border-border"
              />
              {localSearchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-8 w-8 rounded-xl"
                  onClick={() => setLocalSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Select value={localCategoryFilter} onValueChange={setLocalCategoryFilter}>
                <SelectTrigger className="w-[180px] rounded-2xl border-border">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="rounded-xl">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] rounded-2xl border-border">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status} className="rounded-xl">
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {(localSearchQuery || localCategoryFilter !== "All" || statusFilter !== "All") && (
            <Button variant="outline" onClick={clearFilters} className="rounded-2xl bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>

        {/* Active Filters */}
        {(localSearchQuery || localCategoryFilter !== "All" || statusFilter !== "All") && (
          <div className="flex flex-wrap gap-2">
            {localSearchQuery && (
              <Badge variant="secondary" className="rounded-xl">
                Search: "{localSearchQuery}"
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-1 h-4 w-4 p-0"
                  onClick={() => setLocalSearchQuery("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {localCategoryFilter !== "All" && (
              <Badge variant="secondary" className="rounded-xl">
                Category: {localCategoryFilter}
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-1 h-4 w-4 p-0"
                  onClick={() => setLocalCategoryFilter("All")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {statusFilter !== "All" && (
              <Badge variant="secondary" className="rounded-xl">
                Status: {statusFilter}
                <Button variant="ghost" size="icon" className="ml-1 h-4 w-4 p-0" onClick={() => setStatusFilter("All")}>
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>
        )}
      </section>

      {/* Projects Grid */}
      <section>
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key="projects-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden rounded-3xl bg-card shadow-sm dark:shadow-lg border border-border/30 dark:border-border hover:border-primary/30 hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader className="space-y-2 flex-shrink-0">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-foreground line-clamp-1 flex-1 mr-2" title={project.name}>
                          {project.name}
                        </CardTitle>
                        {renderStatusBadges(project.status)}
                      </div>
                      <CardDescription
                        className="text-muted-foreground line-clamp-2 min-h-[2.5rem]"
                        title={project.description}
                      >
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-grow">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="outline" className="rounded-xl text-xs border-border">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="rounded-xl text-xs border-border">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2 mt-auto">
                        <Button size="sm" variant="outline" className="flex-1 rounded-2xl bg-transparent" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
                          </a>
                        </Button>
                        <div className="relative">
                          {/* Private Repository Alert */}
                          <AnimatePresence>
                            {showPrivateAlert === project.name && (
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute bottom-full mb-3 right-0 z-20"
                              >
                                <Alert className="w-72 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950 shadow-xl">
                                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                  <AlertDescription className="text-amber-800 dark:text-amber-200 text-sm font-medium">
                                    This repository is private and cannot be accessed publicly.
                                  </AlertDescription>
                                </Alert>
                                {/* Arrow pointing to button */}
                                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-amber-200 dark:border-t-amber-800"></div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <Button
                            size="sm"
                            variant="outline"
                            className={`rounded-2xl cursor-pointer bg-transparent relative transition-all duration-200 ${
                              project.isPrivate
                                ? "border-amber-300 hover:border-amber-400 dark:border-amber-600 dark:hover:border-amber-500"
                                : "hover:border-primary"
                            }`}
                            onClick={() => handleGithubClick(project)}
                            title={project.isPrivate ? "Private Repository" : "View on GitHub"}
                          >
                            <Github
                              className={`h-4 w-4 ${project.isPrivate ? "text-amber-600 dark:text-amber-400" : ""}`}
                            />
                            {project.isPrivate && (
                              <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="space-y-4">
                <div className="text-6xl">🔍</div>
                <h3 className="text-xl font-semibold text-foreground">No projects found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or clearing the filters.</p>
                <Button onClick={clearFilters} className="rounded-2xl">
                  Clear All Filters
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  )
}
