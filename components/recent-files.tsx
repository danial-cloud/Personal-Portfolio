"use client"

import { motion } from "framer-motion"
import { Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { recentFiles } from "@/data/files-data"

export function RecentFiles() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Recent Files</h2>
        <Button variant="ghost" className="rounded-2xl">
          View All
        </Button>
      </div>
      <div className="rounded-3xl border">
        <div className="grid grid-cols-1 divide-y">
          {recentFiles.slice(0, 4).map((file) => (
            <motion.div
              key={file.name}
              whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted">{file.icon}</div>
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {file.app} • {file.modified}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {file.shared && (
                  <Badge variant="outline" className="rounded-xl">
                    <Users className="mr-1 h-3 w-3" />
                    {file.collaborators}
                  </Badge>
                )}
                <Button variant="ghost" size="sm" className="rounded-xl">
                  Open
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
