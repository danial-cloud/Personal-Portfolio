"use client"

import { motion } from "framer-motion"
import { Star, Shield, ExternalLink, Award, TrendingUp, Clock, Calendar, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { reviewsData, reviewsStats } from "@/data/reviews-data"
import Link from "next/link"

interface ReviewsSectionProps {
  onViewAllReviews?: () => void
}

export function ReviewsSection({ onViewAllReviews }: ReviewsSectionProps) {
  // Get first 3 reviews for featured section
  const featuredReviews = reviewsData.slice(0, 3)

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

  return (
    <motion.section variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-3 py-1 hover:bg-green-200 dark:hover:bg-green-800 transition-colors duration-200">
            <Award className="mr-1 h-4 w-4" />
            Trusted Seller
          </Badge>
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 px-3 py-1 hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors duration-200">
            <Star className="mr-1 h-4 w-4 fill-current" />
            5.0 Rating
          </Badge>
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Client Reviews & Testimonials</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Don't just take my word for it. Here's what my clients say about working with me on Upwork.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center border border-border/70 dark:border-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
          <CardContent className="pt-4">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-6 w-6 text-yellow-500 fill-current" />
            </div>
            <div className="text-2xl font-bold">{reviewsStats.averageRating}</div>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </CardContent>
        </Card>

        <Card className="text-center border border-border/70 dark:border-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
          <CardContent className="pt-4">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-6 w-6 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">{reviewsStats.totalReviews}</div>
            <p className="text-sm text-muted-foreground">Total Reviews</p>
          </CardContent>
        </Card>

        <Card className="text-center border border-border/70 dark:border-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
          <CardContent className="pt-4">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
            <div className="text-2xl font-bold">{reviewsStats.completionRate}</div>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </CardContent>
        </Card>

        <Card className="text-center border border-border/70 dark:border-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
          <CardContent className="pt-4">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 text-purple-500" />
            </div>
            <div className="text-2xl font-bold">{reviewsStats.responseTime}</div>
            <p className="text-sm text-muted-foreground">Response Time</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Featured Reviews */}
      <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-3">
        {featuredReviews.map((review, index) => (
          <motion.div key={review.id} variants={itemVariants} transition={{ delay: index * 0.1 }}>
            <Card className="h-full border border-border/70 dark:border-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                      {review.clientName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{review.clientName}</p>
                      {review.isVerified && <Shield className="h-4 w-4 text-blue-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <span>{review.countryFlag}</span>
                      {review.country}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                    <span className="ml-2 text-sm font-medium">{review.rating}.0</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                  >
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Completed
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0 flex-grow flex flex-col">
                <blockquote className="text-sm text-muted-foreground mb-4 italic line-clamp-4 flex-grow">
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
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.div variants={itemVariants} className="text-center py-8">
        <Card className="max-w-2xl mx-auto border border-border/70 dark:border-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-green-600 flex items-center justify-center">
                  <Star className="h-8 w-8 text-white fill-white" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Ready to Work Together?</h3>
                <p className="text-muted-foreground mb-4">
                  Join {reviewsStats.totalReviews} satisfied clients who chose quality and professionalism
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/reviews">
                <Button onClick={onViewAllReviews} variant="outline" className="cursor-pointer">
                  View All Reviews
                </Button>
                  </Link>
                <Button asChild>
                  <a href="https://www.upwork.com/freelancers/~010d7fa4fa17b2c487?mp_source=share" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Hire Me on Upwork
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  )
}
