import type { Metadata } from "next"
import { Suspense } from "react"
import { ServicesSection } from "@/components/services-section"
import { ServicesHero } from "@/components/services-hero"

interface ServicesPageProps {
  searchParams: Promise<{ category?: string }>
}

export const metadata: Metadata = {
  title: "Web Development Services | Custom Websites, Apps & Digital Solutions",
  description: "Professional web development services including custom websites, mobile apps, e-commerce solutions, and backend development. Get your project started with a top-rated full stack developer.",
  keywords: [
    "Web Development Services",
    "Custom Website Development",
    "Mobile App Development",
    "E-commerce Development",
    "Backend Development",
    "UI/UX Design",
    "CMS Development",
    "Full Stack Developer",
    "Hire Developer",
    "Web Development Pakistan"
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Professional Web Development Services | Custom Solutions",
    description: "Comprehensive web development services including websites, mobile apps, e-commerce, and backend development. Professional solutions for your business needs.",
    url: "https://www.muhammad-shehzad.com/services",
    type: "website",
    images: [
      {
        url: "https://www.muhammad-shehzad.com/services-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Web Development Services - Muhammad Shehzad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Web Development Services | Custom Solutions",
    description: "Comprehensive web development services including websites, mobile apps, e-commerce, and backend development.",
    creator: "@dev-shehzad",
    images: ["https://www.muhammad-shehzad.com/services-hero.jpg"],
  },
}

// JSON-LD for Services
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Web Development Services",
  description: "Professional web development services including custom websites, mobile apps, e-commerce solutions, and backend development",
  url: "https://www.muhammad-shehzad.com/services",
  provider: {
    "@type": "Person",
    name: "Muhammad Shehzad",
    jobTitle: "Full Stack Developer",
    url: "https://www.muhammad-shehzad.com",
    email: "info@muhammad-shehzad.com",
    telephone: "+923015514968",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bhakkar",
      addressCountry: "PK",
    }
  },
  areaServed: {
    "@type": "Country",
    name: "Worldwide"
  },
  serviceType: [
    "Web Development",
    "Mobile App Development", 
    "E-commerce Development",
    "Backend Development",
    "UI/UX Design",
    "CMS Development"
  ],
  offers: {
    "@type": "Offer",
    description: "Professional web development services with competitive pricing",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock"
  }
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const params = await searchParams
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-8">
        <ServicesHero />
        <Suspense fallback={<div className="flex items-center justify-center min-h-32">Loading services...</div>}>
          <ServicesSection initialCategory={params.category} />
        </Suspense>
      </div>
    </>
  )
}
