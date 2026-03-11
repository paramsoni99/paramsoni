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
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Work Experience
          </h2>
          <div className="w-20 h-1 bg-accent rounded-full" />
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative pl-8 border-l-2 border-accent/30 hover:border-accent transition-colors"
            >
              <div className="absolute -left-3 top-0 w-4 h-4 bg-accent rounded-full" />

              <div className="mb-2">
                <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                <p className="text-accent font-medium">{exp.company}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-muted-foreground mb-3">
                <time>
                  {formatDate(exp.startDate)} – {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : 'TBD'}
                </time>
                {exp.location && <span>•</span>}
                {exp.location && <span>{exp.location}</span>}
              </div>

              {exp.description && (
                <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
