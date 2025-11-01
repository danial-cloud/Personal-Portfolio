import type { Metadata } from "next"
import { Suspense } from "react"
import { BlogSection } from "@/components/blog-section"
import { BlogHero } from "@/components/blog-hero"

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>
}

export const metadata: Metadata = {
  title: "Web Development Blog | Latest Tips, Guides & Industry Insights",
  description: "Stay updated with the latest web development trends, hiring guides, and technical insights. Expert advice from Muhammad Shehzad, a top-rated full stack developer.",
  keywords: [
    "Web Development Blog",
    "Full Stack Developer Blog",
    "Hiring Guide",
    "Web Development Tips",
    "Next.js Tutorials",
    "React Development",
    "Web Development Cost",
    "Tech Industry News",
    "Programming Tips",
    "Software Development"
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Web Development Blog | Expert Tips & Industry Insights",
    description: "Latest web development trends, hiring guides, and technical insights from Muhammad Shehzad. Stay ahead in the tech industry.",
    url: "https://www.muhammad-shehzad.com/blog",
    type: "website",
    images: [
      {
        url: "https://www.muhammad-shehzad.com/blog-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Web Development Blog - Muhammad Shehzad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Blog | Expert Tips & Industry Insights",
    description: "Latest web development trends, hiring guides, and technical insights from Muhammad Shehzad.",
    creator: "@dev-shehzad",
    images: ["https://www.muhammad-shehzad.com/blog-hero.jpg"],
  },
}

// JSON-LD for Blog
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Muhammad Shehzad's Web Development Blog",
  description: "Latest web development trends, hiring guides, and technical insights",
  url: "https://www.muhammad-shehzad.com/blog",
  author: {
    "@type": "Person",
    name: "Muhammad Shehzad",
    url: "https://www.muhammad-shehzad.com"
  },
  publisher: {
    "@type": "Person",
    name: "Muhammad Shehzad",
    url: "https://www.muhammad-shehzad.com"
  },
  inLanguage: "en-US"
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-8">
        <BlogHero />
        <Suspense fallback={<div className="flex items-center justify-center min-h-32">Loading blog posts...</div>}>
          <BlogSection initialCategory={params.category} />
        </Suspense>
      </div>
    </>
  )
}
