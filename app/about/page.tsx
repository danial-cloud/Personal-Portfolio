import type { Metadata } from "next"
import { AboutTab } from "@/components/about-tab"

// SEO ke liye About Page ka behtar metadata
export const metadata: Metadata = {
  // Title ko aur specific banaya gaya hai
  title: "About 'Muhammad Shehzad' | My Journey as a Full Stack Developer",

  // Description ko ziyada engaging banaya gaya hai
  description:
    "Discover the story behind Muhammad Shehzad, a passionate Full Stack Developer. Learn about my technical journey, the skills I've mastered in Next.js, React, and Node.js, and my professional experience.",

  // Is page ke liye makhsoos keywords
  keywords: [
    "About Muhammad Shehzad",
    "Developer Journey",
    "Full Stack Developer Skills",
    "Tech Stack",
    "Developer Experience",
    "Educational Background",
    "React Developer Pakistan",
    "Next.js Developer",
    "Node.js Developer",
    "Web Development Career",
    "Software Engineer",
    "Freelance Developer",
    "Web Development Portfolio",
    "Islamabad Developer",
    "Tech Enthusiast",
    "Wordpress Developer",
    "Electron JS Developer",
    "Chrome Extension Developer",
  ],

  // Canonical URL set kiya gaya hai
  alternates: {
    canonical: "/about",
  },

  // Open Graph (Social Sharing) ke liye data
  openGraph: {
    title: "About Muhammad Shehzad | Full Stack Developer",
    description: "Learn about my journey, skills, and experience in web development.",
    url: "https://www.muhammad-shehzad.com/about", // Poora URL
    type: "profile", // 'profile' type 'about me' page ke liye behtar hai
    images: [
      {
        url: "https://www.muhammad-shehzad.com/shehzad.jpg", // Aapki main profile image
        width: 1200,
        height: 630,
        alt: "Muhammad Shehzad - Full Stack Developer",
      },
    ],
  },

  // Twitter Card ke liye data
  twitter: {
    card: "summary_large_image",
    title: "About Muhammad Shehzad | Full Stack Developer",
    description: "Learn about my journey, skills, and experience in web development.",
    creator: "@dev-shehzad",
    images: ["https://www.muhammad-shehzad.com/shehzad.jpg"],
  },
}

// About Page ke liye JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage", // Google ko batata hai ke yeh ek 'About' page hai
  name: "About Muhammad Shehzad",
  url: "https://www.muhammad-shehzad.com/about",
  mainEntity: {
    "@type": "Person",
    name: "Muhammad Shehzad",
    url: "https://www.muhammad-shehzad.com",
  },
}

interface AboutPageProps {
  searchParams: Promise<{
    filter?: string
  }>
}

export default async function AboutPage({ searchParams }: AboutPageProps) {
  const resolvedSearchParams = await searchParams
  const aboutFilter = (await resolvedSearchParams).filter || "All"

  return (
    <div className="space-y-8 mt-0">
      {/* Structured Data ko page mein shamil karna */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AboutTab aboutFilter={aboutFilter} />
    </div>
  )
}
