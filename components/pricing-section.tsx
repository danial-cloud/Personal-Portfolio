"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, X, ArrowRight, Star, Zap, Crown, Plus, Minus, Search } from "lucide-react"
import { pricingPlans, addOnServices, pricingFaqs } from "@/data/pricing-data"

interface PricingSectionProps {
  initialPackage?: string
}

export function PricingSection({ initialPackage }: PricingSectionProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPackage, setSelectedPackage] = useState(initialPackage || "All")

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const filteredPlans = pricingPlans.filter(plan => {
    const matchesSearch = searchQuery === "" || 
      plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesPackage = selectedPackage === "All" || plan.id === selectedPackage
    return matchesSearch && matchesPackage
  })

  return (
    <section id="pricing-plans" className="space-y-12 pt-8">
      {/* Pricing Plans Heading */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Pricing Plans</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect package for your project. All plans include professional development and support.
        </p>
      </div>

      {/* Filters */}
      <section className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search packages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-2xl bg-background pl-9 pr-4 py-2 border-border"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                <SelectTrigger className="w-[180px] rounded-2xl border-border">
                  <SelectValue placeholder="Package" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="All" className="rounded-xl">All Packages</SelectItem>
                  {pricingPlans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id} className="rounded-xl">
                      {plan.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/20 rounded-xl border-0 shadow-sm">
            {filteredPlans.length} Packages
          </Badge>
        </div>
      </section>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {filteredPlans.map((plan) => (
          <motion.div key={plan.id} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
            <Card className={`overflow-hidden rounded-2xl border transition-all duration-300 bg-card shadow-sm dark:shadow-lg h-full flex flex-col relative ${
              plan.popular ? 'border-primary/50 ring-1 ring-primary/20' : 'hover:border-primary/30'
            }`}>
              {plan.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg border-0 text-xs">
                    <Star className="mr-1 h-3 w-3" />
                    Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-6 flex-shrink-0">
                <div className="text-center">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${plan.color} text-white mb-4`}>
                    {plan.icon}
                  </div>
                  <CardTitle className="text-xl text-foreground mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="text-4xl font-bold text-foreground mb-2">
                    ${plan.price.monthly}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    one-time payment
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pb-6 flex-grow">
                <div className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.slice(0, 5).map((feature) => (
                      <div key={feature} className="flex items-center gap-3 text-sm">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                    {plan.features.length > 5 && (
                      <div className="text-xs text-muted-foreground text-center pt-2">
                        +{plan.features.length - 5} more features
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex-shrink-0 pt-4">
                <Button 
                  variant={plan.buttonVariant}
                  className={`w-full rounded-2xl ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                  asChild
                >
                  <a href="/contact">
                    {plan.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add-on Services */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-2">Add-on Services</h3>
          <p className="text-muted-foreground">Enhance your package with these additional services</p>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {addOnServices.map((service) => (
            <motion.div key={service.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className="overflow-hidden rounded-2xl border hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{service.name}</h4>
                    <Badge variant="outline" className="rounded-xl">
                      ${service.price}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Duration: {service.duration}</span>
                    <Button variant="ghost" size="sm" className="rounded-xl">
                      Add Service
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-2">Frequently Asked Questions</h3>
          <p className="text-muted-foreground">Common questions about our pricing and services</p>
        </div>
        
        <div className="max-w-6xl mx-auto space-y-4">
          {pricingFaqs.map((faq, index) => (
            <motion.div key={index} whileHover={{ scale: 1.01 }}>
              <Card className="overflow-hidden rounded-2xl border border-border/30 dark:border-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-foreground">{faq.question}</h4>
                    {expandedFaq === index ? (
                      <Minus className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Plus className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
                {expandedFaq === index && (
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 max-w-6xl mx-auto">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-foreground">Ready to Get Started?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose a package that fits your needs, or contact us for a custom quote. We're here to help you build the perfect solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="rounded-2xl" asChild>
                <a href="/contact">
                  Get Free Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" className="rounded-2xl" asChild>
                <a href="/services">
                  View All Services
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
