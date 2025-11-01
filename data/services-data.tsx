import { Code, Smartphone, ShoppingCart, Database, Palette, Globe, Zap, Shield } from "lucide-react"

export interface Service {
  id: string
  title: string
  slug: string
  description: string
  shortDescription: string
  icon: React.ReactNode
  image: string
  features: string[]
  technologies: string[]
  pricing: {
    starting: string
    range: string
    currency: string
  }
  deliveryTime: string
  category: string
  isPopular: boolean
  seoTitle: string
  seoDescription: string
}

export const services: Service[] = [
  {
    id: "web-development",
    title: "Custom Web Development",
    slug: "custom-web-development",
    description: "Build stunning, responsive websites and web applications tailored to your business needs. From simple landing pages to complex enterprise solutions, I deliver high-quality web development services using modern technologies.",
    shortDescription: "Custom websites and web applications built with modern technologies",
    icon: <Code className="h-6 w-6" />,
    image: "/services/custom-web-development.png",
    features: [
      "Responsive Design",
      "SEO Optimized",
      "Fast Loading Speed",
      "Cross-browser Compatibility",
      "Mobile-first Approach",
      "Clean & Maintainable Code",
      "Security Implementation",
      "Performance Optimization"
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "PostgreSQL", "Tailwind CSS"],
    pricing: {
      starting: "200",
      range: "200 - 2000",
      currency: "USD"
    },
    deliveryTime: "2-8 weeks",
    category: "Web Development",
    isPopular: true,
    seoTitle: "Custom Web Development Services | Professional Website Development",
    seoDescription: "Professional web development services. Custom websites, web applications, and digital solutions built with modern technologies. Get your project started today!"
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    slug: "mobile-app-development",
    description: "Create powerful mobile applications for iOS and Android platforms. From native apps to cross-platform solutions, I help you reach your mobile audience with engaging and user-friendly applications.",
    shortDescription: "iOS and Android mobile applications for your business",
    icon: <Smartphone className="h-6 w-6" />,
    image: "/services/mobile.png",
    features: [
      "iOS & Android Apps",
      "Cross-platform Development",
      "Native Performance",
      "App Store Optimization",
      "Push Notifications",
      "Offline Functionality",
      "User Authentication",
      "Real-time Updates"
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Expo"],
    pricing: {
      starting: "400",
      range: "400 - 4000",
      currency: "USD"
    },
    deliveryTime: "4-12 weeks",
    category: "Mobile Development",
    isPopular: false,
    seoTitle: "Mobile App Development Services | iOS & Android Apps",
    seoDescription: "Professional mobile app development for iOS and Android. Cross-platform solutions with native performance. Launch your mobile app today!"
  },
  {
    id: "ecommerce-development",
    title: "E-commerce Solutions",
    slug: "ecommerce-development",
    description: "Build powerful online stores that drive sales and provide exceptional shopping experiences. From simple product catalogs to complex multi-vendor marketplaces, I create e-commerce solutions that convert visitors into customers.",
    shortDescription: "Complete e-commerce solutions for online businesses",
    icon: <ShoppingCart className="h-6 w-6" />,
    image: "/services/ecommerce.png",
    features: [
      "Product Catalog Management",
      "Shopping Cart & Checkout",
      "Payment Gateway Integration",
      "Order Management System",
      "Inventory Tracking",
      "Customer Accounts",
      "Admin Dashboard",
      "Analytics & Reporting"
    ],
    technologies: ["Next.js", "Shopify", "WooCommerce", "Stripe", "PayPal", "MongoDB"],
    pricing: {
      starting: "300",
      range: "300 - 3000",
      currency: "USD"
    },
    deliveryTime: "3-10 weeks",
    category: "E-commerce",
    isPopular: true,
    seoTitle: "E-commerce Development Services | Online Store Solutions",
    seoDescription: "Complete e-commerce development services. Build online stores, marketplaces, and shopping platforms that drive sales and grow your business."
  },
  {
    id: "backend-development",
    title: "Backend Development",
    slug: "backend-development",
    description: "Robust and scalable backend systems that power your applications. From API development to database design, I create secure and efficient server-side solutions that handle your business logic and data management needs.",
    shortDescription: "Scalable backend systems and APIs for your applications",
    icon: <Database className="h-6 w-6" />,
    image: "/services/backend.png",
    features: [
      "RESTful API Development",
      "GraphQL APIs",
      "Database Design & Optimization",
      "Authentication & Authorization",
      "Cloud Integration",
      "Microservices Architecture",
      "API Documentation",
      "Performance Monitoring"
    ],
    technologies: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis", "AWS", "Docker"],
    pricing: {
      starting: "250",
      range: "250 - 2500",
      currency: "USD"
    },
    deliveryTime: "2-6 weeks",
    category: "Backend Development",
    isPopular: false,
    seoTitle: "Backend Development Services | API & Database Solutions",
    seoDescription: "Professional backend development services. Build scalable APIs, databases, and server-side solutions for your applications."
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description: "Create beautiful and intuitive user interfaces that engage your users and drive conversions. From wireframes to high-fidelity prototypes, I design user experiences that are both visually appealing and functionally effective.",
    shortDescription: "Beautiful and user-friendly interface design",
    icon: <Palette className="h-6 w-6" />,
    image: "/services/UI.png",
    features: [
      "User Research & Analysis",
      "Wireframing & Prototyping",
      "Visual Design",
      "User Experience Optimization",
      "Responsive Design",
      "Design Systems",
      "Usability Testing",
      "Brand Integration"
    ],
    technologies: ["Figma", "Adobe XD", "Sketch", "Principle", "InVision", "Framer"],
    pricing: {
      starting: "300",
      range: "300 - 3000",
      currency: "USD"
    },
    deliveryTime: "1-4 weeks",
    category: "Design",
    isPopular: false,
    seoTitle: "UI/UX Design Services | User Interface & Experience Design",
    seoDescription: "Professional UI/UX design services. Create beautiful, user-friendly interfaces that engage users and drive conversions for your business."
  },
  {
    id: "cms-development",
    title: "CMS Development",
    slug: "cms-development",
    description: "Build content management systems that make it easy for you to manage your website content. From simple blogs to complex multi-site platforms, I create CMS solutions that are both powerful and user-friendly.",
    shortDescription: "Content management systems for easy website management",
    icon: <Globe className="h-6 w-6" />,
    image: "/services/cms.png",
    features: [
      "Content Management",
      "User Role Management",
      "Media Library",
      "SEO Tools",
      "Multi-language Support",
      "Custom Fields",
      "Version Control",
      "Backup & Security"
    ],
    technologies: ["WordPress", "Strapi", "Sanity", "Contentful", "Next.js", "Node.js"],
    pricing: {
      starting: "400",
      range: "400 - 4000",
      currency: "USD"
    },
    deliveryTime: "2-6 weeks",
    category: "CMS Development",
    isPopular: false,
    seoTitle: "CMS Development Services | Content Management Systems",
    seoDescription: "Professional CMS development services. Build content management systems that make website management easy and efficient for your team."
  },
  {
    id: "performance-optimization",
    title: "Performance Optimization",
    slug: "performance-optimization",
    description: "Speed up your website and improve user experience with performance optimization services. I analyze your site's performance and implement solutions to make it faster, more efficient, and better ranked in search engines.",
    shortDescription: "Website speed optimization and performance improvement",
    icon: <Zap className="h-6 w-6" />,
    image: "/services/performance.png",
    features: [
      "Page Speed Analysis",
      "Image Optimization",
      "Code Minification",
      "Caching Implementation",
      "CDN Setup",
      "Database Optimization",
      "Core Web Vitals",
      "Performance Monitoring"
    ],
    technologies: ["Lighthouse", "GTmetrix", "Cloudflare", "Redis", "Webpack", "Vercel"],
    pricing: {
      starting: "200",
      range: "200 - 2000",
      currency: "USD"
    },
    deliveryTime: "1-3 weeks",
    category: "Optimization",
    isPopular: false,
    seoTitle: "Website Performance Optimization | Speed & SEO Improvement",
    seoDescription: "Professional website performance optimization services. Speed up your site, improve SEO rankings, and enhance user experience with our optimization solutions."
  },
  {
    id: "maintenance-support",
    title: "Maintenance & Support",
    slug: "maintenance-support",
    description: "Keep your website running smoothly with ongoing maintenance and support services. From regular updates to bug fixes and security patches, I ensure your website stays secure, updated, and performing at its best.",
    shortDescription: "Ongoing website maintenance and technical support",
    icon: <Shield className="h-6 w-6" />,
    image: "/services/maintainance.png",
    features: [
      "Regular Updates",
      "Security Monitoring",
      "Bug Fixes",
      "Backup Management",
      "Performance Monitoring",
      "Uptime Monitoring",
      "Technical Support",
      "Feature Enhancements"
    ],
    technologies: ["Monitoring Tools", "Backup Systems", "Security Tools", "Analytics"],
    pricing: {
      starting: "50",
      range: "50 - 500",
      currency: "USD"
    },
    deliveryTime: "Ongoing",
    category: "Maintenance",
    isPopular: false,
    seoTitle: "Website Maintenance & Support Services | Ongoing Care",
    seoDescription: "Professional website maintenance and support services. Keep your website secure, updated, and performing optimally with our ongoing care solutions."
  }
]

export const serviceCategories = [
  "All",
  "Web Development",
  "Mobile Development", 
  "E-commerce",
  "Backend Development",
  "Design",
  "CMS Development",
  "Optimization",
  "Maintenance"
]

export const popularServices = services.filter(service => service.isPopular)
