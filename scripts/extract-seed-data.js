#!/usr/bin/env node

/**
 * Extract current posts and pages from the database to regenerate seed data
 * This script reads the current content from Payload collections and generates
 * new seed files that can be used to repopulate the database.
 */

import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// Import Payload
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function extractSeedData() {
  console.log('🔍 Extracting current seed data from database...')

  try {
    // Initialize Payload
    const payload = await getPayload({ config })

    console.log('📖 Extracting posts...')
    const posts = await payload.find({
      collection: 'posts',
      depth: 2, // Get related data
      limit: 100,
      sort: 'createdAt',
    })

    console.log('📄 Extracting pages...')
    const pages = await payload.find({
      collection: 'pages',
      depth: 2, // Get related data
      limit: 100,
      sort: 'createdAt',
    })

    console.log('🖼️ Extracting media...')
    const media = await payload.find({
      collection: 'media',
      depth: 1,
      limit: 500,
      sort: 'createdAt',
    })

    console.log('📂 Extracting categories...')
    const categories = await payload.find({
      collection: 'categories',
      depth: 1,
      limit: 100,
      sort: 'createdAt',
    })

    console.log('👥 Extracting users...')
    const users = await payload.find({
      collection: 'users',
      depth: 1,
      limit: 100,
      sort: 'createdAt',
    })

    console.log('📝 Extracting forms...')
    const forms = await payload.find({
      collection: 'forms',
      depth: 1,
      limit: 100,
      sort: 'createdAt',
    })

    // Create output directory
    const outputDir = path.join(process.cwd(), 'extracted-seed-data')
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Generate seed files for posts
    console.log('📝 Generating post seed files...')
    posts.docs.forEach((post, index) => {
      const postData = generatePostSeedFile(post, index + 1)
      const filename = `post-${index + 1}.ts`
      fs.writeFileSync(path.join(outputDir, filename), postData, 'utf8')
      console.log(`   ✅ Generated ${filename}`)
    })

    // Generate seed files for pages
    console.log('📄 Generating page seed files...')
    pages.docs.forEach((page, index) => {
      const pageData = generatePageSeedFile(page)
      const filename = `${page.slug}.ts`
      fs.writeFileSync(path.join(outputDir, filename), pageData, 'utf8')
      console.log(`   ✅ Generated ${filename}`)
    })

    // Generate media mapping file
    console.log('🖼️ Generating media mapping...')
    const mediaMapping = generateMediaMapping(media.docs)
    fs.writeFileSync(
      path.join(outputDir, 'media-mapping.json'),
      JSON.stringify(mediaMapping, null, 2),
      'utf8',
    )

    // Generate categories seed file
    console.log('📂 Generating categories seed...')
    const categoriesData = generateCategoriesSeedFile(categories.docs)
    fs.writeFileSync(path.join(outputDir, 'categories.ts'), categoriesData, 'utf8')

    // Generate users seed file
    console.log('👥 Generating users seed...')
    const usersData = generateUsersSeedFile(users.docs)
    fs.writeFileSync(path.join(outputDir, 'users.ts'), usersData, 'utf8')

    // Generate forms seed file
    console.log('📝 Generating forms seed...')
    const formsData = generateFormsSeedFile(forms.docs)
    fs.writeFileSync(path.join(outputDir, 'forms.ts'), formsData, 'utf8')

    // Generate updated index file
    console.log('📋 Generating updated index file...')
    const indexData = generateUpdatedIndexFile(posts.docs, pages.docs)
    fs.writeFileSync(path.join(outputDir, 'index.ts'), indexData, 'utf8')

    console.log('✅ Seed data extraction complete!')
    console.log(`📁 Files saved to: ${outputDir}`)
    console.log('\n📋 Next steps:')
    console.log('1. Review the generated files')
    console.log('2. Copy the files to src/endpoints/seed/')
    console.log('3. Update the main seed index.ts file')
    console.log('4. Test the seed process')
  } catch (error) {
    console.error('❌ Error extracting seed data:', error)
    process.exit(1)
  }
}

function generatePostSeedFile(post, index) {
  const sanitizedContent = JSON.stringify(post.content, null, 2)
  const sanitizedMeta = JSON.stringify(post.meta, null, 2)

  return `import type { Media, User } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

export type PostArgs = {
  heroImage: Media
  blockImage?: Media
  author: User
}

export const post${index}: (args: PostArgs) => RequiredDataFromCollectionSlug<'posts'> = ({
  heroImage,
  blockImage,
  author,
}) => {
  return {
    slug: '${post.slug}',
    _status: 'published',
    authors: [author],
    content: ${sanitizedContent.replace(/"([a-f0-9]{24})"/g, 'blockImage?.id || heroImage.id')},
    heroImage: heroImage.id,
    meta: ${sanitizedMeta.replace(/"([a-f0-9]{24})"/g, 'heroImage.id')},
    relatedPosts: [], // this is populated by the seed script
    title: ${JSON.stringify(post.title)},
    categories: [], // this will be populated by the seed script
    publishedAt: ${post.publishedAt ? `'${post.publishedAt}'` : 'new Date().toISOString()'},
  }
}
`
}

