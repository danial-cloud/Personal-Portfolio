"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, ArrowRight, CheckCircle, Star } from "lucide-react"

export function PricingHero() {
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
              <DollarSign className="mr-2 h-3 w-3" />
              Transparent Pricing
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold">
              Web Development Pricing
            </h1>
            <h2 className="text-xl text-white/90">
              Choose the Perfect Package for Your Project
            </h2>
            <p className="max-w-[600px] text-white/80 mx-auto md:mx-0">
              No hidden fees, no surprises. Clear and transparent pricing for all web development services. Choose from our flexible packages or get a custom quote for your specific needs.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Button
                className="rounded-2xl bg-white text-orange-700 hover:bg-white/90 shadow-lg"
                asChild
              >
                <a href="#pricing-plans">
                  <DollarSign className="mr-2 h-4 w-4" />
                  View Packages
                </a>
              </Button>
              <Button
                variant="outline"
                className="rounded-2xl bg-transparent !border-white text-white hover:bg-white/10 border-2"
                asChild
              >
                <a href="/contact">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Get Custom Quote
                </a>
              </Button>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-start text-sm text-white/80">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>No Hidden Fees</span>
              </div>
              <div>•</div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>5.0 Rating</span>
              </div>
              <div>•</div>
              <div>Flexible Payment</div>
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
                <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md" />
                <div className="absolute inset-4 rounded-full bg-white/20" />
                <div className="absolute inset-8 rounded-full bg-white/30" />
                <div className="absolute inset-12 rounded-full bg-white/40" />
                <div className="absolute inset-16 rounded-full bg-white/50" />
                <div className="absolute inset-20 rounded-full bg-white/60 flex items-center justify-center">
                  <DollarSign className="h-12 w-12 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
