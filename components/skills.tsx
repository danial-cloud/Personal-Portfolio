"use client"

import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { skills } from "@/data/skills-data"

export function Skills() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-foreground">Skills & Technologies</h2>
      <div className="rounded-3xl border border-border p-6 bg-card shadow-sm dark:shadow-lg">
        <div className="space-y-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                    {skill.icon}
                  </div>
                  <span className="font-medium text-foreground">{skill.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
              <Progress value={skill.level} className="h-2 rounded-xl bg-muted" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