function generatePageSeedFile(page) {
  const sanitizedHero = JSON.stringify(page.hero, null, 2)
  const sanitizedLayout = JSON.stringify(page.layout, null, 2)
  const sanitizedMeta = JSON.stringify(page.meta, null, 2)

  return `import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type ${capitalizeFirstLetter(page.slug)}Args = {
  heroImage?: Media
  metaImage?: Media
  contactForm?: any
}

export const ${page.slug}: (args: ${capitalizeFirstLetter(page.slug)}Args) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  metaImage,
  contactForm,
}) => {
  return {
    slug: '${page.slug}',
    _status: 'published',
    hero: ${sanitizedHero.replace(/"([a-f0-9]{24})"/g, 'heroImage?.id')},
    layout: ${sanitizedLayout.replace(/"([a-f0-9]{24})"/g, 'metaImage?.id || heroImage?.id')},
    meta: ${sanitizedMeta.replace(/"([a-f0-9]{24})"/g, 'metaImage?.id || heroImage?.id')},
    title: ${JSON.stringify(page.title)},
    publishedAt: ${page.publishedAt ? `'${page.publishedAt}'` : 'new Date().toISOString()'},
  }
}
`
}

function generateMediaMapping(mediaItems) {
  return mediaItems.reduce((mapping, item) => {
    mapping[item.id] = {
      filename: item.filename,
      alt: item.alt,
      mimeType: item.mimeType,
      filesize: item.filesize,
      width: item.width,
      height: item.height,
      url: item.url,
    }
    return mapping
  }, {})
}

function generateCategoriesSeedFile(categories) {
  const categoriesData = categories.map((cat) => ({
    title: cat.title,
    breadcrumbs: cat.breadcrumbs || [],
  }))

  return `export const categories = ${JSON.stringify(categoriesData, null, 2)}
`
}

function generateUsersSeedFile(users) {
  // Don't include sensitive data like passwords
  const usersData = users.map((user) => ({
    name: user.name,
    email: user.email,
    // Note: passwords will need to be set separately for security
  }))

  return `export const users = ${JSON.stringify(usersData, null, 2)}

// Note: User passwords are not included for security reasons.
// They should be set during the seed process.
`
}

function generateFormsSeedFile(forms) {
  const formsData = forms.map((form) => ({
    title: form.title,
    fields: form.fields,
    submitButtonLabel: form.submitButtonLabel,
    confirmationType: form.confirmationType,
    confirmationMessage: form.confirmationMessage,
  }))

  return `export const forms = ${JSON.stringify(formsData, null, 2)}
`
}

function generateUpdatedIndexFile(posts, pages) {
  const postImports = posts
    .map((_, index) => `import { post${index + 1} } from './post-${index + 1}'`)
    .join('\n')
  const pageImports = pages
    .map((page) => `import { ${page.slug} } from './${page.slug}'`)
    .join('\n')

  return `import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'
import fs from 'fs'
import path from 'path'

// Import generated seed data
${postImports}
${pageImports}
import { categories } from './categories'
import { users } from './users'
import { forms } from './forms'

// Import existing seed data that doesn't change
import { contactForm as contactFormData } from './contact-form'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
]
const globals: GlobalSlug[] = ['header', 'footer']

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database with extracted data...')

  // Clear existing data
  payload.logger.info(\`— Clearing collections and globals...\`)
  
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  // Seed users first
  payload.logger.info(\`— Seeding users...\`)
  const createdUsers = []
  for (const userData of users) {
    try {
      const user = await payload.create({
        collection: 'users',
        data: {
          ...userData,
          password: 'defaultPassword123!', // Set a default password
        },
      })
      createdUsers.push(user)
    } catch (error) {
      payload.logger.warn(\`Failed to create user \${userData.email}:\`, error)
    }
  }

  // Seed categories
  payload.logger.info(\`— Seeding categories...\`)
  const createdCategories = []
  for (const categoryData of categories) {
    const category = await payload.create({
      collection: 'categories',
      data: categoryData,
    })
    createdCategories.push(category)
  }

  // Seed media (reuse existing media upload logic)
  payload.logger.info(\`— Seeding media...\`)
  // ... (include existing media upload logic from original seed file)

  // Seed forms
  payload.logger.info(\`— Seeding forms...\`)
  const createdForms = []
  for (const formData of forms) {
    const form = await payload.create({
      collection: 'forms',
      data: formData,
    })
    createdForms.push(form)
  }

  // Seed posts
  payload.logger.info(\`— Seeding posts...\`)
  const createdPosts = []
  const postFunctions = [${posts.map((_, index) => `post${index + 1}`).join(', ')}]
  
  for (const postFunction of postFunctions) {
    const post = await payload.create({
      collection: 'posts',
      depth: 0,
      context: {
        disableRevalidate: true,
      },
      data: postFunction({ 
        heroImage: /* get from media */, 
        author: createdUsers[0] || createdUsers[0] 
      }),
    })
    createdPosts.push(post)
  }

  // Seed pages
  payload.logger.info(\`— Seeding pages...\`)
  const pageFunctions = [${pages.map((page) => page.slug).join(', ')}]
  
  for (const pageFunction of pageFunctions) {
    await payload.create({
      collection: 'pages',
      depth: 0,
      data: pageFunction({ 
        heroImage: /* get from media */,
        metaImage: /* get from media */,
        contactForm: createdForms[0]
      }),
    })
  }

  payload.logger.info('Seeded database successfully with extracted data!')
}

// Include existing helper functions
async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(\`Failed to fetch file from \${url}, status: \${res.status}\`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || \`file-\${Date.now()}\`,
    data: Buffer.from(data),
    mimetype: \`image/\${url.split('.').pop()}\`,
    size: data.byteLength,
  }
}
`
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// Run the extraction
extractSeedData()
