"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { apps } from "@/data/apps-data"

export function RecentApps() {
  const recentApps = apps.filter((app) => app.recent)

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Recent Apps</h2>
        <Button variant="ghost" className="rounded-2xl">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {recentApps.map((app) => (
          <motion.div key={app.name} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
            <Card className="overflow-hidden rounded-3xl border border-border/30 dark:border-border hover:border-primary/30 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">{app.icon}</div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-2xl">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <CardTitle className="text-lg">{app.name}</CardTitle>
                <CardDescription>{app.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full rounded-2xl">
                  Open
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
