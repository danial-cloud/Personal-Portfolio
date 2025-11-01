import { Mail, Phone, MapPin, Linkedin, Github, Twitter, ExternalLink, Facebook, MessageCircle } from 'lucide-react'

export const contactInfo = {
  personal: {
    name: "Danial Ahmad",
    title: "Full Stack Developer",
    email: "adanial591@gmail.com",
    phone: "+923320700430",
    location: "Bhakkar, Punjab, Pakistan",
    availability: "Available for Work",
    bio: "Building beautiful and functional digital products for web and desktop. Passionate about clean code, smart solutions, and transforming complex challenges into seamless experiences.",
  },
  
  links: {
    email: "adanial591@gmail.com",
    phone: "tel:+923320700430",
    location: "https://maps.google.com/?q=Bhakkar,Punjab,Pakistan",
    resume: "/resume/shehzad.pdf",
    resumePdf: "/resume/shehzad.pdf",
  },
  
  social: [
    {
      name: "LinkedIn",
      username: "danial-ahmad-51834a234",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/danial-ahmad-51834a234/",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      name: "GitHub", 
      username: "danial-cloud",
      icon: Github,
      href: "https://github.com/danial-cloud",
      color: "text-[#171717] dark:text-white",
    },
    // {
    //   name: "Twitter",
    //   username: "@dev_shehzad",
    //   icon: Twitter,
    //   href: "https://x.com/DanialA26288481?t=5kgw3Gcx_Pq4ZqpgWlhnFQ&s=08",
    //   color: "text-blue-500 dark:text-blue-400",
    // },
     {
      name: "Facebook", 
      username: "@dev-shahzad",
      icon: Facebook,
      href: "https://www.facebook.com/share/17SSfmpNE8/",
      color: "text-blue-600 dark:text-blue-400",
    },

  ],
  
  contactMethods: [
    {
      icon: Mail,
      label: "Email",
      value: "adanial591@gmail.com",
      href: "mailto:adanial591@gmail.com",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+923320700430",
      href: "https://wa.me/923015514968",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Bhakkar, Punjab, Pakistan",
      href: "https://maps.google.com/?q=Bhakkar,Punjab,Pakistan",
    },
  ],
  
  quickInfo: [
    "🎯 Full Stack Developer",
    "📍 Based in Bhakkar, Punjab",
    "💼 5+ Years Experience", 
    "🎓 Computer Science Graduate",
    "☕ Coffee Enthusiast",
  ],
}
