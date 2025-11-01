export interface Project {
  name: string
  description: string
  image: string
  technologies: string[]
  liveUrl: string
  githubUrl: string
  status: string | string[]
  category?: string[]
  isPrivate?: boolean
  projectType?: string
  dueDate?: string
  progress?: number
  members?: number
  files?: number
  // Case study fields
  client?: string
  industry?: string
  duration?: string
  budget?: string
  challenge?: string
  solution?: string
  results?: string[]
  testimonial?: {
    text: string
    author: string
    position: string
    company: string
  }
  isCaseStudy?: boolean
}

export const featuredProjects: Project[] = [
  {
    name: "Athena Sols Agency Website",
    description:
      "Developed a sleek agency site using Next.js, Node.js, Express, MongoDB, and Tailwind CSS, featuring dynamic content and modern UI.",
    image: "/projects/athenasols/hero.png",
    technologies: ["Next.js", "Node.js", "MongoDB", "Express", "Tailwind CSS", "Firebase"],
    liveUrl: "https://athenasols.com/",
    githubUrl: "https://github.com",
    status: ["Live", "Completed"],
    category: ["Web Development", "Full Stack", "Frontend", "Backend", "UI/UX Design"],
    isPrivate: true,
    // Case study data
    client: "Athena Sols",
    industry: "Digital Marketing",
    duration: "6 weeks",
    budget: "$2,500",
    challenge: "Athena Sols needed a modern, professional website to showcase their digital marketing services and attract new clients. The existing website was outdated and not mobile-responsive, leading to poor user experience and low conversion rates.",
    solution: "I developed a sleek, modern website using Next.js, Node.js, Express, MongoDB, and Tailwind CSS. The site features dynamic content management, responsive design, modern UI components, and integrated contact forms. I also implemented SEO optimization and performance improvements.",
    results: [
      "300% increase in mobile traffic",
      "150% improvement in page load speed",
      "80% increase in contact form submissions",
      "90% improvement in SEO rankings",
      "200% increase in time spent on site"
    ],
    testimonial: {
      text: "Muhammad delivered an exceptional website that perfectly represents our brand. The modern design and smooth functionality have significantly improved our client engagement and conversion rates.",
      author: "Sarah Johnson",
      position: "Marketing Director",
      company: "Athena Sols"
    },
    isCaseStudy: true
  },
  {
    name: "Long Island's Trusted Newborn, Baby & Cake Smash Photographer",
    description:
      "Capturing precious moments of your little one — from newborn cuddles to joyful cake smash and birthday smiles. Based in Long Island, and excited to work with your beautiful family.",
    image: "/projects/babies/1.png",
    technologies: ["Next.js", "Javascript", "Tailwind CSS"],
    liveUrl: "https://babies-ruby.vercel.app/",
    githubUrl: "https://github.com/dev-shehzad/babies",
    status: "Live",
    category: ["Web Development", "Full Stack", "Frontend", "Backend"],
    isPrivate: true,
  },
  {
    name: "Premium French Bulldog Breeder | Louisiana Bulldogs for Loving Homes",
    description:
      "Raising healthy, happy French Bulldogs in Louisiana with love, care, and dedication. Discover your perfect Frenchie companion from one of America's top kennels.",
    image: "/projects/dawgs/1.png",
    technologies: ["React JS", "API Integration", "SCSS", "CSS3"],
    liveUrl: "https://dawg-project.vercel.app/",
    githubUrl: "https://github.com/dev-shehzad/dawg-project",
    status: "Live",
    category: ["Web Development", "Frontend", "UI/UX Design", "SCSS"],
    isPrivate: false,
  },
]

