"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, BookOpen, TrendingUp, Code, PenTool, Zap } from "lucide-react"

export function BlogHero() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-700 dark:via-purple-700 dark:to-indigo-700 p-8 text-white shadow-lg dark:shadow-2xl"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Content */}
          <div className="space-y-4 text-center md:text-left">
            <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl border-0 mx-auto md:mx-0">
              <BookOpen className="mr-2 h-3 w-3" />
              Latest Articles
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold">
              Tech Blog & Insights
            </h1>
            <h2 className="text-xl text-white/90">
              Expert Tips, Guides & Industry Insights
            </h2>
            <p className="max-w-[600px] text-white/80 mx-auto md:mx-0">
              Stay updated with the latest technology trends, hiring guides, technical tutorials, and industry insights from a top-rated full stack developer.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Button
                className="rounded-2xl bg-white text-blue-700 hover:bg-white/90 shadow-lg cursor-pointer"
                asChild
              >
                <a href="#blog-posts">
                  <Search className="mr-2 h-4 w-4" />
                  Browse Articles
                </a>
              </Button>
              <Button
                variant="outline"
                className="rounded-2xl bg-transparent !border-white text-white hover:bg-white hover:text-blue-700 border transition-all duration-300 cursor-pointer"
                asChild
              >
                <a href="/contact">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Get Expert Advice
                </a>
              </Button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-center lg:justify-end md:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-48 w-48 lg:h-64 lg:w-64">
                {/* Animated background circles */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20" />
                <div className="absolute inset-4 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20" />
                <div className="absolute inset-8 rounded-full bg-gradient-to-r from-pink-400/20 to-blue-400/20" />
                
                {/* Central content with multiple icons */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Main icon */}
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border !border-blue-400/60 dark:!border-blue-300/60"
                    >
                      <Code className="h-8 w-8 text-white" />
                    </motion.div>
                    
                    {/* Floating icons around the main one */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                      className="absolute -top-2 -right-2 bg-white/15 backdrop-blur-sm rounded-xl p-2 border !border-purple-400/50 dark:!border-purple-300/50"
                    >
                      <PenTool className="h-4 w-4 text-white" />
                    </motion.div>
                    
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                      className="absolute -bottom-2 -left-2 bg-white/15 backdrop-blur-sm rounded-xl p-2 border !border-pink-400/50 dark:!border-pink-300/50"
                    >
                      <Zap className="h-4 w-4 text-white" />
                    </motion.div>
                    
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2.8, repeat: Infinity, delay: 1.5 }}
                      className="absolute -right-2 top-1/2 -translate-y-1/2 bg-white/15 backdrop-blur-sm rounded-xl p-2 border !border-indigo-400/50 dark:!border-indigo-300/50"
                    >
                      <BookOpen className="h-4 w-4 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

