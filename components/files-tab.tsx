"use client"

import { motion } from "framer-motion"
import { Cloud, Plus, Share2, MoreHorizontal, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { recentFiles } from "@/data/files-data"

export function FilesTab() {
  return (
    <>
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 p-8 text-white"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Your Creative Files</h2>
              <p className="max-w-[600px] text-white/80">
                Access, manage, and share all your design files in one place.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="rounded-2xl bg-white/20 backdrop-blur-md hover:bg-white/30">
                <Cloud className="mr-2 h-4 w-4" />
                Cloud Storage
              </Button>
              <Button className="rounded-2xl bg-white text-blue-700 hover:bg-white/90">
                <Plus className="mr-2 h-4 w-4" />
                Upload Files
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">All Files</h2>
        </div>

        <div className="rounded-3xl border overflow-hidden">
          <div className="divide-y">
            {recentFiles.map((file) => (
              <motion.div
                key={file.name}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                className="p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted">{file.icon}</div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {file.app} • {file.size} • {file.modified}
                    </p>
                    {file.shared && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Users className="mr-1 h-3 w-3" />
                        Shared with {file.collaborators} people
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
