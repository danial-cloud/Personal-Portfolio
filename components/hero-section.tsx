"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Download } from 'lucide-react'
import { contactInfo } from "@/data/contact-data"

interface HeroSectionProps {
  onNavigateToContact?: () => void
}

export function HeroSection({ onNavigateToContact }: HeroSectionProps) {
  // Get GitHub and LinkedIn from social data
  const githubLink = contactInfo.social.find(social => social.name === "GitHub")
  const linkedinLink = contactInfo.social.find(social => social.name === "LinkedIn")

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 dark:from-violet-700 dark:via-indigo-700 dark:to-blue-700 p-8 text-white shadow-lg dark:shadow-2xl"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* HERO SECTION IMAGE */}
          <div className="flex justify-center lg:justify-end md:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-48 w-48 lg:h-64 lg:w-64">
                <Image
                  src="/danial.png"
                  alt={`${contactInfo.personal.name} - Profile`}
                  width={256}
                  height={256}
                  priority
                  className="w-full h-full object-cover rounded-[50%] border-4 border-white/20 shadow-2xl"
                  sizes="(max-width: 768px) 192px, 256px"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="hidden relative h-48 w-48 lg:h-64 lg:w-64"
                >
                  <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md" />
                  <div className="absolute inset-4 rounded-full bg-white/20" />
                  <div className="absolute inset-8 rounded-full bg-white/30" />
                  <div className="absolute inset-12 rounded-full bg-white/40" />
                  <div className="absolute inset-16 rounded-full bg-white/50" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* TEXT CONTENT */}
          <div className="space-y-4 text-center md:text-left md:order-1">
            <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl border-0 mx-auto md:mx-0">
              {contactInfo.personal.availability}
            </Badge>
            <h2 className="text-3xl font-bold">Hi, I'm {contactInfo.personal.name}</h2>
            <h3 className="text-xl text-white/90">{contactInfo.personal.title}</h3>
            <p className="max-w-[600px] text-white/80 mx-auto md:mx-0">
              {contactInfo.personal.bio}
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Button
                className="rounded-2xl bg-white text-indigo-700 hover:bg-white/90 shadow-lg"
                asChild
              >
                <a href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Get In Touch
                </a>
              </Button>

              <Button
                variant="outline"
                className="rounded-2xl bg-transparent !border-white text-white hover:bg-white/20 hover:text-white hover:border-white transition-all duration-300 border"
                asChild
              >
                <a
                  href={contactInfo.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Open CV
                </a>
              </Button>
            </div>
            <div className="flex gap-3 justify-center md:justify-start">
              {githubLink && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-2xl bg-white/10 hover:bg-white/20 border-0"
                  asChild
                >
                  <a href={githubLink.href} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
              )}
              {linkedinLink && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-2xl bg-white/10 hover:bg-white/20 border-0"
                  asChild
                >
                  <a href={linkedinLink.href} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
