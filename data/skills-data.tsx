import type React from "react"
import { Code, Palette, Database, Cloud, Smartphone, Globe } from "lucide-react"

export interface Skill {
  name: string
  level: number
  icon: React.ReactNode
}

export const skills: Skill[] = [
  {
    name: "Frontend Development",
    level: 95,
    icon: <Code className="h-4 w-4" />,
  },
  {
    name: "Backend Development",
    level: 88,
    icon: <Database className="h-4 w-4" />,
  },
  {
    name: "UI/UX Design",
    level: 82,
    icon: <Palette className="h-4 w-4" />,
  },
  {
    name: "Mobile Development",
    level: 75,
    icon: <Smartphone className="h-4 w-4" />,
  },
  {
    name: "Cloud Services",
    level: 70,
    icon: <Cloud className="h-4 w-4" />,
  },
  {
    name: "Web Performance",
    level: 85,
    icon: <Globe className="h-4 w-4" />,
  },
]
