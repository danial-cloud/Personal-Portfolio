"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, GraduationCap, Award, Code, Briefcase, Download } from "lucide-react"

interface AboutTabProps {
  aboutFilter?: string
}

export function AboutTab({ aboutFilter = "All" }: AboutTabProps) {
  const stats = [
    { label: "Years Experience", value: "5+", icon: Briefcase },
    { label: "Projects Completed", value: "50+", icon: Code },
    { label: "Happy Clients", value: "30+", icon: Award },
    { label: "Technologies", value: "15+", icon: GraduationCap },
  ]

  const skills = [
    { name: "HTML/CSS", level: 90 },
    { name: "React/Next.js", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "JavaScript/TypeScript", level: 95 },
    { name: "Tailwind CSS", level: 100 },
    { name: "Sanity CMS", level: 80 },
    { name: "Strapi", level: 75 },
    { name: "Wordpress", level: 80 },
    { name: "UI/UX Design", level: 90 },
    { name: "Electron JS", level: 85 },
  ]

  const experience = [
    {
      title: "Senior Full Stack Developer",
      company: "Athena Sols Inc.",
      period: "2022 - Present",
      location: "New York, NY",
      description: "Leading development of enterprise web applications using React, Node.js, and cloud technologies.",
    },
    {
      title: "Full Stack Developer",
      company: "Digital Agency Co.",
      period: "2020 - 2022",
      location: "Punjab, Pakistan",
      description: "Developed and maintained multiple client projects using modern web technologies.",
    },
    {
      title: "Frontend Developer",
      company: "Freelance Hub",
      period: "2018 - 2020",
      location: "Bhakkar, Punjab, Pakistan",
      description: "Built responsive web applications and collaborated with design teams.",
    },
  ]


const education = [
  {
    degree: "Matriculation with Computer Science",
    school: "YPS Bhakkar",
    period: "2016 - 2018",
    location: "Bhakkar, Pakistan",
    description: "Completed Matric with specialization in Computer Science subjects.",
  },
  {
    degree: "Intermediate in ICS (Intermediate in Computer Science)",
    school: "Govt College of Commerce Bhakkar",
    period: "2018 - 2020",
    location: "Bhakkar, Pakistan",
    description: "Studied major subjects including Computer Science, Mathematics, and Physics.",
  },
  {
    degree: "Associate Degree in Science (Computer Science)",
    school: "Sargodha University",
    period: "2021 - 2023",
    location: "Sargodha, Pakistan",
    description: "Completed ADS with a focus on Computer Science and related subjects.",
  },
  {
    degree: "Bachelor of Science in Computer Science (BSCS)",
    school: "Gomal University",
    period: "2023 - 2025",
    location: "Dera Ismail Khan, Pakistan",
    description: "Pursuing BSCS, focusing on modern computing technologies and software development.",
  },
];


  const showStory = true

  // Other sections based on filter
  const showSkills = aboutFilter === "All" || aboutFilter === "Skills"
  const showExperience = aboutFilter === "All" || aboutFilter === "Experience"
  const showEducation = aboutFilter === "All" || aboutFilter === "Education"

  return (
    <div className="space-y-8">
      {/* Hero Section with Stats - My Story */}
      {showStory && (
        <section id="about-story">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-700 dark:via-teal-700 dark:to-cyan-700 p-8 text-white shadow-lg dark:shadow-2xl"
          >
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">About Me</h2>
                <p className="text-white/90 leading-relaxed">
             I’m a passionate Full Stack Developer with 5+ years of experience building impactful digital solutions. Skilled in React, Next.js, Node.js, and modern web technologies, I enjoy turning complex ideas into elegant, user-friendly applications.
                </p>
                <p className="text-white/90 leading-relaxed">
               I’ve delivered 50+ successful projects across various industries and currently work as a Senior Full Stack Developer at Athena Sols Inc. I’m pursuing my BS in Computer Science and constantly explore new tools and contribute to open-source projects.
                </p>
                <p className="text-white/90 leading-relaxed">Beyond coding, I love discovering new tech trends and collaborating with the developer community.

</p>
            
                <a href="/resume/shehzad.pdf" download className="!cursor-pointer">
                  <Button className="w-fit rounded-2xl cursor-pointer bg-white text-emerald-700 hover:bg-white/90 shadow-lg">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Button>
                </a>

              </div>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="rounded-2xl bg-white/10 p-4 text-center backdrop-blur-sm flex items-center justify-center flex-col"
                  >
                    <stat.icon className="mx-auto mb-2 h-6 w-6" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Skills Section */}
      {showSkills && (
        <section id="about-skills">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="rounded-3xl bg-card shadow-sm dark:shadow-lg border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Code className="h-5 w-5" />
                  Technical Skills
                </CardTitle>
                <CardDescription>Technologies and tools I work with</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-foreground">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      )}

      {/* Experience Section */}
      {showExperience && (
        <section id="about-experience">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="rounded-3xl bg-card shadow-sm dark:shadow-lg border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Briefcase className="h-5 w-5" />
                  Work Experience
                </CardTitle>
                <CardDescription>My professional journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="space-y-3">
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{exp.title}</h3>
                          <p className="text-primary font-medium">{exp.company}</p>
                        </div>
                        <div className="flex flex-col gap-1 text-sm text-muted-foreground md:text-right">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {exp.period}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {exp.location}
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{exp.description}</p>
                      {index < experience.length - 1 && <Separator className="mt-6" />}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </section>
      )}

      {/* Education Section */}
      {showEducation && (
        <section id="about-education">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="rounded-3xl bg-card shadow-sm dark:shadow-lg border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <GraduationCap className="h-5 w-5" />
                  Education
                </CardTitle>
                <CardDescription>Academic background and certifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="space-y-3">
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                          <p className="text-primary font-medium">{edu.school}</p>
                        </div>
                        <div className="flex flex-col gap-1 text-sm text-muted-foreground md:text-right">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {edu.period}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {edu.location}
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{edu.description}</p>
                      {index < education.length - 1 && <Separator className="mt-6" />}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </section>
      )}
    </div>
  )
}
