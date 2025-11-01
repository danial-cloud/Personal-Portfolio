"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, ArrowRight, Star, Monitor, Smartphone, Database, Zap, Globe } from "lucide-react"

export function ServicesHero() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 dark:from-green-700 dark:via-teal-700 dark:to-blue-700 p-8 text-white shadow-lg dark:shadow-2xl"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Content */}
          <div className="space-y-4 text-center md:text-left">
            <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl border-0 mx-auto md:mx-0">
              <Code className="mr-2 h-3 w-3" />
              Professional Services
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold">
              Professional Tech Services
            </h1>
            <h2 className="text-xl text-white/90">
              Complete Digital Solutions for Your Business
            </h2>
            <p className="max-w-[600px] text-white/80 mx-auto md:mx-0">
              From web development to mobile apps, UI/UX design, and backend services - I provide comprehensive tech solutions that help your business grow. Professional services with competitive pricing and fast delivery.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Button
                className="rounded-2xl bg-white text-green-700 hover:bg-white/90 shadow-lg"
                asChild
              >
                <a href="#services-list">
                  <Code className="mr-2 h-4 w-4" />
                  View Services
                </a>
              </Button>
              <Button
                variant="outline"
                className="rounded-2xl bg-transparent !border-white text-white hover:bg-white/10 hover:text-white border transition-all duration-300 cursor-pointer"
                asChild
              >
                <a href="/contact">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Get Free Quote
                </a>
              </Button>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-start text-sm text-white/80">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>5.0 Rating</span>
              </div>
              <div>•</div>
              <div>100+ Projects</div>
              <div>•</div>
              <div>5+ Years Experience</div>
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
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-teal-400/20" />
                <div className="absolute inset-4 rounded-full bg-gradient-to-r from-teal-400/20 to-blue-400/20" />
                <div className="absolute inset-8 rounded-full bg-gradient-to-r from-blue-400/20 to-green-400/20" />
                
                {/* Central content with multiple icons */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Main icon */}
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border !border-green-400/60 dark:!border-green-300/60"
                    >
                      <Code className="h-8 w-8 text-white" />
                    </motion.div>
                    
                    {/* Floating icons around the main one */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                      className="absolute -top-2 -right-2 bg-white/15 backdrop-blur-sm rounded-xl p-2 border !border-teal-400/50 dark:!border-teal-300/50"
                    >
                      <Monitor className="h-4 w-4 text-white" />
                    </motion.div>
                    
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                      className="absolute -bottom-2 -left-2 bg-white/15 backdrop-blur-sm rounded-xl p-2 border !border-blue-400/50 dark:!border-blue-300/50"
                    >
                      <Smartphone className="h-4 w-4 text-white" />
                    </motion.div>
                    
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2.8, repeat: Infinity, delay: 1.5 }}
                      className="absolute -right-2 top-1/2 -translate-y-1/2 bg-white/15 backdrop-blur-sm rounded-xl p-2 border !border-green-400/50 dark:!border-green-300/50"
                    >
                      <Database className="h-4 w-4 text-white" />
                    </motion.div>
                    
                    <motion.div
                      animate={{ x: [0, -10, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, delay: 2 }}
                      className="absolute -left-2 top-1/2 -translate-y-1/2 bg-white/15 backdrop-blur-sm rounded-xl p-2 border !border-cyan-400/50 dark:!border-cyan-300/50"
                    >
                      <Globe className="h-4 w-4 text-white" />
                    </motion.div>
                    
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, delay: 0.8 }}
                      className="absolute -top-2 -left-2 bg-white/15 backdrop-blur-sm rounded-xl p-2 border !border-yellow-400/50 dark:!border-yellow-300/50"
                    >
                      <Zap className="h-4 w-4 text-white" />
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

