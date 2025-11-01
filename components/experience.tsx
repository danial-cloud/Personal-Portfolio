"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { experience } from "@/data/experience-data"

export function Experience() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-foreground">Experience</h2>
      <div className="rounded-3xl border border-border p-6 bg-card shadow-sm dark:shadow-lg">
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-6 border-l-2 border-muted last:border-l-0"
            >
              <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary" />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">{exp.position}</h3>
                  <Badge variant="outline" className="rounded-xl border-border">
                    {exp.duration}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{exp.company}</p>
                <p className="text-sm text-foreground">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
