# Copilot Instructions: Real Estate Site Starter

## Project Architecture

This is a **Next.js 16 App Router** real estate site with **Prisma + PostgreSQL** and **Tailwind CSS**. The architecture follows a simple pattern:
- **Database-first**: All content (blog posts, team members, leads) is stored in PostgreSQL via Prisma
- **Server Components**: Pages fetch data directly from Prisma in server components (see `app/blog/page.tsx`)
- **API Routes**: Minimal - only `/api/lead` for form submissions
- **Static Generation**: Blog posts and team pages use `revalidate: 60` for ISR

## Key Patterns & Conventions

### Database Access
- **Always use the singleton**: Import from `lib/prisma.ts`, never instantiate `PrismaClient` directly
- **Server components**: Query Prisma directly in page components (see `app/blog/[slug]/page.tsx`)
- **Lead capture**: All forms submit to `/api/lead` with `type` field to categorize

### Component Structure
- **UI components**: Located in `components/ui/` (Button, Card)
- **Feature components**: Root `components/` (Hero, LeadForm, ListingsGrid)
- **Form pattern**: LeadForm accepts `type` prop and handles all form states (`idle | sent | error`)

### Styling & Design
- **Design system**: Coastal/luxury theme with `brand` colors and `gold` accent
- **Typography**: `font-serif` for headings, `font-sans` for body
- **Forms**: Rounded-xl inputs, consistent padding (`px-3 py-2`)
- **Layout**: Container class centers content, consistent border/card patterns

## Development Workflow

### Setup Commands
```bash
npm install
cp .env.example .env
# Edit DATABASE_URL + NEXTAUTH_* in .env
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

### Database Changes
1. Modify `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name descriptive_name`
3. Update seed file if needed: `npm run prisma:seed`

### Content Management
- **Blog posts**: Managed via direct DB or Prisma Studio (`npx prisma studio`)
- **Team members**: Seeded via `prisma/seed.ts`, ordered by `order` field
- **Leads**: Captured via forms, stored with `type` categorization

## Critical Implementation Details

### SEO & Metadata
- **Dynamic metadata**: Blog posts generate metadata from DB content (see `generateMetadata` in `app/blog/[slug]/page.tsx`)
- **Sitemap**: Auto-generated from DB content in `app/sitemap.ts`
- **Static routes**: Robots.txt via route handler

### NextAuth Integration
- **Schema ready**: User/Account/Session models configured for NextAuth 5.0
- **Role-based**: Users have `ADMIN | EDITOR` roles for content management
- **Not implemented**: Auth flows need to be added per NextAuth docs

### Performance Considerations
- **ISR**: Blog and team pages revalidate every 60 seconds
- **Prisma**: Uses connection pooling via singleton pattern
- **Images**: Placeholder content - replace with Next.js Image component for production

## Common Tasks

### Adding New Page Types
1. Create page in `app/` directory
2. Add to navigation in `app/layout.tsx`
3. If DB-backed, add Prisma model and update seed

### Extending Lead Capture
- Add new `type` to LeadForm component
- Forms automatically categorize via `type` prop
- All leads stored in single `Lead` table with type discrimination

### Blog Content
- Content stored as plain text/markdown in `content` field
- Uses `whitespace-pre-wrap` for rendering
- Published posts filtered by `published: true`