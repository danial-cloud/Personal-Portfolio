import { Check, X, Star, Zap, Crown } from "lucide-react"

export interface PricingPlan {
  id: string
  name: string
  description: string
  price: {
    monthly: number
    yearly: number
    currency: string
  }
  features: string[]
  limitations: string[]
  popular: boolean
  icon: React.ReactNode
  color: string
  buttonText: string
  buttonVariant: "default" | "outline" | "secondary"
  seoTitle: string
  seoDescription: string
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic Package",
    description: "Perfect for small businesses and startups looking to establish their online presence",
    price: {
      monthly: 299,
      yearly: 2990,
      currency: "USD"
    },
    features: [
      "Responsive Website Design",
      "Up to 5 Pages",
      "Contact Form",
      "Basic SEO Optimization",
      "Mobile-Friendly Design",
      "1 Month Free Support",
      "Content Management System",
      "Social Media Integration",
      "Google Analytics Setup",
      "SSL Certificate"
    ],
    limitations: [
      "No E-commerce Features",
      "Basic Design Templates",
      "Limited Customization",
      "No Advanced Animations"
    ],
    popular: false,
    icon: <Zap className="h-6 w-6" />,
    color: "from-blue-500 to-blue-600",
    buttonText: "Get Started",
    buttonVariant: "outline",
    seoTitle: "Basic Web Development Package | $299 Starting Price",
    seoDescription: "Affordable web development package for small businesses. Get a professional website starting from $299 with all essential features included."
  },
  {
    id: "professional",
    name: "Professional Package",
    description: "Ideal for growing businesses that need advanced features and custom functionality",
    price: {
      monthly: 699,
      yearly: 6990,
      currency: "USD"
    },
    features: [
      "Custom Website Design",
      "Up to 15 Pages",
      "Advanced Contact Forms",
      "Complete SEO Optimization",
      "Mobile App Integration",
      "3 Months Free Support",
      "Custom CMS Development",
      "Payment Gateway Integration",
      "Advanced Analytics",
      "SSL Certificate",
      "Performance Optimization",
      "Database Integration",
      "User Authentication",
      "Admin Dashboard",
      "API Development"
    ],
    limitations: [
      "No E-commerce Store",
      "Limited Third-party Integrations"
    ],
    popular: true,
    icon: <Star className="h-6 w-6" />,
    color: "from-purple-500 to-purple-600",
    buttonText: "Most Popular",
    buttonVariant: "default",
    seoTitle: "Professional Web Development Package | $699 Best Value",
    seoDescription: "Most popular web development package with advanced features. Perfect for growing businesses. Starting from $699 with 3 months support."
  },
  {
    id: "enterprise",
    name: "Enterprise Package",
    description: "Complete solution for large businesses and complex projects with unlimited features",
    price: {
      monthly: 1299,
      yearly: 12990,
      currency: "USD"
    },
    features: [
      "Custom Enterprise Design",
      "Unlimited Pages",
      "Advanced E-commerce Store",
      "Complete SEO & Marketing",
      "Mobile App Development",
      "6 Months Free Support",
      "Custom CMS & Admin Panel",
      "Multiple Payment Gateways",
      "Advanced Analytics & Reporting",
      "SSL Certificate",
      "Performance Optimization",
      "Database Design & Management",
      "User Management System",
      "Multi-language Support",
      "API Development & Integration",
      "Third-party Integrations",
      "Advanced Security Features",
      "Scalable Architecture",
      "Cloud Hosting Setup",
      "24/7 Technical Support"
    ],
    limitations: [],
    popular: false,
    icon: <Crown className="h-6 w-6" />,
    color: "from-gold-500 to-gold-600",
    buttonText: "Contact Us",
    buttonVariant: "secondary",
    seoTitle: "Enterprise Web Development Package | $1299 Complete Solution",
    seoDescription: "Complete enterprise web development solution with unlimited features. Perfect for large businesses and complex projects. Starting from $1299."
  }
]

export const addOnServices = [
  {
    id: "seo-optimization",
    name: "SEO Optimization",
    description: "Complete search engine optimization for better rankings",
    price: 200,
    currency: "USD",
    duration: "1-2 weeks"
  },
  {
    id: "content-writing",
    name: "Content Writing",
    description: "Professional content writing for your website",
    price: 150,
    currency: "USD",
    duration: "1 week"
  },
  {
    id: "logo-design",
    name: "Logo Design",
    description: "Custom logo design for your brand",
    price: 100,
    currency: "USD",
    duration: "3-5 days"
  },
  {
    id: "maintenance",
    name: "Monthly Maintenance",
    description: "Ongoing website maintenance and updates",
    price: 100,
    currency: "USD",
    duration: "Monthly"
  },
  {
    id: "hosting-setup",
    name: "Hosting Setup",
    description: "Professional hosting setup and configuration",
    price: 50,
    currency: "USD",
    duration: "1 day"
  },
  {
    id: "ssl-certificate",
    name: "SSL Certificate",
    description: "Secure SSL certificate installation",
    price: 30,
    currency: "USD",
    duration: "1 day"
  }
]

export const pricingFaqs = [
  {
    question: "What's included in the basic package?",
    answer: "The basic package includes a responsive website with up to 5 pages, contact form, basic SEO, mobile-friendly design, 1 month free support, CMS, social media integration, Google Analytics setup, and SSL certificate."
  },
  {
    question: "Can I upgrade my package later?",
    answer: "Yes, absolutely! You can upgrade your package at any time. We'll adjust the pricing accordingly and ensure a smooth transition to the new features."
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes, we offer flexible payment plans. You can pay 50% upfront and 50% upon completion, or we can discuss a custom payment schedule that works for your budget."
  },
  {
    question: "What's the difference between monthly and yearly pricing?",
    answer: "Yearly pricing offers a 17% discount compared to monthly pricing. It's perfect for long-term projects and provides better value for money."
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes, all packages include free support for a specified period. After that, we offer affordable maintenance packages to keep your website updated and secure."
  },
  {
    question: "Can you work with my existing design?",
    answer: "Absolutely! We can work with your existing design, improve it, or create something completely new based on your requirements and preferences."
  }
]
