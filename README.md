# Where Did Everyone Go? (WDEG)

**A Prophetic Blueprint for Understanding Our Present Chaos**

Where Did Everyone Go? is a comprehensive digital book platform built on Payload CMS and Next.js, presenting a prophetic exploration of end-time events and the hope found in Christ. This multilingual platform makes the WDEG book accessible to readers worldwide in 9 languages.

## About the Book

"Where Did Everyone Go?" is meant to be found in that hour of desperation—to point to the only truth that matters. It serves as a prophetic blueprint explaining our present chaos and the storm still ahead, offering hope and guidance through biblical prophecy and end-time understanding.

### Key Themes
- **The Rapture and End-Time Events** - Understanding biblical prophecy and timing
- **Signs of the Times** - Recognizing current world events in prophetic context  
- **The Great Tribulation** - What lies ahead for humanity
- **Hope in Christ** - The narrow gate and new life in Jesus
- **Wedding of the Lamb** - The bride of Christ and eternal promises

## Platform Features

### Multilingual Support
The book is available in 9 languages:
- **English** (en) - Primary language
- **Español** (es) - Spanish
- **Français** (fr) - French  
- **Deutsch** (de) - German
- **Italiano** (it) - Italian
- **Português** (pt) - Portuguese
- **Polski** (pl) - Polish
- **العربية** (ar) - Arabic
- **עברית** (he) - Hebrew

### Book Navigation
- **26 Chapters** - Complete book divided into digestible pages
- **Progressive Navigation** - Next/previous page controls with progress tracking
- **Chapter Overview** - Expandable navigation showing all chapters
- **Hierarchical Structure** - Organized using Payload's nested docs plugin
- **Visual Progress** - Progress bar showing reading completion

### Content Management
- **Rich Text Content** - Full Lexical editor support for complex formatting
- **Hero Images** - Custom artwork for each chapter page
- **SEO Optimized** - Complete meta information for search engines
- **Draft Preview** - Content review before publishing
- **Live Preview** - Real-time editing with SSR support

## Technology Stack

