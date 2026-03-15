'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, ExternalLink, ChevronDown } from 'lucide-react'
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
  const [isExpanded, setIsExpanded] = useState(false)
  const [isClamped, setIsClamped] = useState(false)
  const [showAllTech, setShowAllTech] = useState(false)
  const descriptionRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = descriptionRef.current
    if (el) {
      setIsClamped(el.scrollHeight > el.clientHeight + 1)
    }
  }, [description])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group glass-card overflow-hidden flex flex-col glow-card"
      layout
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video bg-gradient-to-br from-accent/5 to-primary/5 flex-shrink-0">
        {image ? (
          <Image
            src={urlFor(image).width(800).height(450).fit('max').url()}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center">
            <p className="text-muted-foreground text-sm">No image available</p>
          </div>
        )}
        {featured && (
          <div
            className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold"
            style={{ boxShadow: '0 0 10px var(--glow-color)' }}
          >
            ✨ Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Description with expand/collapse */}
        <div className="mb-4">
          <p
            ref={descriptionRef}
            className={`text-muted-foreground text-sm leading-relaxed transition-all duration-300 ${
              isExpanded ? '' : 'line-clamp-3'
            }`}
          >
            {description}
          </p>

          {(isClamped || isExpanded) && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded((prev) => !prev)
              }}
              className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-accent hover:text-primary transition-colors cursor-pointer"
            >
              {isExpanded ? 'Show less' : 'Show more'}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
          )}
        </div>

        {/* Technologies */}
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {(showAllTech ? technologies : technologies.slice(0, 3)).map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full border border-accent/20"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowAllTech((prev) => !prev)
                }}
                className="px-2.5 py-1 bg-muted/30 text-muted-foreground text-xs font-medium rounded-full border border-border hover:border-accent hover:text-accent transition-colors cursor-pointer"
              >
                {showAllTech ? 'Show less' : `+${technologies.length - 3} more`}
              </button>
            )}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-border/50 mt-auto">
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
