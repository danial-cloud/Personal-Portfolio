import type { Metadata } from "next"
import { Suspense } from "react"
import dynamic from "next/dynamic"

// Lazy load heavy components
const HeroSection = dynamic(() => import("@/components/hero-section").then(mod => ({ default: mod.HeroSection })), {
  loading: () => <div className="h-96 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl animate-pulse" />
})

const FeaturedProjects = dynamic(() => import("@/components/featured-projects").then(mod => ({ default: mod.FeaturedProjects })), {
  loading: () => <div className="h-64 bg-muted rounded-3xl animate-pulse" />
})

const Skills = dynamic(() => import("@/components/skills").then(mod => ({ default: mod.Skills })), {
  loading: () => <div className="h-64 bg-muted rounded-3xl animate-pulse" />
})

const Experience = dynamic(() => import("@/components/experience").then(mod => ({ default: mod.Experience })), {
  loading: () => <div className="h-64 bg-muted rounded-3xl animate-pulse" />
})

const ReviewsSection = dynamic(() => import("@/components/reviews-section").then(mod => ({ default: mod.ReviewsSection })), {
  loading: () => <div className="h-64 bg-muted rounded-3xl animate-pulse" />
})

const FAQSection = dynamic(() => import("@/components/faq-section").then(mod => ({ default: mod.FAQSection })), {
  loading: () => <div className="h-64 bg-muted rounded-3xl animate-pulse" />
})

export const metadata: Metadata = {
  title: "Muhammad Shehzad - Full Stack Developer | Web & Software Development Services",
  description:
    "Hire Top Full Stack Developer | 5.0 Rating | 100+ Projects | Get Free Quote Today! Building high-performance web apps with Next.js, React, Node.js. Contact me now!",
  keywords: [
    "Full Stack Developer USA",
    "Hire Full Stack Developer",
    "Muhammad Shehzad",
    "Web Developer Islamabad",
    "Next.js Developer Pakistan",
    "React Developer",
    "Freelance Developer",
    "Custom Web Applications",
    "Software Development Services",
    "MERN Stack Expert",
    "Electron JS Developer",
    "Chrome Extension Developer",
    "WordPress Developer",
    "Web Design",
    "Responsive Web Design",
    "UI/UX Design",
    "API Development",
    "Portfolio Developer"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Muhammad Shehzad | Expert Full Stack Developer",
    description:
      "Building high-performance web applications and custom software solutions. Based in Pakistan, serving clients worldwide including the US, UK, and Canada.",
    url: "https://www.muhammad-shehzad.com",
    type: "website",
    images: [
      {
        url: "https://www.muhammad-shehzad.com/shehzad.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Shehzad - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Shehzad | Expert Full Stack Developer",
    description: "Hire a highly skilled full stack developer for your next project.",
    creator: "@dev-shehzad",
    images: ["https://www.muhammad-shehzad.com/shehzad.jpg"],
  },
}

// ✅ JSON-LD with type: Service (Best for promoting services directly)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Muhammad Shehzad - Full Stack Developer",
  url: "https://www.muhammad-shehzad.com",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.muhammad-shehzad.com/projects?search={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  mainEntity: {
    "@type": "Service",
    serviceType: "Full Stack Web Development",
    description: "Hire a top-rated full stack developer for custom web apps, React/Next.js, Node.js solutions, and more. Serving US clients and worldwide.",
    areaServed: {
      "@type": "Country",
      name: "United States"
    },
    provider: {
      "@type": "Person",
      name: "Muhammad Shehzad",
      jobTitle: "Full Stack Developer",
      url: "https://www.muhammad-shehzad.com",
      image: "https://www.muhammad-shehzad.com/shehzad.jpg",
      email: "mailto:info@muhammad-shehzad.com",
      telephone: "+923015514968",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bhakkar",
        addressCountry: "PK",
      },
      sameAs: [
        "https://github.com/dev-shehzad",
        "https://www.linkedin.com/in/dev-shehzad/",
        "https://twitter.com/dev-shehzad",
        "https://www.fiverr.com/dev_shehzad"
      ],
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "MongoDB",
        "WordPress",
        "Web Development",
        "Software Engineering",
        "Electron JS",
        "Wordpress Development",
        "Chrome Extension Development",
        "UI/UX Design",
        "API Development",
        "Responsive Design",
        "Freelance Development",  
        "Sanity.io",
        "Firebase",
        "CMS Development",
        "Web Applications",
        "Strapi CMS",
        "Progressive Web Apps",
      ]
    }
  }
}

function HomePageContent() {
  return (
    <div className="space-y-8 mt-0">
      <HeroSection />
      <FeaturedProjects />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Skills />
        <Experience />
      </div>
      <ReviewsSection />
      <FAQSection />
    </div>
  )
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <HomePageContent />
      </Suspense>
    </>
  )
}
