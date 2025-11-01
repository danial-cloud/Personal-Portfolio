"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Minus, HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "How much does web development cost?",
    answer: "Web development costs vary based on project complexity. Our packages start from $500 for basic websites, $1200 for professional sites, and $2500 for enterprise solutions. Contact us for a custom quote based on your specific requirements."
  },
  {
    question: "How long does a web development project take?",
    answer: "Project duration depends on complexity and requirements. Basic websites take 2-4 weeks, professional sites take 4-8 weeks, and enterprise solutions take 8-12 weeks. We provide detailed timelines during the consultation phase."
  },
  {
    question: "What technologies do you use?",
    answer: "I specialize in modern web technologies including Next.js, React, TypeScript, Node.js, MongoDB, PostgreSQL, Tailwind CSS, and more. I choose the best technology stack based on your project requirements and goals."
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer: "Yes, all projects include free support for a specified period. After that, we offer affordable maintenance packages starting from $100/month to keep your website updated, secure, and performing optimally."
  },
  {
    question: "Can you work with my existing design?",
    answer: "Absolutely! I can work with your existing design, improve it, or create something completely new. I'll analyze your current design and suggest improvements to enhance user experience and conversion rates."
  },
  {
    question: "Do you offer mobile app development?",
    answer: "Yes, I develop both iOS and Android mobile applications using React Native and Flutter. I also create cross-platform solutions that work seamlessly across all devices and operating systems."
  },
  {
    question: "What's included in your web development packages?",
    answer: "Our packages include responsive design, SEO optimization, mobile-friendly development, content management system, contact forms, social media integration, Google Analytics setup, SSL certificate, and free support period."
  },
  {
    question: "How do I get started with my project?",
    answer: "Getting started is easy! Contact me through the contact form, email, or phone. I'll schedule a free consultation to understand your requirements, provide a detailed proposal, and answer all your questions before we begin development."
  }
]

export function FAQSection() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <HelpCircle className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold text-foreground">Frequently Asked Questions</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get answers to common questions about web development services, pricing, and project timelines.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div key={index} whileHover={{ scale: 1.01 }}>
            <Card className="overflow-hidden rounded-2xl border border-border/30 dark:border-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
              <CardHeader 
                className="cursor-pointer"
                onClick={() => toggleFaq(index)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground pr-4">{faq.question}</h3>
                  {expandedFaq === index ? (
                    <Minus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
              </CardHeader>
              <AnimatePresence>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-4">
        <h3 className="text-xl font-semibold text-foreground">Still have questions?</h3>
        <p className="text-muted-foreground">
          Contact me directly for personalized answers and a free consultation about your project.
        </p>
        <Button className="rounded-2xl" asChild>
          <a href="/contact">
            Get Free Consultation
          </a>
        </Button>
      </div>
    </section>
  )
}

