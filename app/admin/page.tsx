'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { client } from '@/lib/sanity'
import { motion } from 'framer-motion'
import { LogOut, Edit2, Trash2, Plus } from 'lucide-react'

interface Project {
  _id: string
  title: string
  description: string
  featured?: boolean
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/admin/verify')
        if (!response.ok) {
          router.push('/admin/login')
        }
      } catch (err) {
        router.push('/admin/login')
      }
    }

    async function fetchProjects() {
      try {
        const data = await client.fetch(`
          *[_type == "project"] | order(_createdAt desc) {
            _id,
            title,
            description,
            featured
          }
        `)
        setProjects(data)
      } catch (err) {
        setError('Failed to load projects')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
    fetchProjects()
  }, [router])

  async function handleLogout() {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your portfolio content</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg font-medium hover:bg-destructive/90 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-lg border border-border p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Projects</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your portfolio projects via Sanity Studio
              </p>
            </div>
            <a
              href="https://sanity.io/manage"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-primary transition-colors"
            >
              <Plus className="w-4 h-4" />
              Open Sanity Studio
            </a>
          </div>

          {error && (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No projects found</p>
              <a
                href="https://sanity.io/manage"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-primary transition-colors"
              >
                Create first project in Sanity
              </a>
            </div>
          ) : (
            <div className="grid gap-4">
              {projects.map((project) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 rounded-lg border border-border hover:border-accent transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-foreground truncate">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full whitespace-nowrap">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <a
                        href={`https://sanity.io/manage/desk/document/project;${project._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent transition-colors"
                        title="Edit in Sanity"
                      >
                        <Edit2 className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 bg-card rounded-lg border border-border p-8"
        >
          <h3 className="text-xl font-bold text-foreground mb-4">Need help?</h3>
          <p className="text-muted-foreground mb-4">
            This admin panel is a simple interface for managing your portfolio. All content is managed
            through Sanity Studio for a better editing experience.
          </p>
          <a
            href="https://sanity.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-primary transition-colors font-medium"
          >
            Learn more about Sanity Studio →
          </a>
        </motion.div>
      </main>
    </div>
  )
}
