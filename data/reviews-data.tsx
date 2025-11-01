import { Star, Shield, Clock, Users, Award } from "lucide-react"

export interface Review {
  id: string
  clientName: string
  clientUsername: string
  country: string
  countryFlag: string
  rating: number
  reviewText: string
  date: string
  orderValue: number
  projectTitle: string
  projectType: string
  isVerified: boolean
  categories: ("testimonial" | "feedback" | "general")[] // Changed to array to support multiple categories
}

export const reviewsData: Review[] = [
  {
    id: "9",
    clientName: "Enrico",
    clientUsername: "cocoawildboars",
    country: "Germany",
    countryFlag: "🇩🇪",
    rating: 5,
    reviewText:
      "Great work as always! Shehzad is reliable, fast, and solution-oriented. Always a pleasure to work with — highly recommended.",
    date: "2025-09-15",
    orderValue: 200,
    projectTitle: "Web Application",
    projectType: "Web Development",
    isVerified: true,
    categories: ["feedback", "testimonial"],
  },
  {
    id: "8",
    clientName: "Jordan Holmes",
    clientUsername: "jordanholmes23",
    country: "Pakistan",
    countryFlag: "🇵🇰",
    rating: 5,
    reviewText:
      "Absolutely impressed! The seller was not only incredibly affordable but also exceeded all expectations with his work. A true professional with excellent understanding and communication skills. It was a pleasure to work with MR.Shehzad Delivered high-quality results and went above and beyond. Highly recommended",
    date: "2025-09-10",
    orderValue: 250,
    projectTitle: "Web Application",
    projectType: "Web Development",
    isVerified: true,
    categories: ["feedback", "testimonial"],
  },
  {
    id: "1",
    clientName: "Enrico",
    clientUsername: "cocoawildboars",
    country: "Germany",
    countryFlag: "🇩🇪",
    rating: 5,
    reviewText:
      "Great experience working with Shehzad! Fast, reliable, and very professional. Communication was smooth, and the results were exactly what I needed. Highly recommend and would definitely work with him again!",
    date: "2025-06-17",
    orderValue: 300,
    projectTitle: "Traveling Wordpress Website",
    projectType: "Web Development",
    isVerified: true,
    categories: ["feedback", "testimonial"], // Both categories
  },
  {
    id: "2",
    clientName: "Renato Uni",
    clientUsername: "renatouni",
    country: "Maxico",
    countryFlag: "🇲🇽",
    rating: 5,
    reviewText: "Awesome for the work isnt expensive. nice work!",
    date: "2025-04-15",
    orderValue: 275,
    projectTitle: "React Slider Component",
    projectType: "Frontend Development",
    isVerified: true,
    categories: ["feedback"],
  },
  {
    id: "3",
    clientName: "Philos",
    clientUsername: "philos1",
    country: "Germany",
    countryFlag: "🇩🇪",
    rating: 5,
    reviewText: "outstanding work and communication!",
    date: "2025-03-22",
    orderValue: 140,
    projectTitle: "Website Carousel Component",
    projectType: "Web Development",
    isVerified: true,
    categories: ["feedback"],
  },
  {
    id: "4",
    clientName: "Sofiane Hocina",
    clientUsername: "sofianehocina",
    country: "France",
    countryFlag: "🇫🇷",
    rating: 5,
    reviewText:
      "Shehzad was AMAZING to work with—his professionalism, attention to detail, and proactive communication truly EXCEEDED expectations! His quick responsiveness and seamless cooperation made the entire process smooth and stress-free. Highly recommend working with him!",
    date: "2025-02-05",
    orderValue: 80,
    projectTitle: "Website Landing Pages",
    projectType: "Full Stack Development",
    isVerified: false,
    categories: ["testimonial", "feedback"], // Both categories
  },
  {
    id: "5",
    clientName: "Hokuo Design",
    clientUsername: "hokuodesign",
    country: "Japan",
    countryFlag: "🇯🇵",
    rating: 5,
    reviewText:
      "Top-notch developer! Shehzad did great work and delivered exactly what we were looking for. His commitment and quality of work are definitely as good as you can ever get. I am looking forward to working on the next project!",
    date: "2025-01-03",
    orderValue: 300,
    projectTitle: "Full Stack Web Application",
    projectType: "Backend Development",
    isVerified: false,
    categories: ["testimonial", "feedback"], // Both categories
  },
  {
    id: "6",
    clientName: "Danaaru",
    clientUsername: "danaaru",
    country: "Brazil",
    countryFlag: "🇧🇷",
    rating: 5,
    reviewText:
      "Mr. Shehzad, is very professional, answer quickly, and make sure everthing is good and clear along the project",
    date: "2024-10-11",
    orderValue: 50,
    projectTitle: "Website Header Component Fixings",
    projectType: "Frontend Development",
    isVerified: false,
    categories: ["feedback"],
  },
  {
    id: "7",
    clientName: "Enrico",
    clientUsername: "Enricos",
    country: "Germany",
    countryFlag: "🇩🇪",
    rating: 5,
    reviewText:
      "Mr. Shehzad, is very professional, answer quickly, and make sure everthing is good and clear along the Great work as always! Shehzad is reliable, fast, and solution-oriented. Always a pleasure to work with — highly recommended.",
    date: "2025-07-27",
    orderValue: 50,
    projectTitle: "Website Slider Component Fixings",
    projectType: "Wordpress Development",
    isVerified: false,
    categories: ["feedback"],
  },
]

export const reviewsStats = {
  averageRating: "5.0",
  totalReviews: reviewsData.length,
  totalEarnings: reviewsData.reduce((sum, review) => sum + review.orderValue, 0),
  responseTime: "< 1hr",
  repeatClients: "85%",
  completionRate: "100%",
}

export const statsConfig = [
  {
    id: "rating",
    icon: Star,
    color: "text-yellow-500",
    fillIcon: true,
    value: reviewsStats.averageRating,
    label: "Rating",
  },
  {
    id: "reviews",
    icon: Shield,
    color: "text-blue-500",
    fillIcon: false,
    value: reviewsStats.totalReviews,
    label: "Reviews",
  },
  {
    id: "response",
    icon: Clock,
    color: "text-purple-500",
    fillIcon: false,
    value: reviewsStats.responseTime,
    label: "Response",
  },
  {
    id: "repeat",
    icon: Users,
    color: "text-orange-500",
    fillIcon: false,
    value: reviewsStats.repeatClients,
    label: "Repeat Rate",
  },
  {
    id: "completion",
    icon: Award,
    color: "text-pink-500",
    fillIcon: false,
    value: reviewsStats.completionRate,
    label: "Complete",
  },
]

export function getFilteredReviews(filter: string): Review[] {
  console.log("getFilteredReviews called with filter:", filter)

  switch (filter) {
    case "testimonials":
      const testimonials = reviewsData.filter((review) => review.categories.includes("testimonial"))
      console.log("Testimonials found:", testimonials.length)
      return testimonials
    case "feedback":
      const feedback = reviewsData.filter((review) => review.categories.includes("feedback"))
      console.log("Feedback found:", feedback.length)
      return feedback
    case "all":
    default:
      console.log("All reviews:", reviewsData.length)
      return reviewsData
  }
}
