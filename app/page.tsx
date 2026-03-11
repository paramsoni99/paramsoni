import { client } from '@/lib/sanity'
import { Navigation } from '@/components/Navigation'
import { HeroSection } from '@/components/HeroSection'
import { SkillsGrid } from '@/components/SkillsGrid'
import { ExperienceTimeline } from '@/components/ExperienceTimeline'
import { ProjectCard } from '@/components/ProjectCard'
import { motion } from 'framer-motion'

export const revalidate = 3600 // Revalidate every hour

async function getSiteSettings() {
  try {
    const settings = await client.fetch(`*[_type == "siteSettings"][0]`)
    return settings
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return {
      name: 'Param Hiren Soni',
      title: 'Full-Stack Developer & BTech IT Student',
      bio: 'Passionate about building innovative web solutions that solve real problems.',
      tagline: 'SOLUTIONS ARITECH',
    }
  }
}

async function getFeaturedProjects() {
  try {
    const projects = await client.fetch(
      `*[_type == "project" && featured == true] | order(order asc) [0...3] {
        _id,
        title,
        slug,
        description,
        mainImage,
        technologies,
        liveUrl,
        githubUrl
      }`
    )
    return projects
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}

async function getSkills() {
  try {
    const skills = await client.fetch(
      `*[_type == "skill"] | order(category asc, name asc) {
        _id,
        name,
        category,
        proficiency
      }`
    )
    return skills
  } catch (error) {
    console.error('Error fetching skills:', error)
    return []
  }
}

async function getExperience() {
  try {
    const experience = await client.fetch(
      `*[_type == "experience"] | order(startDate desc) {
        _id,
        title,
        company,
        startDate,
        endDate,
        description,
        location,
        current
      }`
    )
    return experience
  } catch (error) {
    console.error('Error fetching experience:', error)
    return []
  }
}

export default async function Home() {
  const [settings, featuredProjects, skills, experience] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(),
    getSkills(),
    getExperience(),
  ])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <HeroSection
        name={settings?.name || 'Param Soni'}
        title={settings?.title || 'Full-Stack Developer'}
        bio={
          settings?.bio ||
          'BTech IT student passionate about building innovative web solutions.'
        }
        tagline={settings?.tagline || 'solution architect'}
      />

      {/* Featured Projects Section */}
      {featuredProjects && featuredProjects.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
                Featured Projects
              </h2>
              <div className="w-20 h-1 bg-accent rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project: any, index: number) => (
                <ProjectCard
                  key={project._id}
                  title={project.title}
                  description={project.description}
                  image={project.mainImage}
                  technologies={project.technologies || []}
                  liveUrl={project.liveUrl}
                  githubUrl={project.githubUrl}
                  featured={true}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills && skills.length > 0 && <SkillsGrid skills={skills} />}

      {/* Experience Section */}
      {experience && experience.length > 0 && <ExperienceTimeline experiences={experience} />}

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-foreground">
            Ready to work together?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <a
            href="mailto:paramsoni.me@gmail.com"
            className="inline-block px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-primary transition-all duration-300"
          >
            Send me an email
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Param Hiren Soni. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="mailto:paramsoni.me@gmail.com"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
