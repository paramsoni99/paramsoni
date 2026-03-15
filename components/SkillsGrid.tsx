'use client'

import { motion } from 'framer-motion'

interface Skill {
  _id: string
  name: string
  category: string
  proficiency?: string
}

interface SkillsGridProps {
  skills: Skill[]
}

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend Development',
  backend: 'Backend & Databases',
  languages: 'Programming Languages',
  tools: 'Tools & Platforms',
}

const categoryIcons: Record<string, string> = {
  frontend: '🎨',
  backend: '⚙️',
  languages: '💻',
  tools: '🛠️',
}

export function SkillsGrid({ skills }: SkillsGridProps) {
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      const category = skill.category || 'tools'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>
  )

  const categories = Object.keys(groupedSkills).sort()

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8">
      {/* Subtle background accent */}
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, oklch(0.72 0.2 280 / 0.08), transparent 60%)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-foreground">
            Technical Skills
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Technologies and tools I work with
          </p>
          <div className="w-16 h-1 bg-accent rounded-full mt-6 mx-auto glow-accent" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xl">{categoryIcons[category] || '📦'}</span>
                <h3 className="text-lg font-semibold text-foreground">
                  {categoryLabels[category] || category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {groupedSkills[category].map((skill, skillIndex) => (
                  <motion.span
                    key={skill._id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: skillIndex * 0.03 }}
                    whileHover={{ y: -2, scale: 1.05 }}
                    className="px-3.5 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20 hover:border-accent/50 hover:bg-accent/15 transition-all cursor-default"
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
