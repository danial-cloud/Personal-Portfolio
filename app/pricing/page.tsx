import type { Metadata } from "next"
import { Suspense } from "react"
import { PricingSection } from "@/components/pricing-section"
import { PricingHero } from "@/components/pricing-hero"

interface PricingPageProps {
  searchParams: Promise<{ package?: string }>
}

export const metadata: Metadata = {
  title: "Web Development Pricing | Affordable Packages Starting $299",
  description: "Transparent web development pricing with flexible packages. Basic ($299), Professional ($699), and Enterprise ($1299) packages. Get your project started today with competitive rates.",
  keywords: [
    "Web Development Pricing",
    "Website Development Cost",
    "Web Development Packages",
    "Affordable Web Development",
    "Web Development Rates",
    "Custom Website Pricing",
    "E-commerce Development Cost",
    "Web Development Pakistan",
    "Hire Developer Cost",
    "Web Development Budget"
  ],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Web Development Pricing | Transparent & Affordable Packages",
    description: "Clear and transparent web development pricing. Choose from Basic, Professional, or Enterprise packages. Starting from $299 with flexible payment options.",
    url: "https://www.muhammad-shehzad.com/pricing",
    type: "website",
    images: [
      {
        url: "https://www.muhammad-shehzad.com/pricing-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Web Development Pricing - Muhammad Shehzad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Pricing | Transparent & Affordable Packages",
    description: "Clear and transparent web development pricing. Choose from Basic, Professional, or Enterprise packages. Starting from $500.",
    creator: "@dev-shehzad",
    images: ["https://www.muhammad-shehzad.com/pricing-hero.jpg"],
  },
}

// JSON-LD for Pricing
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Web Development Services",
  description: "Professional web development services with transparent pricing",
  url: "https://www.muhammad-shehzad.com/pricing",
  provider: {
    "@type": "Person",
    name: "Muhammad Shehzad",
    jobTitle: "Full Stack Developer",
    url: "https://www.muhammad-shehzad.com",
    email: "info@muhammad-shehzad.com",
    telephone: "+923015514968"
  },
  offers: [
    {
      "@type": "Offer",
      name: "Basic Package",
      description: "Perfect for small businesses and startups",
      price: "500",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock"
    },
    {
      "@type": "Offer", 
      name: "Professional Package",
      description: "Ideal for growing businesses with advanced features",
      price: "1200",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      name: "Enterprise Package", 
      description: "Complete solution for large businesses",
      price: "2500",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock"
    }
  ]
}

export default async function PricingPage({ searchParams }: PricingPageProps) {
  const params = await searchParams
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-8">
        <PricingHero />
        <Suspense fallback={<div className="flex items-center justify-center min-h-32">Loading pricing...</div>}>
          <PricingSection initialPackage={params.package} />
        </Suspense>
      </div>
    </>
  )
}