### Backend
- **[Payload CMS](https://payloadcms.com)** - Headless CMS with full TypeScript support
- **[PostgreSQL](https://postgresql.org)** - Production database (hosted at 74.208.87.243:5432)
- **[Node.js](https://nodejs.org)** - Runtime environment (v18.20.2+)
- **TypeScript** - Type-safe development

### Frontend  
- **[Next.js 14](https://nextjs.org)** - React framework with App Router
- **[React 18](https://reactjs.org)** - UI library
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com)** - Component library
- **[Heroicons](https://heroicons.com)** - Icon system

### Development Tools
- **[pnpm](https://pnpm.io)** - Fast, disk space efficient package manager
- **[TypeScript](https://typescriptlang.org)** - Static type checking
- **[ESLint](https://eslint.org)** - Code linting
- **[Prettier](https://prettier.io)** - Code formatting
- **[Playwright](https://playwright.dev)** - End-to-end testing

### Deployment & Hosting
- **[Vercel](https://vercel.com)** - Frontend deployment and hosting
- **[Docker](https://docker.com)** - Containerization support
- **PostgreSQL Cloud** - Database hosting

## Quick Start

### Prerequisites
- **Node.js** v18.20.2 or higher
- **pnpm** v9 or v10  
- **PostgreSQL** database access

### Installation

1. **Clone the repository:**
```bash
   git clone https://github.com/kendevco/wheredideveryonego.git
   cd wheredideveryonego
```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure environment:**
   ```bash
   cp test.env .env.local
   ```
   Update `.env.local` with your database credentials:
   ```env
   DATABASE_URI=postgresql://postgres:K3nD3v!host@74.208.87.243:5432/spaces_commerce
   PAYLOAD_SECRET=your-secret-key
   NEXT_PUBLIC_URL=http://localhost:3000
   ```

4. **Start development server:**
   ```bash
   pnpm dev
   ```

5. **Seed the database:**
   ```bash
   pnpm seed
   ```

6. **Access the platform:**
   - **Website:** http://localhost:3000
   - **Admin Panel:** http://localhost:3000/admin
   - **WDEG Book:** http://localhost:3000/wdeg-book

### Admin Access
After seeding, login with:
- **Ronald Courtney:** `billthecat1225@gmail.com` / `angelos!2025`

## Project Structure

### Collections
- **Pages** - All website pages including the 26 WDEG book chapters
- **Posts** - Blog posts and news content  
- **Media** - Images, documents, and other assets
- **Users** - Admin users and authentication
- **Categories** - Content organization and taxonomy

### Key Components
- **WDEGNavigation** - Book navigation with next/previous controls
- **RenderBlocks** - Dynamic content block rendering
- **AdminBar** - Content management toolbar
- **SEO Components** - Meta tags and search optimization

### Internationalization
- **Payload Localization** - Built-in i18n support
- **Fallback System** - English fallback for missing translations
- **URL Structure** - Language-specific routing
- **Content Management** - Per-locale content editing

## Content Architecture

### WDEG Book Pages
Each of the 26 book chapters includes:
- **Multilingual Content** - Available in all 9 supported languages
- **Rich Text Body** - Full Lexical editor content from source text files
- **Hero Images** - Custom artwork (page_001.png through page_026.png)
- **Navigation Blocks** - Integrated next/previous controls
- **SEO Metadata** - Title, description, and social sharing optimization
- **Hierarchical Structure** - Parent/child relationships for book organization

### Page Metadata Structure
```typescript
{
  pageNumber: 1,
  title: "Something's Wrong With The World",
  slug: "page-001", 
  description: "Opening chapter exploring the signs of our times...",
  image: "page_001.png",
  parent: "wdeg-book" // Root book page
}
```

## Development

### Working with Internationalization
The platform uses Payload's built-in localization:

```typescript
// payload.config.ts
localization: {
  locales: ['en', 'es', 'fr', 'de', 'it', 'pt', 'pl', 'ar', 'he'],
  defaultLocale: 'en',
  fallback: true,
}
```

### Adding New Languages
1. Add locale to `payload.config.ts`
2. Create content directory in `public/wdeg/{locale}/`
3. Add translation files (001.txt through 026.txt)
4. Run seed script to import content

### Content Updates
Book content is managed through:
- **Text Files** - Source content in `public/wdeg/{locale}/{pageNumber}.txt`
- **Seed Scripts** - Automated import via `src/endpoints/seed/wdeg-pages.ts`
- **Admin Panel** - Manual editing through Payload CMS interface

## Production Deployment

### Database Setup
The production database is hosted at:
- **Host:** 74.208.87.243:5432
- **Database:** spaces_commerce  
- **User:** postgres
- **Connection:** SSL preferred, 10s timeout

### Vercel Deployment
1. **Build the application:**
```bash
   pnpm build
   ```

2. **Deploy to Vercel:**
```bash
   vercel --prod
   ```

3. **Configure environment variables** in Vercel dashboard

### Docker Deployment
```bash
docker-compose up --build
```

## Contributing

This project represents a ministry effort to share prophetic truth and hope. Contributions should align with the book's biblical message and technical excellence.

### Development Guidelines
- Follow TypeScript best practices
- Maintain accessibility standards  
- Preserve multilingual functionality
- Test across all supported languages
- Respect the prophetic content integrity

## Ministry Purpose

"Where Did Everyone Go?" serves as more than a book—it's a beacon of hope in dark times. This platform ensures the message reaches people worldwide in their native languages, fulfilling the Great Commission through modern technology.

The book addresses:
- **Current World Events** - Understanding our times through biblical prophecy
- **The Rapture** - Hope for believers in Christ's return
- **Tribulation Period** - What lies ahead for those left behind  
- **Salvation Message** - The narrow gate and new life in Jesus
- **Eternal Hope** - The wedding of the Lamb and eternal promises

## Support

For technical issues or ministry inquiries:
- **GitHub Issues:** [Report bugs or request features](https://github.com/kendevco/wheredideveryonego/issues)
- **Email:** billthecat1225@gmail.com
- **Ministry Contact:** Through the website contact form

## License

This project is dedicated to sharing God's truth freely. The technical code is open source, while the book content remains under copyright for ministry purposes.

---

*"But of that day and hour no one knows, not even the angels of heaven, but My Father only." - Matthew 24:36*

**Where Did Everyone Go?** - A prophetic blueprint for understanding our times and finding hope in Christ.