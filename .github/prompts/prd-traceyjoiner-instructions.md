Copilot Prompt — “Luxury Presence-Style Real Estate Website Builder”

Goal
Build a modern, SEO-optimized real estate website inspired by meyerlucas.com, but with completely new brand assets, content, and messaging. The site should support IDX-style property browsing, lead generation funnels, and a built-in blog CMS. The final product should be production-ready, responsive, fast, accessible, and scalable.

Tech Stack (required)

Next.js 16 App Router (Typescript)

Tailwind CSS + shadcn/ui

Prisma + PostgreSQL

NextAuth (Email + Google login for admin)

Postgres database for blog posts, pages, and leads

SEO tooling: next-seo, OpenGraph tags, sitemap.xml, robots.txt

Image optimization via Next.js <Image />

Deployed on Vercel (preferred) or AWS Amplify

Pages & Features to Build

Home Page

Hero section with headline, subheadline, lead capture button

Featured listings carousel (can use placeholder JSON or schema)

Neighborhood “area pages” grid

“Meet the Team” teaser section + CTA to full page

Testimonials slider

SEO footer with schema markup (RealEstateAgent, LocalBusiness)

Property Search Page

Map + list toggle layout

Filter panel (price, beds, baths, property type, city)

Placeholder IDX dataset (JSON mock first, API replaceable later)

Team Page (like meyerlucas.com/team)

Dynamic team member profiles stored in DB

“Schedule a consultation” button per agent

Lead Funnels

CTA modal: “Get Home Valuation” → multi-step form

CTA modal: “Start Home Search” → email + phone capture

Save submissions to DB + trigger transactional email (Resend / Postmark)

Blog

SEO-friendly blog index with pagination

Individual blog posts at /blog/[slug]

Rich text editor for admin (TipTap or MDX)

Auto-generated OpenGraph image per post

Blog schema markup (Article, Author, Organization)

Admin Dashboard (protected)

Create/edit/delete blog posts, team members, homepage content blocks

View lead submissions

Role-based access (admin, editor)

Global SEO & Performance Requirements

Title + meta tags per page

JSON-LD schema for Real Estate, Article, LocalBusiness

Lighthouse score 90+

sitemap.xml + robots.txt auto-generated

OG + Twitter card support

Branding & Style Direction

Luxury coastal aesthetic like Meyer Lucas

Whites, navy, gold accents

Serif + modern sans-serif pairing (e.g., Playfair Display + Inter)

Full-bleed images, clean grid, large white space economy

Data Models (Prisma)

BlogPost (slug, title, content, publishedAt, ogImageUrl, excerpt, tags)

TeamMember (name, title, bio, headshot, social links, order)

Lead (type, name, email, phone, message, source, createdAt)

Property (optional now, but define schema for future IDX import)

Copilot — what to do first

Generate full folder structure for the Next.js 16 App Router project

Scaffold all required pages + placeholder UI components

Create Prisma schema + seed script

Add blog CRUD + admin auth

Implement SEO utilities + sitemap + OpenGraph components

Replace placeholder content with filler copy (not copied text)

Output final scaffold + instructions in README.md

Success Criteria

Runs locally with npm install && npm run dev

All routes exist, even with placeholder data

Blog and leads save to DB

Uses reusable components and clean Tailwind-first design

Fully responsive (mobile → desktop)

SEO-ready out of the box

No lorem ipsum – use well-written example real estate copy

Deliverables
✅ Fully scaffolded repo
✅ Sample blog posts (3)
✅ Sample team members (3)
✅ Working lead form + email confirmation
✅ Admin panel
✅ README instructions for setup, deployment, adding content

Do not

Copy any code, copy, or assets from meyerlucas.com

Use any paid IDX system (just mock placeholder real data fields)

Use create-react-app, WordPress, or templates