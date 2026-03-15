'use client'

import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'
import { Navigation } from '@/components/Navigation'
import { ProjectCard } from '@/components/ProjectCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

const PROJECTS_PER_PAGE = 6

interface Project {
  _id: string
  title: string
  slug: any
  description: string
  mainImage?: any
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true)
        const data = await client.fetch(`
          *[_type == "project"] | order(order asc, _createdAt desc) {
            _id,
            title,
            slug,
            description,
            mainImage,
            technologies,
            liveUrl,
            githubUrl,
            featured
          }
        `)
        setProjects(data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE
  const endIndex = startIndex + PROJECTS_PER_PAGE
  const currentProjects = projects.slice(startIndex, endIndex)

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
              <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              Explore my portfolio of innovative projects showcasing full-stack development,
              AI/ML applications, and creative problem-solving.
            </p>
            <div className="w-16 h-1 bg-accent rounded-full mt-6 mx-auto glow-accent" />
          </motion.div>

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div
                className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"
                style={{ boxShadow: '0 0 12px var(--glow-color)' }}
              />
            </div>
          ) : projects.length === 0 ? (
            // Empty State
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <p className="text-lg text-muted-foreground mb-4">No projects found yet.</p>
              <p className="text-sm text-muted-foreground">Check back soon for updates!</p>
            </motion.div>
          ) : (
            <>
              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {currentProjects.map((project, index) => (
                  <ProjectCard
                    key={project._id}
                    title={project.title}
                    description={project.description}
                    image={project.mainImage}
                    technologies={project.technologies || []}
                    liveUrl={project.liveUrl}
                    githubUrl={project.githubUrl}
                    featured={project.featured}
                    index={index}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-between pt-12 border-t border-border/30"
                >
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-foreground hover:border-accent/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => {
                          setCurrentPage(page)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        className={`w-10 h-10 rounded-xl font-medium transition-all ${
                          page === currentPage
                            ? 'bg-accent text-accent-foreground glow-accent'
                            : 'glass text-foreground hover:border-accent/40'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-foreground hover:border-accent/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {/* Page Info */}
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to {Math.min(endIndex, projects.length)} of{' '}
                  {projects.length} projects
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/30 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()}{' '}
            <span className="gradient-text font-medium">Param Hiren Soni</span>
            . All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
