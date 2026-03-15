'use client'

import { motion } from 'framer-motion'

interface Experience {
  _id: string
  title: string
  company: string
  startDate: string
  endDate?: string
  description?: string
  location?: string
  current?: boolean
}

interface ExperienceTimelineProps {
  experiences: Experience[]
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8">
      {/* Subtle background accent */}
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, oklch(0.65 0.22 310 / 0.08), transparent 60%)',
        }}
      />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-foreground">
            Work Experience
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            My professional journey
          </p>
          <div className="w-16 h-1 bg-accent rounded-full mt-6 mx-auto glow-accent" />
        </motion.div>

        <div className="relative space-y-8">
          {/* Glowing timeline line */}
          <div
            className="absolute left-[11px] top-2 bottom-2 w-0.5 rounded-full"
            style={{
              background: 'linear-gradient(to bottom, var(--accent), oklch(0.65 0.22 310), var(--accent))',
              boxShadow: '0 0 8px var(--glow-color)',
            }}
          />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-10"
            >
              {/* Pulsing timeline dot */}
              <div className="absolute left-0 top-1.5">
                <div className="w-6 h-6 rounded-full bg-background flex items-center justify-center">
                  <div
                    className="w-3 h-3 rounded-full bg-accent animate-pulse-glow"
                    style={{ boxShadow: '0 0 8px var(--glow-color)' }}
                  />
                </div>
              </div>

              {/* Glass card */}
              <div className="glass-card p-6">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                  <p className="text-accent font-medium text-sm">{exp.company}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20">
                    {formatDate(exp.startDate)} – {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : 'TBD'}
                  </span>
                  {exp.location && (
                    <span className="px-2.5 py-1 rounded-full bg-muted/50 border border-border">
                      📍 {exp.location}
                    </span>
                  )}
                </div>

                {exp.description && (
                  <p className="text-muted-foreground text-sm leading-relaxed">{exp.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