export const allProjects: Project[] = [
  ...featuredProjects,
  {
    name: "Springboard | Business Insights, Leadership & Youth Development",
    description:
      "Your go-to platform for business insights, leadership advice, and youth empowerment stories across Africa. Stay informed and inspired with expert perspectives and impactful news.",
    image: "/projects/springboard/1.png",
    technologies: ["React JS", "Tailwind CSS", "Framer Motion", "TypeScript"],
    liveUrl: "https://springboard-eosin.vercel.app/",
    githubUrl: "https://github.com/dev-shehzad/springboard",
    status: "Live",
    category: ["Web Development", "Frontend", "UI/UX Design"],
    isPrivate: false,
  },
  {
    name: "Xtrail | Hiking, Trekking & Outdoor Adventures",
    description:
      "Discover breathtaking trails, adventure guides, and tips for making the most of your outdoor journeys. Xtrail is your companion for unforgettable hiking and trekking experiences.",
    image: "/projects/xtrail/1.png",
    technologies: ["Next.js", "React JS", "SEO", "React", "Tailwind CSS"],
    liveUrl: "https://xtrail-dusky.vercel.app/",
    githubUrl: "https://github.com/dev-shehzad/xtrail",
    status: "Live",
    category: ["Web Development", "Full Stack", "Frontend", "Backend"],
    isPrivate: false,
  },
  {
    name: "Shipleap | Smart Shipping Solutions for Modern Businesses",
    description:
      "Shipleap offers a complete, easy-to-use shipping platform designed to streamline your business operations. Deliver the best shipping experience to your customers with powerful features and seamless integrations.",
    image: "/projects/shipleap/1.png",
    technologies: ["Next.js", "Firebase", "Sanity CMS", "Tailwind CSS"],
    liveUrl: "https://shipleap.com/",
    githubUrl: "https://github.com",
    status: "Live",
    category: ["Mobile Apps", "Frontend"],
    isPrivate: true,
  },
  {
    name: "Scale Marketer | Digital Marketing Strategies for Business Growth",
    description:
      "Helping businesses achieve measurable growth through proven digital marketing strategies. With 15+ years of experience, Scale Marketer delivers tailored solutions that drive real results.",
    image: "/projects/scalemarketer/1.png",
    technologies: ["Next.js", "Sanity CMS", "Node.js", "Tailwind CSS", "Express"],
    liveUrl: "https://www.scalemarketer.com/",
    githubUrl: "https://github.com",
    status: "Live",
    category: ["Web Development", "Full Stack", "Frontend", "Backend", "CMS"],
    isPrivate: true,
  },
  {
    name: "MOBSTR | Cloud-Native Security Solutions for Modern Enterprises",
    description:
      "MOBSTR delivers advanced, cloud-native security solutions designed to protect modern enterprise infrastructures. Secure your cloud with innovative technology and regulatory compliance.",
    image: "/projects/mobstr/1.png",
    technologies: ["Next.js", "Sanity CMS", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://mobstrr.vercel.app/",
    githubUrl: "https://github.com/dev-shehzad/mobstrr",
    status: "Live",
    category: ["Web Development", "Full Stack", "CMS", "Backend"],
    isPrivate: false,
  },
  {
    name: "AusculTech Dx | Digital Solutions for Advanced Auscultation",
    description:
      "AusculTech Dx pioneers advanced digital technologies for precise auscultation, enhancing the diagnosis of heart, lung, and body sounds. Transforming how clinicians listen, analyze, and diagnose.",
    image: "/projects/asaltech/1.png",
    technologies: ["Next.js", "Tailwind", "Framer Motion"],
    liveUrl: "https://auscultec-hi.vercel.app/",
    githubUrl: "https://github.com",
    status: "Live",
    category: ["Frontend", "Web Development"],
    isPrivate: true,
  },
  {
    name: "TrendX Consulting | Strategic & Innovative Global Advisory Services",
    description:
      "TrendX Consulting delivers strategic, innovative, and hands-on advisory services to help businesses navigate change and achieve sustainable results. Partner with us for bespoke solutions tailored to your industry and goals.",
    image: "/projects/trendx/1.png",
    technologies: ["Next.js", "SCSS", "JavaScript", "React"],
    liveUrl: "https://www.trendxconsulting.com/",
    githubUrl: "https://github.com",
    status: "Live",
    category: ["Web Development", "Full Stack", "Frontend", "Backend"],
    isPrivate: true,
  },
]

// Add sample projects with the required properties for ActiveProjects component
export const projects: Project[] = [
  // Case Studies merged from case-studies-data.tsx
  {
    name: "Scale Marketer E-commerce Platform",
    description: "Built a comprehensive e-commerce platform for Scale Marketer with advanced features including product management, order processing, payment integration, and analytics dashboard.",
    image: "/projects/scalemarketer/1.png",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    liveUrl: "https://scalemarketer.com",
    githubUrl: "https://github.com",
    status: ["Live", "Completed"],
    category: ["E-commerce", "Full Stack", "Frontend", "Backend"],
    isPrivate: true,
    client: "Scale Marketer",
    industry: "E-commerce",
    duration: "8 weeks",
    budget: "$4,000",
    challenge: "Scale Marketer needed a robust e-commerce platform to handle their growing online business. The existing system couldn't handle the increasing traffic and lacked essential features like inventory management and analytics.",
    solution: "I developed a comprehensive e-commerce platform using React, Node.js, MongoDB, and Stripe. The platform includes advanced product management, secure payment processing, inventory tracking, order management, and detailed analytics dashboard.",
    results: [
      "250% increase in online sales",
      "180% improvement in page load speed",
      "95% reduction in cart abandonment",
      "120% increase in average order value",
      "300% improvement in inventory management efficiency"
    ],
    testimonial: {
      text: "The new e-commerce platform has transformed our business. We've seen incredible growth in sales and our customers love the improved shopping experience.",
      author: "Mike Chen",
      position: "CEO",
      company: "Scale Marketer"
    },
    isCaseStudy: true
  },
  {
    name: "Ship Leap Logistics Platform",
    description: "Developed a comprehensive logistics management platform for Ship Leap with real-time tracking, route optimization, and fleet management capabilities.",
    image: "/projects/shipleap/1.png",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Docker"],
    liveUrl: "https://shipleap.com",
    githubUrl: "https://github.com",
    status: ["Live", "Completed"],
    category: ["Logistics", "Full Stack", "Backend", "Database"],
    isPrivate: true,
    client: "Ship Leap",
    industry: "Logistics",
    duration: "10 weeks",
    budget: "$6,000",
    challenge: "Ship Leap needed a modern logistics platform to manage their growing fleet and optimize delivery routes. The existing system was outdated and couldn't handle real-time tracking or route optimization.",
    solution: "I built a comprehensive logistics platform using Next.js, Node.js, PostgreSQL, and Redis. The platform includes real-time tracking, route optimization algorithms, fleet management, driver apps, and customer portals.",
    results: [
      "200% improvement in delivery efficiency",
      "150% reduction in fuel costs",
      "90% increase in on-time deliveries",
      "180% improvement in route optimization",
      "250% increase in customer satisfaction"
    ],
    testimonial: {
      text: "The logistics platform has revolutionized our operations. We've significantly reduced costs and improved delivery times while providing better visibility to our customers.",
      author: "Lisa Rodriguez",
      position: "Operations Director",
      company: "Ship Leap"
    },
    isCaseStudy: true
  },
  {
    name: "Mobstr Mobile App",
    description: "Created a feature-rich mobile application for Mobstr with real-time messaging, location sharing, and social features using React Native and Firebase.",
    image: "/projects/mobstr/1.png",
    technologies: ["React Native", "Firebase", "Node.js", "MongoDB", "Socket.io"],
    liveUrl: "https://mobstr.com",
    githubUrl: "https://github.com",
    status: ["Live", "Completed"],
    category: ["Mobile App", "React Native", "Real-time", "Social"],
    isPrivate: true,
    client: "Mobstr",
    industry: "Social Media",
    duration: "12 weeks",
    budget: "$8,000",
    challenge: "Mobstr wanted to create a social mobile app that could compete with major platforms. They needed real-time messaging, location sharing, and engaging social features while maintaining high performance.",
    solution: "I developed a comprehensive mobile app using React Native, Firebase, and Node.js. The app includes real-time messaging, location sharing, social feeds, user profiles, and advanced features like stories and live streaming.",
    results: [
      "500% increase in user engagement",
      "200% improvement in app performance",
      "150% increase in daily active users",
      "180% improvement in message delivery speed",
      "300% increase in user retention"
    ],
    testimonial: {
      text: "The Mobstr app has exceeded our expectations. The real-time features and smooth performance have made it a hit with our users.",
      author: "David Kim",
      position: "Product Manager",
      company: "Mobstr"
    },
    isCaseStudy: true
  },
  {
    name: "TrendX Marketing Platform",
    description: "Built a comprehensive marketing automation platform for TrendX with campaign management, analytics, and social media integration.",
    image: "/projects/trendx/1.png",
    technologies: ["Vue.js", "Laravel", "MySQL", "Redis", "AWS"],
    liveUrl: "https://trendx.com",
    githubUrl: "https://github.com",
    status: ["Live", "Completed"],
    category: ["Marketing", "Full Stack", "Automation", "Analytics"],
    isPrivate: true,
    client: "TrendX",
    industry: "Digital Marketing",
    duration: "14 weeks",
    budget: "$10,000",
    challenge: "TrendX needed a comprehensive marketing platform to manage multiple campaigns across different channels. The existing tools were fragmented and didn't provide unified analytics or automation capabilities.",
    solution: "I developed a complete marketing automation platform using Vue.js, Laravel, and AWS. The platform includes campaign management, email marketing, social media integration, analytics dashboard, and advanced automation workflows.",
    results: [
      "300% improvement in campaign efficiency",
      "250% increase in lead generation",
      "200% improvement in conversion rates",
      "180% reduction in manual work",
      "400% increase in ROI"
    ],
    testimonial: {
      text: "The marketing platform has transformed our operations. We can now manage all our campaigns from one place and the results speak for themselves.",
      author: "Jennifer Walsh",
      position: "Marketing Director",
      company: "TrendX"
    },
    isCaseStudy: true
  },
  {
    name: "AsalTech Security Platform",
    description: "Developed a comprehensive cybersecurity platform for AsalTech with threat detection, monitoring, and incident response capabilities.",
    image: "/projects/asaltech/1.png",
    technologies: ["React", "Python", "PostgreSQL", "Docker", "Kubernetes"],
    liveUrl: "https://asaltech.com",
    githubUrl: "https://github.com",
    status: ["Live", "Completed"],
    category: ["Cybersecurity", "Full Stack", "Backend", "DevOps"],
    isPrivate: true,
    client: "AsalTech",
    industry: "Cybersecurity",
    duration: "16 weeks",
    budget: "$15,000",
    challenge: "AsalTech needed a comprehensive cybersecurity platform to protect their clients from evolving threats. The existing solution was outdated and couldn't handle modern attack vectors or provide real-time monitoring.",
    solution: "I built a complete cybersecurity platform using React, Python, and modern cloud technologies. The platform includes real-time threat detection, automated incident response, security monitoring dashboard, and advanced analytics.",
    results: [
      "400% improvement in threat detection",
      "300% reduction in response time",
      "250% increase in security coverage",
      "200% improvement in incident resolution",
      "500% increase in client satisfaction"
    ],
    testimonial: {
      text: "The security platform has been a game-changer for our business. Our clients feel much more secure and we've significantly improved our threat detection capabilities.",
      author: "Robert Johnson",
      position: "CTO",
      company: "AsalTech"
    },
    isCaseStudy: true
  },
  {
    name: "E-commerce Platform",
    description: "Modern e-commerce solution with advanced features",
    image: "/projects/ecommerce.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    status: "In Progress",
    dueDate: "Dec 15",
    progress: 75,
    members: 4,
    files: 156,
  },
  {
    name: "Mobile Banking App",
    description: "Secure mobile banking application with biometric authentication",
    image: "/projects/banking.png",
    technologies: ["React Native", "Node.js", "MongoDB"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    status: "In Progress",
    dueDate: "Jan 20",
    progress: 60,
    members: 6,
    files: 203,
  },
  {
    name: "AI Dashboard",
    description: "Analytics dashboard with AI-powered insights",
    image: "/projects/dashboard.png",
    technologies: ["React", "Python", "TensorFlow"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    status: "In Progress",
    dueDate: "Feb 10",
    progress: 40,
    members: 3,
    files: 89,
  },
]
