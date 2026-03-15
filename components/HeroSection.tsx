'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

interface HeroProps {
  name: string
  title: string
  bio: string
  tagline?: string
}

export function HeroSection({ name, title, bio, tagline }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 animate-gradient"
          style={{
            background:
              'linear-gradient(135deg, oklch(0.08 0.01 280), oklch(0.12 0.04 300), oklch(0.08 0.02 260), oklch(0.1 0.03 290))',
            backgroundSize: '400% 400%',
          }}
        />

        {/* Floating orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, oklch(0.72 0.2 280 / 0.15), transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, oklch(0.65 0.22 310 / 0.12), transparent 70%)',
            filter: 'blur(50px)',
            animationDelay: '2s',
          }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-56 h-56 rounded-full animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, oklch(0.7 0.18 200 / 0.1), transparent 70%)',
            filter: 'blur(35px)',
            animationDelay: '4s',
          }}
        />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {tagline && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-subtle text-sm font-medium text-accent mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="tracking-widest uppercase text-xs">{tagline}</span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
        >
          <span className="gradient-text">{name}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-xl sm:text-2xl font-medium text-foreground/70 mb-4"
        >
          {title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold bg-accent text-accent-foreground glow-accent hover:gap-3 transition-all duration-300 hover:scale-[1.02]"
          >
            Explore Projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/#contact"
            className="px-8 py-3.5 rounded-xl font-semibold glass border-accent/30 text-foreground hover:border-accent/60 hover:bg-accent/10 transition-all duration-300"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
