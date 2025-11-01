import type { Metadata } from "next"
import { ContactTab } from "@/components/contact-tab"

// SEO ke liye Contact Page ka behtar metadata
export const metadata: Metadata = {
  // Title ko action-oriented banaya gaya hai (e.g., "Hire a Developer")
  title: "Contact Muhammad Shehzad - Hire a Full Stack Developer",

  // Description mein location aur project types shamil kiye gaye hain
  description:
    "Ready to start your next web project? Contact Muhammad Shehzad, a freelance Full Stack Developer, for web development, collaborations, or a project quote.",

  // Contact aur hiring se mutalliq keywords
  keywords: [
    "Contact Muhammad Shehzad",
    "Hire Full Stack Developer",
    "Freelance Web Developer Islamabad",
    "Get a project quote",
    "Next.js developer for hire",
    "Web development services",
    "Contact web developer",
    "React developer for hire",
    "Node.js developer for hire",
    "Full Stack Developer contact",
    "Web development contact",
    "Hire React Developer",
    "Hire Node.js Developer",
    "Freelance React Developer",
    "Freelance Node.js Developer",
    "Web Development Islamabad",
  ],

  // Is page ke liye canonical URL
  alternates: {
    canonical: "/contact",
  },

  // Open Graph (Social Sharing) ke liye data
  openGraph: {
    title: "Contact Me | Muhammad Shehzad, Full Stack Developer",
    description: "Get in touch to discuss your project. Available for freelance work and collaborations.",
    url: "https://www.muhammad-shehzad.com/contact",
    type: "website",
    images: [
      {
        url: "https://www.muhammad-shehzad.com/shehzad.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Muhammad Shehzad - Full Stack Developer",
      },
    ],
  },

  // Twitter Card ke liye data
  twitter: {
    card: "summary_large_image",
    title: "Contact Me | Muhammad Shehzad, Full Stack Developer",
    description: "Get in touch to discuss your project. Available for freelance work and collaborations.",
    creator: "@dev-shehzad",
    images: ["https://www.muhammad-shehzad.com/shehzad.jpg"],
  },
}

// Contact Page ke liye JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage", // Google ko batata hai ke yeh ek 'Contact' page hai
  name: "Contact Muhammad Shehzad for Web Projects",
  description: "Contact page for Muhammad Shehzad to hire him for freelance web development projects.",
  url: "https://www.muhammad-shehzad.com/contact",
  mainEntity: {
    "@type": "Person",
    name: "Muhammad Shehzad",
    url: "https://www.muhammad-shehzad.com",
    jobTitle: "Full Stack Developer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bhakkar",
      addressCountry: "PK",
    },
  },
}

interface ContactPageProps {
  searchParams: Promise<{
    filter?: string
  }>
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams
  const contactFilter = (await params).filter || "Contact"

  return (
    <div className="space-y-8 mt-0">
      {/* Structured Data ko page mein shamil karna */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContactTab contactFilter={contactFilter} />
    </div>
  )
}
