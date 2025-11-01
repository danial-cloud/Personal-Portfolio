"use client"

import Image from "next/image"
import { useState } from "react"

interface ServiceImageProps {
  src: string
  alt: string
  className?: string
  fallbackContent?: React.ReactNode
}

export function ServiceImage({ src, alt, className, fallbackContent }: ServiceImageProps) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return <>{fallbackContent}</>
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
