import {
  Home,
  FolderOpen,
  User,
  MessageSquare,
  Mail,
  Code,
  Smartphone,
  Globe,
  Database,
  Palette,
  Star,
  MessageCircle,
  ThumbsUp,
  ExternalLink,
  Server,
  Zap,
  Wrench,
  BookOpen,
  Briefcase,
  GraduationCap,
  Phone,
  FileText,
  Github,
  Settings,
  DollarSign,
  FileText as CaseStudy,
  BookOpen as Blog,
  TrendingUp,
  Users,
  ShoppingCart,
} from "lucide-react"

export const sidebarItems = [
  {
    title: "Home",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Projects",
    icon: <FolderOpen className="h-4 w-4" />,
    items: [
      {
        title: "All Projects",
        icon: <Globe className="h-3 w-3" />,
        category: "All",
      },
      {
        title: "Web Development",
        icon: <Code className="h-3 w-3" />,
        category: "Web Development",
      },
      {
        title: "Mobile Apps",
        icon: <Smartphone className="h-3 w-3" />,
        category: "Mobile Apps",
      },
      {
        title: "UI/UX Design",
        icon: <Palette className="h-3 w-3" />,
        category: "UI/UX Design",
      },
      {
        title: "Backend APIs",
        icon: <Database className="h-3 w-3" />,
        category: "Backend",
      },
    ],
  },
  {
    title: "About",
    icon: <User className="h-4 w-4" />,
    items: [
      {
        title: "My Story",
        icon: <BookOpen className="h-3 w-3" />,
        category: "Story",
      },
      {
        title: "Skills",
        icon: <Code className="h-3 w-3" />,
        category: "Skills",
      },
      {
        title: "Experience",
        icon: <Briefcase className="h-3 w-3" />,
        category: "Experience",
      },
      {
        title: "Education",
        icon: <GraduationCap className="h-3 w-3" />,
        category: "Education",
      },
    ],
  },
  {
    title: "Services",
    icon: <Settings className="h-4 w-4" />,
    items: [
      {
        title: "All Services",
        icon: <Settings className="h-3 w-3" />,
        category: "All Services",
      },
      {
        title: "Web Development",
        icon: <Code className="h-3 w-3" />,
        category: "Web Development",
      },
      {
        title: "Mobile Development",
        icon: <Smartphone className="h-3 w-3" />,
        category: "Mobile Development",
      },
      {
        title: "E-commerce",
        icon: <Globe className="h-3 w-3" />,
        category: "E-commerce",
      },
      {
        title: "UI/UX Design",
        icon: <Palette className="h-3 w-3" />,
        category: "Design",
      },
      {
        title: "Backend Development",
        icon: <Server className="h-3 w-3" />,
        category: "Backend Development",
      },
      {
        title: "CMS Development",
        icon: <Database className="h-3 w-3" />,
        category: "CMS Development",
      },
      {
        title: "Optimization",
        icon: <Zap className="h-3 w-3" />,
        category: "Optimization",
      },
      {
        title: "Maintenance",
        icon: <Wrench className="h-3 w-3" />,
        category: "Maintenance",
      },
    ],
  },
  {
    title: "Pricing",
    icon: <DollarSign className="h-4 w-4" />,
  },
  {
    title: "Blog",
    icon: <Blog className="h-4 w-4" />,
    items: [
      {
        title: "All Articles",
        icon: <Blog className="h-3 w-3" />,
        category: "All Articles",
      },
      {
        title: "Hiring Guide",
        icon: <BookOpen className="h-3 w-3" />,
        category: "Hiring Guide",
      },
      {
        title: "Technology",
        icon: <Code className="h-3 w-3" />,
        category: "Technology",
      },
      {
        title: "Pricing",
        icon: <DollarSign className="h-3 w-3" />,
        category: "Pricing",
      },
      {
        title: "Trends",
        icon: <TrendingUp className="h-3 w-3" />,
        category: "Trends",
      },
      {
        title: "Outsourcing",
        icon: <Users className="h-3 w-3" />,
        category: "Outsourcing",
      },
      {
        title: "E-commerce",
        icon: <ShoppingCart className="h-3 w-3" />,
        category: "E-commerce",
      },
    ],
  },
  {
    title: "Reviews",
    icon: <MessageSquare className="h-4 w-4" />,
    items: [
      {
        title: "All Reviews",
        icon: <Star className="h-3 w-3" />,
        category: "All Reviews",
      },
      {
        title: "Client Testimonials",
        icon: <ThumbsUp className="h-3 w-3" />,
        category: "Client Testimonials",
      },
      {
        title: "Client Feedback",
        icon: <MessageCircle className="h-3 w-3" />,
        category: "Client Feedback",
      },
      {
        title: "Fiverr Profile",
        icon: <ExternalLink className="h-3 w-3" />,
        category: "Fiverr Profile",
      },
    ],
  },
  {
    title: "Contact",
    icon: <Mail className="h-4 w-4" />,
    items: [
      {
        title: "Contact Info",
        icon: <Phone className="h-3 w-3" />,
        category: "Contact Info",
      },
      {
        title: "Social Media",
        icon: <Github className="h-3 w-3" />,
        category: "Social Media",
      },
      {
        title: "Send Message",
        icon: <Mail className="h-3 w-3" />,
        category: "Send Message",
      },
      {
        title: "Resume",
        icon: <FileText className="h-3 w-3" />,
        category: "Resume",
      },
    ],
  },
]
