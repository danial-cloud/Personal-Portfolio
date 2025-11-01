import type { Metadata } from "next"
import { ReviewsTab } from "@/components/reviews-tab"

// ✅ SEO Metadata (Same)
export const metadata: Metadata = {
  title: "Client Testimonials & Reviews - Muhammad Shehzad",
  description:
    "See what my clients have to say. Read genuine testimonials and 5-star reviews from my freelance work on platforms like Fiverr, highlighting 100% client satisfaction.",
  keywords: [
    "Client testimonials",
    "Web developer reviews",
    "Muhammad Shehzad reviews",
    "Fiverr developer feedback",
    "Client feedback portfolio",
    "5-star developer",
    "Positive developer reviews",
    "Freelance developer testimonials",
    "Web development client reviews",
    "Full Stack Developer feedback",
    "Muhammad Shehzad client reviews",
  ],
  alternates: {
    canonical: "/reviews",
  },
  openGraph: {
    title: "Client Reviews for Muhammad Shehzad | 5-Star Rated Developer",
    description: "Read real feedback and testimonials from satisfied clients.",
    url: "https://www.muhammad-shehzad.com/reviews",
    type: "website",
    images: [
      {
        url: "https://www.muhammad-shehzad.com/shehzad.jpg",
        width: 1200,
        height: 630,
        alt: "Client Reviews for Muhammad Shehzad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Reviews for Muhammad Shehzad | 5-Star Rated Developer",
    description: "Read real feedback and testimonials from satisfied clients.",
    creator: "@dev-shehzad",
    images: ["https://www.muhammad-shehzad.com/shehzad.jpg"],
  },
}

// ✅ Valid structured data without reviews
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Muhammad Shehzad - Web Developer",
  url: "https://www.muhammad-shehzad.com",
  image: "https://www.muhammad-shehzad.com/shehzad.jpg",
  description: "Freelance Full Stack Web Developer | Wordpress | Next.js | React | Node.js",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bhakkar, Punjab, Pakistan",
    addressCountry: "PK",
  },
  telephone: "+923015514968",
  priceRange: "$$",
}

interface ReviewsPageProps {
  searchParams: Promise<{
    filter?: string
  }>
}

export default async function ReviewsPage({ searchParams }: ReviewsPageProps) {
  const params = await searchParams
  const reviewsFilter = (await params).filter || "All Reviews"

  return (
    <div className="space-y-8 mt-0">
      {/* ✅ Valid JSON-LD, no reviews */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ReviewsTab component still showing UI reviews (SEO se alag) */}
      <ReviewsTab reviewsFilter={reviewsFilter} />
    </div>
  )
}
