import { Metadata } from "next"
import { notFound } from "next/navigation"
import { services } from "@/data/services-data"
import { ArrowLeft, DollarSign, Clock, Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ServiceImage } from "@/components/service-image"
import Link from "next/link"

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = services.find(s => s.slug === slug)
  
  if (!service) {
    return {
      title: "Service Not Found",
    }
  }

  return {
    title: `${service.title} - Professional Web Development Service | Muhammad Shehzad`,
    description: service.seoDescription,
    keywords: [
      ...service.technologies,
      "web development",
      "full stack developer",
      "professional services",
      "software development",
      "custom web solutions",
      "responsive design",
      "Muhammad Shehzad",
      service.category.toLowerCase(),
      "freelance developer",
      "web developer for hire"
    ].join(", "),
    authors: [{ name: "Muhammad Shehzad", url: "https://muhammad-shehzad.com" }],
    creator: "Muhammad Shehzad",
    publisher: "Muhammad Shehzad",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: `${service.title} - Professional Web Development Service`,
      description: service.seoDescription,
      type: "website",
      siteName: "Muhammad Shehzad - Full Stack Developer",
      locale: "en_US",
      url: `https://muhammad-shehzad.com/services/${service.slug}`,
      images: [
        {
          url: service.image || "https://muhammad-shehzad.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} - Professional Web Development Service`,
      description: service.seoDescription,
      creator: "@dev_shehzad",
      images: [service.image || "https://muhammad-shehzad.com/og-image.jpg"],
    },
    alternates: {
      canonical: `https://muhammad-shehzad.com/services/${service.slug}`,
    },
    category: service.category,
  }
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = services.find(s => s.slug === slug)

  if (!service) {
    notFound()
  }

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.seoDescription,
    "image": service.image || "https://muhammad-shehzad.com/og-image.jpg",
    "provider": {
      "@type": "Person",
      "name": "Muhammad Shehzad",
      "url": "https://muhammad-shehzad.com"
    },
    "offers": {
      "@type": "Offer",
      "price": service.pricing.starting,
      "priceCurrency": service.pricing.currency,
      "availability": "https://schema.org/InStock"
    },
    "category": service.category,
    "serviceType": service.title,
    "areaServed": "Worldwide",
    "url": `https://muhammad-shehzad.com/services/${service.slug}`
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">

        {/* Service Header */}
        <div className="mb-12">
          {/* Service Image */}
          <div className="relative w-full h-80 lg:h-96 overflow-hidden rounded-3xl shadow-2xl dark:shadow-3xl">
            <ServiceImage 
              src={service.image} 
              alt={service.title}
              className="w-full h-full object-cover"
              fallbackContent={
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl border-0">
                      {service.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h1 className="text-white font-bold text-4xl mb-2">
                      {service.title}
                    </h1>
                    <p className="text-white/90 text-lg">
                      {service.shortDescription}
                    </p>
                  </div>
                </div>
              }
            />
            {/* Overlay with service info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute top-6 left-6">
              <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl border-0 backdrop-blur-sm">
                {service.category}
              </Badge>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-white font-bold text-4xl lg:text-5xl mb-3 leading-tight">
                {service.title}
              </h1>
              <p className="text-white/90 text-lg lg:text-xl max-w-2xl leading-relaxed">
                {service.shortDescription}
              </p>
            </div>
          </div>
          
          <div className="text-left mb-8 mt-8">
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span>Starting from ${service.pricing.starting}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{service.deliveryTime}</span>
              </div>
              <Badge 
                variant="secondary" 
                className="rounded-full bg-primary/10 text-primary border-0 hover:bg-primary/20 transition-colors duration-200 font-medium px-3 py-1"
              >
                {service.category}
              </Badge>
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="border border-border/70 dark:border-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Service Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="border border-border/70 dark:border-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
                <CardDescription>All features included in this service</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Technologies */}
            <Card className="border border-border/70 dark:border-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Technologies Used</CardTitle>
                <CardDescription>Modern tools and technologies we use</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary" 
                      className="rounded-full bg-primary/10 text-primary border-0 hover:bg-primary/20 transition-colors duration-200 font-medium px-3 py-1"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card className="border border-border/70 dark:border-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">
                    ${service.pricing.starting}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Starting Price
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Price Range:</span>
                    <span>${service.pricing.range}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Currency:</span>
                    <span>{service.pricing.currency}</span>
                  </div>
                </div>
                <Button className="w-full rounded-2xl" asChild>
                  <Link href={`/contact?service=${service.id}`}>
                    Get Free Quote
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card className="border border-border/70 dark:border-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Delivery</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Delivery Time: {service.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span>Quality Guaranteed</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
