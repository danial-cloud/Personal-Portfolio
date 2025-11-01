import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeScript } from "@/components/theme-script"
import { ThemeProvider } from "@/hooks/use-theme"
import { PortfolioSuite } from "@/components/portfolio-suite"
import { Suspense } from "react"
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

// Configure Inter font with fallbacks and display optimization
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    'sans-serif'
  ],
  preload: true,
  variable: '--font-inter'
})

// SEO ke liye behtar banaya gaya metadata object
export const metadata: Metadata = {
  metadataBase: new URL("https://www.muhammad-shehzad.com"),

  // Behtar title jo location ya khaas skill ko zahir karta hai
  title: "Muhammad Shehzad - Full Stack Developer | Next.js & React Expert",

  // Description mein Call to Action (CTA) shamil kiya gaya hai
  description:
    "Hire Top Full Stack Developer | 5+ Years Experience | 100+ Projects | Get Free Quote Today! Specializing in Next.js, React, TypeScript. Contact me now for your project!",

  generator: "Muhammad Shehzad",

  // Keywords ko kam aur ziyada relevant rakha gaya hai
  keywords: [
    "Muhammad Shehzad",
    "Full Stack Developer",
    "Web Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "TypeScript",
    "Tailwind CSS",
    "Portfolio",
    "Custom Web Development",
    "Software Engineer",
    "MERN Stack",
    "JavaScript",
    "Sanity",
    "Firebase",
    "CMS",
    "Web Applications",
    "Responsive Design",
    "UI/UX Design",
    "Freelance Developer",
    "Open Source Contributor",
    "Electron Developer",
    "Chrome Extension Developer",
    "WordPress Developer",
    "Web Technologies",
    "Electron JS Developer",
    "Chrome Extension Developer",
    "Web Development Portfolio",
    "Software Development",
    "Digital Solutions",
    "Web Design",
    "Full Stack Web Development",
    "Frontend Development",
    "Backend Development",
    "API Development",
    "Web Applications",
    "Progressive Web Apps",
    "PWA",
    "Responsive Web Design",
    "Cross-Platform Development",
    "Web Performance Optimization",
    "Web Accessibility",
    "Web Standards",
    "Web Security",
    "Web Development Best Practices",
    "Web Development Trends",
    "Web Development Tools",
    "Web Development Frameworks",
    "Web Development Libraries",
    "Web Development Languages",
    "Web Development Techniques",
    "Web Development Strategies",
    "Web Development Solutions",
    "Web Development Services",
    "Web Development Company",
  ],
  authors: [{ name: "Muhammad Shehzad", url: "https://www.muhammad-shehzad.com" }],

  // Open Graph (Facebook, LinkedIn, etc.) ke liye behtar settings
  openGraph: {
    title: "Muhammad Shehzad - Full Stack Developer | Next.js & React Expert",
    description:
      "Experienced Full Stack Developer specializing in building robust web applications with modern technologies. Explore my projects and skills.",
    url: "https://www.muhammad-shehzad.com",
    siteName: "Muhammad Shehzad's Portfolio",
    images: [
      {
        // Poora (absolute) URL istemal kiya gaya hai
        url: "https://www.muhammad-shehzad.com/shehzad.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Shehzad - Full Stack Developer | Next.js & React Expert",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter ke liye behtar settings
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Shehzad - Full Stack Developer | Next.js & React Expert",
    description:
      "Experienced Full Stack Developer specializing in building robust web applications with modern technologies. Explore my projects and skills.",
    creator: "@dev-shehzad",
    // Poora (absolute) URL istemal kiya gaya hai
    images: ["https://www.muhammad-shehzad.com/twitter-image.jpg"],
  },

  // Canonical URL set hai
  alternates: {
    canonical: "https://www.muhammad-shehzad.com",
  },

  // Robots meta tag ko aasan aur standard rakha gaya hai
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  // Favicons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

// JSON-LD Structured Data for Google Rich Snippets
// Is se Google ko aapke baare mein mazeed maloomat milti hain
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Muhammad Shehzad | Full Stack Developer",
  url: "https://www.muhammad-shehzad.com",
  image: "https://www.muhammad-shehzad.com/shehzad.jpg",
  sameAs: [
    "https://github.com/dev-shehzad", // <-- Yahan apna GitHub username daalein
    "https://www.linkedin.com/in/dev-shehzad", // <-- Yahan apni LinkedIn ID daalein
    "https://twitter.com/dev-shehzad",
  ],
  jobTitle: "Full Stack Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bhakkar", // <-- Aap apna sheher likh sakte hain
    addressCountry: "PK",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NF4L9XXG');
            `,
          }}
        />
        {/* End Google Tag Manager */}
        
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Google tag (gtag.js) - Optimized loading */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-XWJB52HX90"></script>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XWJB52HX90', {
        page_title: document.title,
        page_location: window.location.href
      });
    `,
  }}
        />
        
        {/* Font preloading and fallback handling */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        
        {/* Performance optimization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Preload critical resources
              const preloadLink = document.createElement('link');
              preloadLink.rel = 'preload';
              preloadLink.href = '/shehzad.jpg';
              preloadLink.as = 'image';
              document.head.appendChild(preloadLink);
              
              // Optimize font loading with fallback handling
              if ('fonts' in document) {
                // Add fallback font loading
                const fallbackFonts = [
                  'system-ui',
                  '-apple-system',
                  'BlinkMacSystemFont',
                  'Segoe UI',
                  'Roboto'
                ];
                
                // Try to load Inter font, fallback to system fonts if it fails
                Promise.all([
                  document.fonts.load('400 16px Inter'),
                  document.fonts.load('500 16px Inter'),
                  document.fonts.load('600 16px Inter'),
                  document.fonts.load('700 16px Inter')
                ]).catch(() => {
                  // If Inter fails to load, ensure fallback fonts are available
                  console.log('Inter font failed to load, using system fonts');
                }).finally(() => {
                  document.documentElement.classList.add('fonts-loaded');
                });
              }
            `,
          }}
        />
        
        {/* JSON-LD Script ko head mein shamil kiya gaya hai */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ThemeScript />
      </head>
      <body className={`${inter.variable} font-sans bg-background text-foreground min-h-screen`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-NF4L9XXG"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            }
          >
            <PortfolioSuite>{children}</PortfolioSuite>
          </Suspense>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}