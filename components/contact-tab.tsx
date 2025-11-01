"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, Download, ExternalLink, MessageCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { contactInfo } from "@/data/contact-data"
import { services } from "@/data/services-data"

// You might need to add a toast/notification component for better UX
// For simplicity, we'll use a basic state for messages here.

interface ContactTabProps {
  contactFilter?: string
}

export function ContactTab({ contactFilter = "Contact" }: ContactTabProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    services: [] as string[],
    budget: "",
  })
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [lastSubmittedData, setLastSubmittedData] = useState<any>(null)

  // Auto-check services based on URL parameters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const serviceParam = urlParams.get('service')
      if (serviceParam) {
        setFormData(prev => ({
          ...prev,
          services: [serviceParam]
        }))
      }
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: checked 
        ? [...(prev.services || []), serviceId]
        : (prev.services || []).filter(id => id !== serviceId)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatusMessage(null) // Clear previous messages

    try {
      const response = await fetch('/api/contact', { // Call your new API route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setLastSubmittedData(formData) // Store submitted data for resend
        setStatusMessage({ type: 'success', text: 'Message sent successfully! We\'ll get back to you within 24 hours. Check your email for confirmation.' })
        setFormData({ name: "", email: "", subject: "", message: "", services: [], budget: "" }) // Clear form
      } else {
        setStatusMessage({ type: 'error', text: data.message || 'Failed to send message. Please try again.' })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatusMessage({ type: 'error', text: 'An unexpected error occurred. Please try again later.' })
    } finally {
      setLoading(false)
    }
  }

  const showHero = true // Always show Hero section

  // Show sections based on filter
  const showContactInfo = contactFilter === "Contact" || contactFilter === "Contact Info"
  const showSocialMedia = contactFilter === "Contact" || contactFilter === "Social Media"
  const showContactForm = contactFilter === "Contact" || contactFilter === "Send Message"
  const showResume =
    contactFilter === "Contact" ||
    contactFilter === "Contact Info" ||
    contactFilter === "Social Media" ||
    contactFilter === "Send Message" ||
    contactFilter === "Resume"

  return (
    <>
      {/* Hero Section */}
      {showHero && (
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-700 dark:via-purple-700 dark:to-indigo-700 p-8 text-white shadow-lg dark:shadow-2xl"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">Get In Touch</h2>
                <p className="max-w-[600px] text-white/80">
                  Have a project in mind or want to collaborate? I'd love to hear from you. Let's create something
                  amazing together!
                </p>
              </div>
              <Badge className="w-fit bg-white/20 text-white hover:bg-white/30 rounded-xl border-0 shadow-lg">
                {contactInfo.personal.availability}
              </Badge>
            </div>
          </motion.div>
        </section>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
         {/* Contact Information */}
         <div className="space-y-6">
          {/* Contact Info Card */}
          {showContactInfo && (
            <section id="contact-info">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="rounded-3xl bg-card shadow-sm dark:shadow-lg border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Contact Information</CardTitle>
                    <CardDescription>Feel free to reach out through any of these channels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {contactInfo.contactMethods.map((info, index) => (
                      <motion.a
                        key={info.label}
                        href={info.href}
                        target={info.label === "Location" ? "_blank" : undefined}
                        rel={info.label === "Location" ? "noopener noreferrer" : undefined}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-muted/50"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <info.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{info.label}</p>
                          <p className="text-sm text-muted-foreground">{info.value}</p>
                        </div>
                        {info.label === "Location" && (
                          <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
                        )}
                      </motion.a>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </section>
          )}

           {/* Social Media */}
           {showSocialMedia && (
             <section id="contact-social" className="mt-6">
               <motion.div
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.5, delay: 0.2 }}
               >
                <Card className="rounded-3xl bg-card shadow-sm dark:shadow-lg border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Social Media</CardTitle>
                    <CardDescription>Connect with me on social platforms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {contactInfo.social.map((social, index) => (
                        <motion.a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-muted/50"
                        >
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-muted ${
                              social.name === "GitHub" ? "text-foreground" : social.color
                            }`}
                          >
                            <social.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{social.name}</p>
                            <p className="text-sm text-muted-foreground">{social.username}</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </motion.a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </section>
          )}

           {/* Resume Download */}
           {showResume && (
             <section id="contact-resume" className="mt-6">
               <motion.div
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.5, delay: 0.3 }}
               >
                <Card className="rounded-3xl bg-card shadow-sm dark:shadow-lg border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Resume</CardTitle>
                    <CardDescription>Download my latest resume</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-foreground">Quick Info</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {contactInfo.quickInfo.map((info, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="text-xs">•</span>
                            <span>{info}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full rounded-2xl bg-transparent" asChild>
                      <a href={contactInfo.links.resumePdf} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        Download Resume
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </section>
          )}
        </div>

        {/* Contact Form */}
        {showContactForm && (
          <section id="contact-form">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="rounded-3xl bg-card shadow-sm dark:shadow-lg border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Send a Message</CardTitle>
                  <CardDescription>I'll get back to you as soon as possible</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                         <Label htmlFor="name" className="mb-3">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your name"
                          className="rounded-2xl border-border focus:border-blue-400 focus:shadow-md focus:outline-none transition-all duration-200"
                          style={{ outline: 'none !important' }}
                          onFocus={(e) => {
                            e.target.style.outline = 'none';
                            e.target.style.boxShadow = '0 0 0 3px rgba(96, 165, 250, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                            e.target.style.border = '1px solid #60a5fa';
                          }}
                          onBlur={(e) => {
                            e.target.style.border = '1px solid hsl(var(--border))';
                            e.target.style.boxShadow = 'none';
                          }}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                         <Label htmlFor="email" className="mb-3">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          className="rounded-2xl border-border focus:border-blue-400 focus:shadow-md focus:outline-none transition-all duration-200"
                          style={{ outline: 'none !important' }}
                          onFocus={(e) => {
                            e.target.style.outline = 'none';
                            e.target.style.boxShadow = '0 0 0 3px rgba(96, 165, 250, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                            e.target.style.border = '1px solid #60a5fa';
                          }}
                          onBlur={(e) => {
                            e.target.style.border = '1px solid hsl(var(--border))';
                            e.target.style.boxShadow = 'none';
                          }}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="subject" className="mb-3">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What's this about?"
                        className="rounded-2xl border-border focus:border-blue-400 focus:shadow-md focus:outline-none transition-all duration-200"
                        style={{ outline: 'none !important' }}
                        onFocus={(e) => {
                          e.target.style.outline = 'none';
                          e.target.style.boxShadow = '0 0 0 3px rgba(96, 165, 250, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                          e.target.style.border = '1px solid #60a5fa';
                        }}
                        onBlur={(e) => {
                          e.target.style.border = '1px solid hsl(var(--border))';
                          e.target.style.boxShadow = 'none';
                        }}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="message" className="mb-3">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your project or idea..."
                        className="min-h-[120px] rounded-2xl border-border focus:border-blue-400 focus:shadow-md focus:outline-none transition-all duration-200 resize-none"
                        style={{ 
                          outline: 'none !important',
                          boxShadow: 'none !important'
                        }}
                        onFocus={(e) => {
                          e.target.style.outline = 'none';
                          e.target.style.boxShadow = '0 0 0 3px rgba(96, 165, 250, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                          e.target.style.border = '1px solid #60a5fa';
                        }}
                        onBlur={(e) => {
                          e.target.style.border = '1px solid hsl(var(--border))';
                          e.target.style.boxShadow = 'none';
                        }}
                        required
                      />
                    </div>
                    
                     {/* Services Selection */}
                     <div className="space-y-3">
                       <div className="mb-4">
                         <Label className="text-base font-medium">Services Needed (Optional)</Label>
                       </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {services.map((service) => (
                          <div key={service.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={service.id}
                              checked={formData.services?.includes(service.id) || false}
                              onCheckedChange={(checked) => 
                                handleServiceChange(service.id, checked as boolean)
                              }
                              className="rounded-md"
                            />
                            <Label 
                              htmlFor={service.id} 
                              className="text-sm font-normal cursor-pointer flex-1"
                            >
                              {service.title}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                     {/* Budget Selection */}
                     <div className="space-y-3">
                       <div className="mb-4">
                         <Label className="text-base font-medium">What's your budget? (Optional)</Label>
                       </div>
                      <RadioGroup 
                        value={formData.budget} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
                        className="grid grid-cols-1 md:grid-cols-2 gap-3"
                      >
                        <div className="relative">
                          <RadioGroupItem value="100-200" id="100-200" className="sr-only" />
                          <Label 
                            htmlFor="100-200" 
                            className={`block p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-sm ${
                              formData.budget === "100-200" 
                                ? "border-primary bg-primary/5 shadow-sm" 
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full border ${
                                  formData.budget === "100-200" 
                                    ? "border-primary bg-primary" 
                                    : "border-border"
                                }`}>
                                  {formData.budget === "100-200" && (
                                    <div className="w-1.5 h-1.5 bg-white rounded-full m-0.5"></div>
                                  )}
                                </div>
                                <span className="font-medium text-sm">$100 - $200</span>
                              </div>
                              <span className="text-xs text-muted-foreground">Basic</span>
                            </div>
                          </Label>
                        </div>
                        
                        <div className="relative">
                          <RadioGroupItem value="200-500" id="200-500" className="sr-only" />
                          <Label 
                            htmlFor="200-500" 
                            className={`block p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-sm ${
                              formData.budget === "200-500" 
                                ? "border-primary bg-primary/5 shadow-sm" 
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full border ${
                                  formData.budget === "200-500" 
                                    ? "border-primary bg-primary" 
                                    : "border-border"
                                }`}>
                                  {formData.budget === "200-500" && (
                                    <div className="w-1.5 h-1.5 bg-white rounded-full m-0.5"></div>
                                  )}
                                </div>
                                <span className="font-medium text-sm">$200 - $500</span>
                              </div>
                              <span className="text-xs text-muted-foreground">Standard</span>
                            </div>
                          </Label>
                        </div>
                        
                        <div className="relative">
                          <RadioGroupItem value="500-1000" id="500-1000" className="sr-only" />
                          <Label 
                            htmlFor="500-1000" 
                            className={`block p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-sm ${
                              formData.budget === "500-1000" 
                                ? "border-primary bg-primary/5 shadow-sm" 
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full border ${
                                  formData.budget === "500-1000" 
                                    ? "border-primary bg-primary" 
                                    : "border-border"
                                }`}>
                                  {formData.budget === "500-1000" && (
                                    <div className="w-1.5 h-1.5 bg-white rounded-full m-0.5"></div>
                                  )}
                                </div>
                                <span className="font-medium text-sm">$500 - $1000</span>
                              </div>
                              <span className="text-xs text-muted-foreground">Premium</span>
                            </div>
                          </Label>
                        </div>
                        
                        <div className="relative">
                          <RadioGroupItem value="1000-2000" id="1000-2000" className="sr-only" />
                          <Label 
                            htmlFor="1000-2000" 
                            className={`block p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-sm ${
                              formData.budget === "1000-2000" 
                                ? "border-primary bg-primary/5 shadow-sm" 
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full border ${
                                  formData.budget === "1000-2000" 
                                    ? "border-primary bg-primary" 
                                    : "border-border"
                                }`}>
                                  {formData.budget === "1000-2000" && (
                                    <div className="w-1.5 h-1.5 bg-white rounded-full m-0.5"></div>
                                  )}
                                </div>
                                <span className="font-medium text-sm">$1000 - $2000</span>
                              </div>
                              <span className="text-xs text-muted-foreground">Enterprise</span>
                            </div>
                          </Label>
                        </div>
                        
                        <div className="relative">
                          <RadioGroupItem value="2000-5000" id="2000-5000" className="sr-only" />
                          <Label 
                            htmlFor="2000-5000" 
                            className={`block p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-sm ${
                              formData.budget === "2000-5000" 
                                ? "border-primary bg-primary/5 shadow-sm" 
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full border ${
                                  formData.budget === "2000-5000" 
                                    ? "border-primary bg-primary" 
                                    : "border-border"
                                }`}>
                                  {formData.budget === "2000-5000" && (
                                    <div className="w-1.5 h-1.5 bg-white rounded-full m-0.5"></div>
                                  )}
                                </div>
                                <span className="font-medium text-sm">$2000 - $5000</span>
                              </div>
                              <span className="text-xs text-muted-foreground">Custom</span>
                            </div>
                          </Label>
                        </div>
                        
                        <div className="relative">
                          <RadioGroupItem value="5000+" id="5000+" className="sr-only" />
                          <Label 
                            htmlFor="5000+" 
                            className={`block p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-sm ${
                              formData.budget === "5000+" 
                                ? "border-primary bg-primary/5 shadow-sm" 
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full border ${
                                  formData.budget === "5000+" 
                                    ? "border-primary bg-primary" 
                                    : "border-border"
                                }`}>
                                  {formData.budget === "5000+" && (
                                    <div className="w-1.5 h-1.5 bg-white rounded-full m-0.5"></div>
                                  )}
                                </div>
                                <span className="font-medium text-sm">$5000+</span>
                              </div>
                              <span className="text-xs text-muted-foreground">Enterprise+</span>
                            </div>
                          </Label>
                        </div>
                        
                        <div className="relative md:col-span-2">
                          <RadioGroupItem value="discuss" id="discuss" className="sr-only" />
                          <Label 
                            htmlFor="discuss" 
                            className={`block p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-sm ${
                              formData.budget === "discuss" 
                                ? "border-green-600 bg-green-50 dark:bg-green-900/20 shadow-sm" 
                                : "border-green-200 hover:border-green-400"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full border ${
                                  formData.budget === "discuss" 
                                    ? "border-green-600 bg-green-600" 
                                    : "border-green-200"
                                }`}>
                                  {formData.budget === "discuss" && (
                                    <div className="w-1.5 h-1.5 bg-white rounded-full m-0.5"></div>
                                  )}
                                </div>
                                <MessageCircle className="h-4 w-4 text-green-600" />
                                <span className="font-medium text-sm text-green-600">Let's discuss</span>
                              </div>
                              <span className="text-xs text-green-600">Custom Quote</span>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                     {/* Status Message Display */}
                     {statusMessage && (
                       <motion.div
                         initial={{ opacity: 0, y: -10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.3 }}
                         className={`p-4 rounded-2xl border-2 ${
                           statusMessage.type === 'success'
                             ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-100'
                             : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-100'
                         }`}
                       >
                         <div className="flex items-start gap-3">
                           <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                             statusMessage.type === 'success' 
                               ? 'bg-green-100 dark:bg-green-800' 
                               : 'bg-red-100 dark:bg-red-800'
                           }`}>
                             {statusMessage.type === 'success' ? (
                               <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                               </svg>
                             ) : (
                               <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                 <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                               </svg>
                             )}
                           </div>
                           <div className="flex-1">
                             <h4 className="font-medium mb-1">
                               {statusMessage.type === 'success' ? 'Message Sent Successfully!' : 'Error Sending Message'}
                             </h4>
                             <p className="text-sm opacity-90">{statusMessage.text}</p>
                             {statusMessage.type === 'success' && (
                               <div className="mt-3 flex items-center gap-2">
                                 <div className="text-xs opacity-75">
                                   📧 Check your email for confirmation
                                 </div>
                                 {lastSubmittedData && (
                                   <button
                                     onClick={() => {
                                       setFormData(lastSubmittedData)
                                       setStatusMessage(null)
                                     }}
                                     className="text-xs bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 px-2 py-1 rounded transition-colors duration-200"
                                   >
                                     Resend
                                   </button>
                                 )}
                               </div>
                             )}
                           </div>
                         </div>
                       </motion.div>
                     )}

                    <Button
                      type="submit"
                      variant="outline"
                      className="w-full cursor-pointer rounded-2xl bg-transparent"
                      disabled={loading} // Disable button while loading
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </section>
        )}
      </div>
    </>
  )
}
