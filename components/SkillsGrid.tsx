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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Technical Skills
          </h2>
          <div className="w-20 h-1 bg-accent rounded-full" />
        </motion.div>

        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-accent mb-4">
                {categoryLabels[category] || category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {groupedSkills[category].map((skill, skillIndex) => (
                  <motion.div
                    key={skill._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                    whileHover={{ y: -2 }}
                    className="px-4 py-2 bg-background rounded-full border border-border text-sm font-medium text-foreground hover:border-accent hover:text-accent transition-colors"
                  >
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
