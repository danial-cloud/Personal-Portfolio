"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, DollarSign, ArrowRight, CheckCircle, Star, Search, X, Code } from "lucide-react"
import Image from "next/image"
import { services, serviceCategories, popularServices } from "@/data/services-data"

interface ServicesSectionProps {
  initialCategory?: string
}

// Image component with fallback
function ServiceImageWithFallback({ src, alt, className }: { src: string, alt: string, className?: string }) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <div className={`${className} bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 flex items-center justify-center`}>
        <div className="text-white text-center p-4">
          <div className="text-4xl mb-2">🖼️</div>
          <div className="text-sm">Image Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <Image 
      src={src} 
      alt={alt}
      fill
      className={className}
      onError={() => setImageError(true)}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}

export function ServicesSection({ initialCategory }: ServicesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "All")
  const [searchQuery, setSearchQuery] = useState("")
  const searchParams = useSearchParams()
  
  // Listen for URL changes from sidebar
  useEffect(() => {
    const category = searchParams.get("category")
    if (category) {
      setSelectedCategory(category)
    } else {
      setSelectedCategory("All")
    }
  }, [searchParams])
  
  // Update URL when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    const url = category === "All" ? "/services" : `/services?category=${encodeURIComponent(category)}`
    window.history.pushState({}, "", url)
  }

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory
    const matchesSearch = searchQuery === "" || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <section id="services-list" className="space-y-8">
      {/* Filters */}
      <section className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-row gap-3 md:flex-row md:items-center md:gap-4">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-3 h-4 w-4 text-foreground/60" />
              <Input
                type="search"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-2xl bg-background pl-9 pr-4 py-2 border-border dark:border-border"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-8 w-8 rounded-xl"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex gap-2 md:flex-shrink-0">
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-[140px] md:w-[180px] rounded-2xl border-border dark:border-border">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  {serviceCategories.map((category) => (
                    <SelectItem key={category} value={category} className="rounded-xl">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/20 rounded-xl border-0 shadow-sm self-start md:self-auto">
            {filteredServices.length} Services
          </Badge>
        </div>
      </section>

      {/* Popular Services */}
      {selectedCategory === "All" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Popular Services</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {popularServices.map((service) => (
              <motion.div key={service.id} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Card className="overflow-hidden rounded-3xl border border-border/30 dark:border-border hover:border-primary/30 hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 bg-card shadow-sm dark:shadow-lg h-full flex flex-col relative">
                  {/* Service Image */}
                  <div className="aspect-video overflow-hidden relative">
                    <ServiceImageWithFallback 
                      src={service.image} 
                      alt={service.title}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl border-0">
                          {service.category}
                        </Badge>
                      </div>
                      {service.isPopular && (
                        <div className="absolute top-4 right-4 z-10">
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 rounded-xl border-0">
                            <Star className="mr-1 h-3 w-3" />
                            Popular
                          </Badge>
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="text-white font-semibold text-lg line-clamp-2">
                          {service.title}
                        </h4>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-black/60 text-white hover:bg-black/70 rounded-xl border-0 backdrop-blur-sm">
                        {service.category}
                      </Badge>
                    </div>
                    {service.isPopular && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 rounded-xl border-0 shadow-lg">
                          <Star className="mr-1 h-3 w-3" />
                          Popular
                        </Badge>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <h4 className="text-white font-semibold text-lg line-clamp-2">
                        {service.title}
                      </h4>
                    </div>
                  </div>
                  <CardHeader className="pb-2 flex-shrink-0">
                    <CardDescription className="text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                      {service.shortDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <DollarSign className="h-3 w-3" />
                          <span>Starting from ${service.pricing.starting}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{service.deliveryTime}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {service.technologies.slice(0, 4).map((tech) => (
                          <Badge key={tech} variant="outline" className="rounded-xl text-xs border-border">
                            {tech}
                          </Badge>
                        ))}
                        {service.technologies.length > 4 && (
                          <Badge variant="outline" className="rounded-xl text-xs border-border">
                            +{service.technologies.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-shrink-0">
                    <Button 
                      variant="outline" 
                      className="w-full rounded-2xl"
                      asChild
                    >
                      <a href={`/services/${service.slug}`}>
                        Learn More
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* All Services */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">
            {selectedCategory === "All" ? "All Services" : `${selectedCategory} Services`}
          </h3>
          <span className="text-sm text-muted-foreground">
            {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredServices.map((service) => (
              <motion.div key={service.id} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Card className="overflow-hidden rounded-3xl border border-border/30 dark:border-border hover:border-primary/30 hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 bg-card shadow-sm dark:shadow-lg h-full flex flex-col relative">
                  {/* Service Image */}
                  <div className="aspect-video overflow-hidden relative">
                    <ServiceImageWithFallback 
                      src={service.image} 
                      alt={service.title}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl border-0">
                          {service.category}
                        </Badge>
                      </div>
                      {service.isPopular && (
                        <div className="absolute top-4 right-4 z-10">
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 rounded-xl border-0">
                            <Star className="mr-1 h-3 w-3" />
                            Popular
                          </Badge>
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="text-white font-semibold text-lg line-clamp-2">
                          {service.title}
                        </h4>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-black/60 text-white hover:bg-black/70 rounded-xl border-0 backdrop-blur-sm">
                        {service.category}
                      </Badge>
                    </div>
                    {service.isPopular && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 rounded-xl border-0 shadow-lg">
                          <Star className="mr-1 h-3 w-3" />
                          Popular
                        </Badge>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <h4 className="text-white font-semibold text-lg line-clamp-2">
                        {service.title}
                      </h4>
                    </div>
                  </div>
                  <CardHeader className="pb-2 flex-shrink-0">
                    <CardDescription className="text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                      {service.shortDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <DollarSign className="h-3 w-3" />
                          <span>Starting from ${service.pricing.starting}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{service.deliveryTime}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-foreground">Key Features:</h4>
                        <div className="space-y-1">
                          {service.features.slice(0, 3).map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                          {service.features.length > 3 && (
                            <div className="text-xs text-muted-foreground">
                              +{service.features.length - 3} more features
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {service.technologies.slice(0, 4).map((tech) => (
                          <Badge key={tech} variant="outline" className="rounded-xl text-xs border-border">
                            {tech}
                          </Badge>
                        ))}
                        {service.technologies.length > 4 && (
                          <Badge variant="outline" className="rounded-xl text-xs border-border">
                            +{service.technologies.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-shrink-0">
                    <Button 
                      variant="outline" 
                      className="w-full rounded-2xl"
                      asChild
                    >
                      <a href={`/services/${service.slug}`}>
                        Learn More
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No services found</h3>
              <p>Try selecting a different category</p>
            </div>
            <Button onClick={() => setSelectedCategory("All")} className="rounded-xl">
              View All Services
            </Button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-foreground">Ready to Start Your Project?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get a free consultation and quote for your project. I'll help you choose the right service and create a solution that meets your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="rounded-2xl" asChild>
              <a href="/contact">
                Get Free Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" className="rounded-2xl" asChild>
              <a href="/projects">
                View Portfolio
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
