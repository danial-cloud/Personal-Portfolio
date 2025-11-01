"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Shield, Filter, ExternalLink, Award, Calendar, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getFilteredReviews, statsConfig } from "@/data/reviews-data"

interface ReviewsTabProps {
  reviewsFilter?: string
}

export function ReviewsTab({ reviewsFilter = "All Reviews" }: ReviewsTabProps) {
  const [sortBy, setSortBy] = useState("newest")
  const [filterBy, setFilterBy] = useState("all")
  const [isClient, setIsClient] = useState(false)

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Update local filter when prop changes
  useEffect(() => {
    console.log("ReviewsTab: Received reviewsFilter prop:", reviewsFilter)

    // Map the exact filter values from sidebar to internal filter values
    if (reviewsFilter === "Client Testimonials") {
      console.log("ReviewsTab: Setting filter to testimonials")
      setFilterBy("testimonials")
    } else if (reviewsFilter === "Client Feedback") {
      console.log("ReviewsTab: Setting filter to feedback")
      setFilterBy("feedback")
    } else if (reviewsFilter === "Fiverr Profile") {
      console.log("ReviewsTab: Opening Fiverr profile")
      window.open("https://www.fiverr.com/dev_shehzad", "_blank")
      setFilterBy("all")
    } else {
      console.log("ReviewsTab: Setting filter to all (default)")
      setFilterBy("all")
    }
  }, [reviewsFilter])

  const getSortedAndFilteredReviews = () => {
    console.log("ReviewsTab: Getting filtered reviews with filterBy:", filterBy)
    const filtered = getFilteredReviews(filterBy)
    console.log("ReviewsTab: Filtered reviews count:", filtered.length)

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "highest-value":
          return b.orderValue - a.orderValue
        case "newest":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })

    return sorted
  }

  const sortedReviews = getSortedAndFilteredReviews()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const getFilterTitle = () => {
    switch (filterBy) {
      case "testimonials":
        return "Client Testimonials"
      case "feedback":
        return "Client Feedback"
      default:
        return "All Reviews"
    }
  }

  const getFilterDescription = () => {
    switch (filterBy) {
      case "testimonials":
        return "Detailed testimonials from satisfied clients"
      case "feedback":
        return "Client feedback and reviews"
      default:
        return "Feedback from satisfied clients on Fiverr"
    }
  }

  // Format date consistently for both server and client
  const formatDate = (dateString: string) => {
    if (!isClient) {
      // Return a consistent format for server-side rendering
      return new Date(dateString).toISOString().split("T")[0]
    }
    // Use client-side formatting only after hydration
    return new Date(dateString).toLocaleDateString('en-US')
  }

  return (
    <div className="w-full space-y-6 relative z-0">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 md:flex-row md:items-center max-md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight max-md:text-center text-foreground">{getFilterTitle()}</h1>
          <p className="text-muted-foreground mt-1 max-md:text-center">{getFilterDescription()}</p>
        </div>
        <div className="flex items-center max-md:justify-center gap-2">
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-800 hover:bg-green-700 hover:border-black/20 cursor-pointer hover:text-white/80 dark:bg-green-900 dark:text-green-100"
          >
            <Award className="mr-1 h-3 w-3" />
            Trusted Seller
          </Badge>
          <Button variant="outline" size="sm" asChild>
            <a href="https://www.fiverr.com/dev_shehzad" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Fiverr Profile
            </a>
          </Button>
        </div>
      </motion.div>

      {/* Enhanced Stats Dashboard - Dynamic with Original Size */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-4 md:grid-cols-5"
      >
        {statsConfig.map((stat) => {
          const IconComponent = stat.icon
          return (
            <Card key={stat.id} className="text-center border border-border bg-card">
              <CardContent className="pt-4">
                <div className="flex items-center justify-center mb-2">
                  <IconComponent className={`h-5 w-5 ${stat.color} ${stat.fillIcon ? "fill-current" : ""}`} />
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </motion.div>

      {/* Filters and Sorting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-card border border-border rounded-lg p-4"
      >
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Filters & Sorting</span>
        </div>
        <div className="flex gap-2">
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-[180px] bg-background border-border">
              <SelectValue placeholder="Filter reviews" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border">
              <SelectItem value="all">All Reviews</SelectItem>
              <SelectItem value="testimonials">Client Testimonials</SelectItem>
              <SelectItem value="feedback">Client Feedback</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] bg-background border-border">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border">
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="highest-value">Highest Value</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Reviews Grid */}
      <div className="relative z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${filterBy}-${sortBy}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {sortedReviews.length > 0 ? (
              sortedReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="relative z-0"
                >
                  <Card className="h-full border border-border/70 dark:border-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-card flex flex-col">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                              {review.clientName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-foreground">{review.clientName}</p>
                              {review.isVerified && <Shield className="h-4 w-4 text-blue-500" />}
                            </div>
                            <p className="text-sm text-muted-foreground">@{review.clientUsername}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <span>{review.countryFlag}</span>
                              {review.country}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="outline"
                            className="mb-2 border-border bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                          >
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Completed
                          </Badge>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(review.date)}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 flex-grow flex flex-col">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                        ))}
                        <span className="ml-2 text-sm font-medium text-foreground">{review.rating}.0</span>
                      </div>

                      <blockquote className="text-sm text-muted-foreground mb-4 italic leading-relaxed flex-grow">
                        "{review.reviewText}"
                      </blockquote>
                    </CardContent>
                    <div className="pt-4 border-t border-border/30 dark:border-border/60 px-6 pb-6">
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant="secondary" 
                          className="text-xs font-normal px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground border-0 hover:bg-muted/70 transition-colors duration-200"
                        >
                          {review.projectType}
                        </Badge>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(review.date).toLocaleDateString('en-US')}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-2 text-center py-12">
                <div className="text-muted-foreground">
                  <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2 text-foreground">No reviews found</p>
                  <p className="text-sm">Try adjusting your filters to see more reviews.</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center py-8"
      >
        <Card className="max-w-md mx-auto border border-border/70 dark:border-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 bg-card">
          <CardContent className="pt-6">
            <Award className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">Ready to Work Together?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Join these satisfied clients and let's create something amazing together!
            </p>
            <Button asChild>
              <a href="https://www.fiverr.com/dev_shehzad" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Hire Me on Fiverr
              </a>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
