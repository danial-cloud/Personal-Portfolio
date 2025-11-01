import type React from "react"
import { ImageIcon, Brush, Video, Sparkles } from "lucide-react"

export interface FileData {
  name: string
  app: string
  modified: string
  icon: React.ReactNode
  shared: boolean
  size: string
  collaborators: number
}

export const recentFiles: FileData[] = [
  {
    name: "Brand Redesign.pxm",
    app: "PixelMaster",
    modified: "2 hours ago",
    icon: <ImageIcon className="text-violet-500" />,
    shared: true,
    size: "24.5 MB",
    collaborators: 3,
  },
  {
    name: "Company Logo.vec",
    app: "VectorPro",
    modified: "Yesterday",
    icon: <Brush className="text-orange-500" />,
    shared: true,
    size: "8.2 MB",
    collaborators: 2,
  },
  {
    name: "Product Launch Video.vid",
    app: "VideoStudio",
    modified: "3 days ago",
    icon: <Video className="text-pink-500" />,
    shared: false,
    size: "1.2 GB",
    collaborators: 0,
  },
  {
    name: "UI Animation.mfx",
    app: "MotionFX",
    modified: "Last week",
    icon: <Sparkles className="text-blue-500" />,
    shared: true,
    size: "345 MB",
    collaborators: 4,
  },
  {
    name: "Marketing Banner.pxm",
    app: "PixelMaster",
    modified: "2 weeks ago",
    icon: <ImageIcon className="text-violet-500" />,
    shared: false,
    size: "15.8 MB",
    collaborators: 0,
  },
  {
    name: "Website Mockup.vec",
    app: "VectorPro",
    modified: "3 weeks ago",
    icon: <Brush className="text-orange-500" />,
    shared: true,
    size: "12.4 MB",
    collaborators: 5,
  },
]
