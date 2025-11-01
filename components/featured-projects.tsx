"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { featuredProjects } from "@/data/projects-data"
import Link from "next/link"

export function FeaturedProjects() {
  const [showPrivateAlert, setShowPrivateAlert] = useState<string | null>(null)

  const handleGithubClick = (project: (typeof featuredProjects)[0]) => {
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

  // Helper function to render status badges
  const renderStatusBadges = (status: string | string[]) => {
    const statuses = Array.isArray(status) ? status : [status]
    return (
      <div className="flex gap-1 flex-wrap">
        {statuses.map((s, index) => (
          <Badge
            key={index}
            variant={s === "Completed" ? "default" : "secondary"}
            className="bg-white/20 text-white hover:bg-white/30 rounded-xl border-0 shadow-lg"
          >
            {s}
          </Badge>
        ))}
      </div>
    )
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Featured Projects</h2>
        <Button variant="outline" className="rounded-2xl border-border dark:border-border hover:border-primary/50 text-muted-foreground hover:text-foreground" asChild>
          <Link href="/projects">
            View All Projects
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <motion.div key={project.name} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
            <Card className="overflow-hidden rounded-3xl border border-border/30 dark:border-border hover:border-primary/30 transition-all duration-300 bg-card shadow-sm dark:shadow-lg h-full flex flex-col">
              <div className="aspect-video overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-600 dark:via-purple-600 dark:to-pink-600 relative">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-4 right-4">{renderStatusBadges(project.status)}</div>
              </div>
              <CardHeader className="pb-2 flex-shrink-0">
                <CardTitle className="text-lg text-foreground line-clamp-1" title={project.name}>
                  {project.name}
                </CardTitle>
                <CardDescription
                  className="text-muted-foreground line-clamp-2 min-h-[2.5rem]"
                  title={project.description}
                >
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2 flex-grow">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="rounded-xl text-xs border-border">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 flex-shrink-0">
                <Button variant="secondary" className="flex-1 rounded-2xl bg-secondary hover:bg-secondary/80" asChild>
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
                    variant="outline"
                    size="icon"
                    className={`rounded-2xl !cursor-pointer border-border bg-transparent relative transition-all duration-200 ${
                      project.isPrivate
                        ? "border-amber-300 hover:border-amber-400 dark:border-amber-600 dark:hover:border-amber-500"
                        : "hover:border-primary"
                    }`}
                    onClick={() => handleGithubClick(project)}
                    title={project.isPrivate ? "Private Repository" : "View on GitHub"}
                  >
                    <Github className={`h-4 w-4 ${project.isPrivate ? "text-amber-600 dark:text-amber-400" : ""}`} />
                    {project.isPrivate && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                    )}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
