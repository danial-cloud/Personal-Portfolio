"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User, ArrowRight, Search, X } from "lucide-react"
import Image from "next/image"
import { blogPosts, blogCategories, featuredPosts } from "@/data/blog-data"

interface BlogSectionProps {
  initialCategory?: string
}

// Image component with fallback
function BlogImageWithFallback({ src, alt, className }: { src: string, alt: string, className?: string }) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <div className={`${className} bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 flex items-center justify-center`}>
        <div className="text-white text-center p-4">
          <div className="text-4xl mb-2">📝</div>
          <div className="text-sm">Article Image</div>
        </div>
      </div>
    )
  }

  return (
    <Image 
      src={src} 
      alt={alt}
      fill
      className={className}
      onError={() => setImageError(true)}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}

export function BlogSection({ initialCategory }: BlogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "All")
  const [searchQuery, setSearchQuery] = useState("")
  const searchParams = useSearchParams()
  
  // Listen for URL changes from sidebar
  useEffect(() => {
    const category = searchParams.get("category")
    if (category) {
      setSelectedCategory(category)
    } else {
      setSelectedCategory("All")
    }
  }, [searchParams])
  
  // Update URL when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    const url = category === "All" ? "/blog" : `/blog?category=${encodeURIComponent(category)}`
    window.history.pushState({}, "", url)
  }

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <section id="blog-posts" className="space-y-8">
      {/* Filters */}
      <section className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-row gap-3 md:flex-row md:items-center md:gap-4">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-3 h-4 w-4 text-foreground/60" />
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-2xl bg-background pl-9 pr-4 py-2 border-border dark:border-border"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-8 w-8 rounded-xl"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex gap-2 md:flex-shrink-0">
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-[140px] md:w-[180px] rounded-2xl border-border dark:border-border">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  {blogCategories.map((category) => (
                    <SelectItem key={category} value={category} className="rounded-xl">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/20 rounded-xl border-0 shadow-sm self-start md:self-auto">
            {filteredPosts.length} Articles
          </Badge>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === "All" && searchQuery === "" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Featured Articles</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <motion.div key={post.id} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Card className="overflow-hidden rounded-3xl border border-border/30 dark:border-border hover:border-primary/30 hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 bg-card shadow-sm dark:shadow-lg h-full flex flex-col">
                  <div className="aspect-video overflow-hidden relative">
                    <BlogImageWithFallback 
                      src={post.image} 
                      alt={post.title}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl border-0">
                          {post.category}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="text-white font-semibold text-lg line-clamp-2">
                          {post.title}
                        </h4>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-black/60 text-white hover:bg-black/70 rounded-xl border-0 backdrop-blur-sm">
                        {post.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <h4 className="text-white font-semibold text-lg line-clamp-2">
                        {post.title}
                      </h4>
                    </div>
                  </div>
                  <CardHeader className="pb-2 flex-shrink-0">
                    <CardDescription className="text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="rounded-xl text-xs border-border">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl" asChild>
                      <a href={`/blog/${post.slug}`}>
                        Read More
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* All Posts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">
            {selectedCategory === "All" ? "All Articles" : `${selectedCategory} Articles`}
            {searchQuery && ` - "${searchQuery}"`}
          </h3>
          <span className="text-sm text-muted-foreground">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchQuery}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredPosts.map((post) => (
              <motion.div key={post.id} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Card className="overflow-hidden rounded-3xl border border-border/30 dark:border-border hover:border-primary/30 hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 bg-card shadow-sm dark:shadow-lg h-full flex flex-col">
                  <div className="aspect-video overflow-hidden relative">
                    <BlogImageWithFallback 
                      src={post.image} 
                      alt={post.title}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-600 dark:via-purple-600 dark:to-pink-600 hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl border-0">
                          {post.category}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="text-white font-semibold text-lg line-clamp-2">
                          {post.title}
                        </h4>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-black/60 text-white hover:bg-black/70 rounded-xl border-0 backdrop-blur-sm">
                        {post.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <h4 className="text-white font-semibold text-lg line-clamp-2">
                        {post.title}
                      </h4>
                    </div>
                  </div>
                  <CardHeader className="pb-2 flex-shrink-0">
                    <CardDescription className="text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="rounded-xl text-xs border-border">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl" asChild>
                      <a href={`/blog/${post.slug}`}>
                        Read More
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No articles found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
            <Button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }} className="rounded-xl">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
