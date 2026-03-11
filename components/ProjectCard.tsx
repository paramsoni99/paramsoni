'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import { urlFor } from '@/lib/sanity'

interface ProjectCardProps {
  title: string
  description: string
  image?: any
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  index?: number
}

export function ProjectCard({
  title,
  description,
  image,
  technologies,
  liveUrl,
  githubUrl,
  featured = false,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group rounded-lg overflow-hidden border border-border hover:border-accent transition-all duration-300"
    >
      <div className="relative overflow-hidden h-48 sm:h-56 bg-card">
        {image ? (
          <Image
            src={urlFor(image).url()}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">No image available</p>
            </div>
          </div>
        )}
        {featured && (
          <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
          {title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-background text-accent text-xs font-medium rounded-full border border-border"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <span className="px-3 py-1 bg-background text-muted-foreground text-xs font-medium rounded-full border border-border">
                +{technologies.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t border-border">
          {liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </Link>
          )}
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
              Code
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  )
}
