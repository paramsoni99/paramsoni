import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ queries
export const projectsQuery = `
  *[_type == "project"] | order(order asc, _createdAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage,
    technologies,
    liveUrl,
    githubUrl,
    featured,
    order
  }
`

export const featuredProjectsQuery = `
  *[_type == "project" && featured == true] | order(order asc) [0...3] {
    _id,
    title,
    slug,
    description,
    mainImage,
    technologies,
    liveUrl,
    githubUrl
  }
`

export const skillsQuery = `
  *[_type == "skill"] | order(category asc, name asc) {
    _id,
    name,
    category,
    proficiency
  }
`

export const experienceQuery = `
  *[_type == "experience"] | order(startDate desc) {
    _id,
    title,
    company,
    startDate,
    endDate,
    description,
    location
  }
`

export const socialLinksQuery = `
  *[_type == "socialLink"] {
    _id,
    platform,
    url,
    icon
  }
`

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    name,
    title,
    bio,
    email,
    social
  }
`
