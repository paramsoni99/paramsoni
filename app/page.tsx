import { client } from '@/lib/sanity'
import { Navigation } from '@/components/Navigation'
import { HeroSection } from '@/components/HeroSection'
import { SkillsGrid } from '@/components/SkillsGrid'
import { ExperienceTimeline } from '@/components/ExperienceTimeline'
import { ProjectCard } from '@/components/ProjectCard'
import { Mail, ArrowUpRight } from 'lucide-react'

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

async function getSocialLinks() {
  try {
    const links = await client.fetch(
      `*[_type == "socialLink"] {
        _id,
        platform,
        url,
        icon
      }`
    )
    return links
  } catch (error) {
    console.error('Error fetching social links:', error)
    return []
  }
}

export default async function Home() {
  const [settings, featuredProjects, skills, experience, socialLinks] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(),
    getSkills(),
    getExperience(),
    getSocialLinks(),
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
        <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8">
          <div
            className="absolute inset-0 -z-10 opacity-30"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, var(--glow-color), transparent 60%)',
            }}
          />
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-foreground">
                Featured Projects
              </h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Handpicked work showcasing my latest capabilities
              </p>
              <div className="w-16 h-1 bg-accent rounded-full mt-6 mx-auto glow-accent" />
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

      {/* Contact Section */}
      <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 50% 80%, var(--glow-color), transparent 60%)',
          }}
        />
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-foreground">
            Let&apos;s Work Together
          </h2>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
            I&apos;m always excited about new projects and opportunities. Drop me a message!
          </p>

          <div className="glass-card p-8 sm:p-10 mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center"
                style={{ boxShadow: '0 0 15px var(--glow-color)' }}
              >
                <Mail className="w-5 h-5 text-accent" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6">Reach out via email</p>
            <a
              href={`mailto:${settings?.email || 'paramsoni.me@gmail.com'}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold bg-accent text-accent-foreground glow-accent hover:scale-[1.02] transition-all duration-300"
            >
              Send an Email
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Social Links */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3">
              {socialLinks.map((link: any) => (
                <a
                  key={link._id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl glass text-sm font-medium text-foreground/80 hover:text-accent hover:border-accent/40 transition-all duration-300"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border/30 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()}{' '}
              <span className="gradient-text font-medium">Param Soni</span>
              . All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="https://github.com/paramsoni99"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${settings?.email || 'paramsoni.me@gmail.com'}`}
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
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
