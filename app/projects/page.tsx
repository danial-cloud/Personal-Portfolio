import type { Metadata } from "next"
import { ProjectsTab } from "@/components/projects-tab"

// SEO ke liye Projects Page ka behtareen metadata
export const metadata: Metadata = {
  // Title ko action-oriented aur attractive banaya gaya hai
  title: "Web Development Portfolio | Muhammad Shehzad's Projects",

  // Description ko is tarah likha gaya hai ke user click karne par majboor ho
  description:
    "Explore a professional portfolio of full-stack projects by Muhammad Shehzad. Discover innovative web applications and real-world solutions built using Next.js, React, Node.js, and modern web technologies. See my skills in action.",

  // Portfolio aur skills se mutalliq keywords
  keywords: [
    "Web Development Portfolio",
    "Full Stack Projects",
    "Next.js Projects",
    "React Portfolio",
    "Node.js Projects",
    "Muhammad Shehzad Projects",
    "Software Development Portfolio",
    "MERN Stack Projects",
    "Web Applications Showcase",
    "Hire Full Stack Developer",
  ],

  // Canonical URL for duplicate content prevention
  alternates: {
    canonical: "/projects",
  },

  // Open Graph (Social Sharing) data
  openGraph: {
    title: "Projects Portfolio of Muhammad Shehzad",
    description: "Explore a showcase of web applications built with modern technologies like React and Next.js.",
    url: "https://www.muhammad-shehzad.com/projects",
    type: "website",
    images: [
      {
        url: "https://www.muhammad-shehzad.com/shehzad.jpg", // Yahan aap projects ka collage bhi laga sakte hain
        width: 1200,
        height: 630,
        alt: "A showcase of web development projects by Muhammad Shehzad",
      },
    ],
  },

  // Twitter Card data
  twitter: {
    card: "summary_large_image",
    title: "Projects Portfolio of Muhammad Shehzad",
    description: "Explore a showcase of web applications built with modern technologies like React and Next.js.",
    creator: "@dev-shehzad",
    images: ["https://www.muhammad-shehzad.com/shehzad.jpg"],
  },
}

// Projects Page ke liye powerful JSON-LD Structured Data
// Is se Google ko page ke maqsad aur author ka pata chalta hai
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage", // Google ko batata hai ke yeh page cheezon ki ek collection hai
  name: "Web Development Projects Portfolio",
  description: "A collection of full-stack web development and software projects by Muhammad Shehzad.",
  url: "https://www.muhammad-shehzad.com/projects",
  author: {
    // Hum page ke author ko highlight kar rahe hain
    "@type": "Person",
    name: "Muhammad Shehzad",
    url: "https://www.muhammad-shehzad.com",
  },
}

interface ProjectsPageProps {
  searchParams: Promise<{
    search?: string
    category?: string
  }>
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = await searchParams
  const searchQuery = params.search || ""
  const categoryFilter = params.category || "All"

  return (
    <div className="space-y-8 mt-0">
      {/* Structured Data ko page mein shamil karna */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Aapka ProjectsTab component data ko handle karega */}
      <ProjectsTab searchQuery={searchQuery} categoryFilter={categoryFilter} />
    </div>
  )
}
