import { Metadata } from "next"
import { notFound } from "next/navigation"
import { blogPosts } from "@/data/blog-data"
import { ArrowLeft, Calendar, User, Tag, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  
  if (!post) {
    return {
      title: "Blog Post Not Found",
    }
  }

  return {
    title: `${post.title} | Muhammad Shehzad - Full Stack Developer Blog`,
    description: post.excerpt,
    keywords: [
      ...post.tags,
      "web development",
      "full stack developer",
      "programming",
      "technology",
      "software development",
      "coding",
      "tech blog",
      "Muhammad Shehzad"
    ].join(", "),
    authors: [{ name: post.author, url: "https://muhammad-shehzad.com" }],
    creator: "Muhammad Shehzad",
    publisher: "Muhammad Shehzad",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      siteName: "Muhammad Shehzad - Full Stack Developer",
      locale: "en_US",
      url: `https://muhammad-shehzad.com/blog/${post.slug}`,
      images: [
        {
          url: post.image || "https://muhammad-shehzad.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@dev_shehzad",
      images: [post.image || "https://muhammad-shehzad.com/og-image.jpg"],
    },
    alternates: {
      canonical: `https://muhammad-shehzad.com/blog/${post.slug}`,
    },
    category: post.category,
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    notFound()
  }

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image || "https://muhammad-shehzad.com/og-image.jpg",
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://muhammad-shehzad.com"
    },
    "publisher": {
      "@type": "Person",
      "name": "Muhammad Shehzad",
      "url": "https://muhammad-shehzad.com"
    },
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://muhammad-shehzad.com/blog/${post.slug}`
    },
    "keywords": post.tags.join(", "),
    "articleSection": post.category,
    "wordCount": post.content ? post.content.map(section => section.text).join(" ").split(" ").length : 0
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">

        {/* Blog Post Header */}
        <article className="prose prose-gray dark:prose-invert max-w-none">
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge 
                variant="secondary" 
                className="rounded-full bg-primary/10 text-primary border-0 hover:bg-primary/20 transition-colors duration-200 font-medium px-3 py-1"
              >
                {post.category}
              </Badge>
              {post.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="rounded-full border-border/50 dark:border-border/70 hover:bg-muted/50 transition-colors duration-200 font-normal px-2 py-0.5"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b border-border pb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="mb-8">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-64 object-cover rounded-2xl"
              />
            </div>
          )}

          {/* Blog Content */}
          <div className="space-y-6 text-foreground leading-relaxed">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              {Array.isArray(post.content) ? (
                post.content.map((section, index) => (
                  <div key={index} className="mb-6">
                    {section.type === 'heading' && (
                      <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">
                        {section.text}
                      </h2>
                    )}
                    {section.type === 'paragraph' && (
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {section.text}
                      </p>
                    )}
                    {section.type === 'list' && (
                      <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
                        {section.items?.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-muted-foreground leading-relaxed">
                  {post.content}
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="rounded-full border-border/50 dark:border-border/70 hover:bg-muted/50 transition-colors duration-200 font-normal px-2 py-0.5"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(() => {
              // First try to get posts from the same category
              const sameCategoryPosts = blogPosts.filter(p => p.slug !== post.slug && p.category === post.category)
              
              // If we have at least 2 posts from same category, use them
              if (sameCategoryPosts.length >= 2) {
                return sameCategoryPosts.slice(0, 2)
              }
              
              // If we have 1 post from same category, get 1 more from any category
              if (sameCategoryPosts.length === 1) {
                const otherPosts = blogPosts.filter(p => p.slug !== post.slug && p.category !== post.category)
                return [...sameCategoryPosts, ...otherPosts.slice(0, 1)]
              }
              
              // If no posts from same category, get any 2 posts
              return blogPosts.filter(p => p.slug !== post.slug).slice(0, 2)
            })().map((relatedPost) => (
                <Card key={relatedPost.slug} className="overflow-hidden rounded-2xl border hover:border-primary/50 transition-all duration-300">
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge 
                          variant="secondary" 
                          className="rounded-full bg-primary/10 text-primary border-0 hover:bg-primary/20 transition-colors duration-200 font-medium px-2 py-0.5 text-xs"
                        >
                          {relatedPost.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-2 hover:text-primary transition-colors">
                        {relatedPost.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {relatedPost.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{relatedPost.author}</span>
                        <span>•</span>
                        <span>{new Date(relatedPost.publishedAt).toLocaleDateString('en-US')}</span>
                        <span>•</span>
                        <span>{relatedPost.readTime} min read</span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
