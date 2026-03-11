# Param's Portfolio Website - Setup Guide

A modern, dark-themed portfolio website built with Next.js 15, React 19, and Sanity CMS. Features include a hidden admin panel for managing projects and smooth, animated UI.

## Quick Start

### 1. Clone or Download the Project
If using GitHub, clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

### 2. Install Dependencies
```bash
pnpm install
# or
npm install
# or
yarn install
```

### 3. Set Up Sanity

#### Create a Sanity Project
1. Go to [sanity.io](https://sanity.io)
2. Sign up or log in to your account
3. Create a new project
4. Note your **Project ID** and **Dataset** (usually `production`)

#### Generate API Token
1. Go to [manage.sanity.io](https://manage.sanity.io)
2. Navigate to **API** → **Tokens**
3. Create a new token with **Editor** permissions
4. Copy the token

### 4. Configure Environment Variables
1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Update `.env.local` with your values:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
ADMIN_PASSWORD=your_secure_password
```

### 5. Deploy Sanity Schemas
The schemas are defined in `/sanity/schema.ts`. To use the Sanity Studio:

```bash
# If you have sanity CLI installed globally
sanity deploy

# Or use the web interface at manage.sanity.io
```

### 6. Add Content in Sanity Studio

#### Access Sanity Studio
- Go to `https://{your-project-id}.sanity.io`
- Or navigate to `manage.sanity.io` and find your project

#### Add Your Information
1. **Site Settings**: Add your name, title, bio, email, and tagline
2. **Skills**: Add your technical skills organized by category
3. **Experience**: Add your work experience entries
4. **Projects**: Add your portfolio projects with images and links
5. **Social Links**: Add links to your GitHub, LinkedIn, etc.

### 7. Run Locally
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Features

- **Dark Mode Design**: Modern, professional dark theme with vibrant accent colors
- **Responsive Layout**: Mobile-first design that works on all devices
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **Pagination**: Projects displayed with 6 per page
- **Admin Panel**: Password-protected dashboard at `/admin/login`
- **CMS Integration**: Sanity Studio for easy content management
- **Real-time Updates**: Changes in Sanity immediately reflect on the site

## Project Structure

```
app/
├── page.tsx                 # Home page
├── projects/
│   └── page.tsx            # Projects listing with pagination
├── admin/
│   ├── page.tsx            # Admin dashboard
│   └── login/
│       └── page.tsx        # Admin login
└── api/
    └── admin/              # Auth API routes

components/
├── Navigation.tsx          # Top navigation bar
├── HeroSection.tsx         # Hero section with CTA
├── SkillsGrid.tsx          # Skills grid by category
├── ExperienceTimeline.tsx  # Work experience timeline
└── ProjectCard.tsx         # Individual project card

lib/
├── sanity.ts              # Sanity client & queries
└── auth.ts                # Auth utilities

sanity/
└── schema.ts              # Sanity document schemas
```

## Admin Panel

### Access the Admin Panel
1. Navigate to `/admin/login`
2. Enter your `ADMIN_PASSWORD` from `.env.local`
3. You'll see the admin dashboard with options to manage content

### Managing Content
- Click "Open Sanity Studio" to edit content in detail
- Sanity Studio provides a visual editor for all your content
- Changes are published instantly

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID | Yes |
| `NEXT_PUBLIC_SANITY_DATASET` | Your Sanity dataset (usually `production`) | Yes |
| `SANITY_API_TOKEN` | Sanity API token for authenticated requests | Yes |
| `ADMIN_PASSWORD` | Password for the admin panel | Yes |

## Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in project settings
5. Deploy!

### Environment Variables on Vercel
Add the same environment variables to your Vercel project:
- Go to Project Settings → Environment Variables
- Add all variables from `.env.local`

## Customization

### Colors
Edit the design tokens in `app/globals.css` to change the color scheme:
- `--accent`: Primary accent color (default: purple)
- `--background`: Dark background color
- `--foreground`: Light text color

### Fonts
The project uses Geist font from Google Fonts. To change:
1. Edit `app/layout.tsx`
2. Import different fonts from `next/font/google`
3. Update the font configuration

### Adding More Sections
1. Create a new component in `/components`
2. Add the GROQ query to `/lib/sanity.ts`
3. Fetch data and render in `/app/page.tsx`

## Troubleshooting

### Content Not Showing
- Verify Sanity credentials in `.env.local`
- Check that content is published in Sanity
- Clear Next.js cache: `rm -rf .next`

### Admin Login Not Working
- Ensure `ADMIN_PASSWORD` is correctly set in `.env.local`
- Clear browser cookies
- Check that API routes are accessible

### Images Not Loading
- Verify images are uploaded to Sanity
- Check image URLs with `urlFor()` helper
- Ensure image optimization is enabled in Next.js

## Support

For issues or questions:
1. Check Sanity documentation: [sanity.io/docs](https://sanity.io/docs)
2. Check Next.js documentation: [nextjs.org](https://nextjs.org)
3. Contact Param: paramsoni.me@gmail.com

## License

This project is personal and confidential. Unauthorized copying or distribution is prohibited.
