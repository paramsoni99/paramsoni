import { SchemaTypeDefinition } from 'sanity'

const projectSchema: SchemaTypeDefinition = {
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'liveUrl',
      title: 'Live Demo URL',
      type: 'url',
    },
    {
      name: 'githubUrl',
      title: 'GitHub Repository URL',
      type: 'url',
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    },
  ],
}

const skillSchema: SchemaTypeDefinition = {
  name: 'skill',
  title: 'Skills',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'frontend' },
          { title: 'Backend', value: 'backend' },
          { title: 'Languages', value: 'languages' },
          { title: 'Tools & Platforms', value: 'tools' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'proficiency',
      title: 'Proficiency Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Expert', value: 'expert' },
        ],
      },
      initialValue: 'intermediate',
    },
  ],
}

const experienceSchema: SchemaTypeDefinition = {
  name: 'experience',
  title: 'Work Experience',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'company',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    },
    {
      name: 'description',
      title: 'Job Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'current',
      title: 'Currently Working Here',
      type: 'boolean',
      initialValue: false,
    },
  ],
}

const socialLinkSchema: SchemaTypeDefinition = {
  name: 'socialLink',
  title: 'Social Links',
  type: 'document',
  fields: [
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'GitHub', value: 'github' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Twitter', value: 'twitter' },
          { title: 'Email', value: 'email' },
          { title: 'Portfolio', value: 'portfolio' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon Name (lucide-react)',
      type: 'string',
      description: 'e.g., Github, Linkedin, Mail, etc.',
    },
  ],
}

const siteSettingsSchema: SchemaTypeDefinition = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Professional Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 5,
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'email',
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'e.g., SOLUTIONS ARITECH',
    },
  ],
}

export const schemaTypes: SchemaTypeDefinition[] = [
  projectSchema,
  skillSchema,
  experienceSchema,
  socialLinkSchema,
  siteSettingsSchema,
]
