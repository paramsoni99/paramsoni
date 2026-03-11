'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface HeroProps {
  name: string
  title: string
  bio: string
  tagline?: string
}

export function HeroSection({ name, title, bio, tagline }: HeroProps) {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {tagline && (
            <p className="text-sm font-semibold text-accent mb-6 tracking-widest uppercase">
              {tagline}
            </p>
          )}
          
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 text-balance">
            <span className="text-foreground">{name}</span>
          </h1>

          <p className="text-2xl sm:text-3xl font-semibold text-accent mb-4">
            {title}
          </p>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed text-balance">
            {bio}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-primary transition-all duration-300 hover:gap-3"
          >
            Explore Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          <Link
            href="mailto:paramsoni.me@gmail.com"
            className="px-8 py-3 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-colors duration-300"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
