#!/usr/bin/env node

/**
 * Generate seed files from current Payload content
 * This script reads your current posts and pages and creates new seed files
 */

import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function generateSeedFiles() {
  console.log('🔍 Generating seed files from current content...')

  const extractedDir = path.join(process.cwd(), 'extracted-content')
  const seedDir = path.join(process.cwd(), 'src', 'endpoints', 'seed')

  // Check if extracted content exists
  if (!fs.existsSync(extractedDir)) {
    console.error('❌ No extracted content found. Run extract-current-content.js first.')
    process.exit(1)
  }

  try {
    // Read the extracted data
    const postsData = JSON.parse(fs.readFileSync(path.join(extractedDir, 'posts-raw.json'), 'utf8'))
    const pagesData = JSON.parse(fs.readFileSync(path.join(extractedDir, 'pages-raw.json'), 'utf8'))
    const mediaData = JSON.parse(fs.readFileSync(path.join(extractedDir, 'media-raw.json'), 'utf8'))
    const categoriesData = JSON.parse(
      fs.readFileSync(path.join(extractedDir, 'categories-raw.json'), 'utf8'),
    )

    console.log(`📊 Processing:`)
    console.log(`   - ${postsData.docs?.length || 0} posts`)
    console.log(`   - ${pagesData.docs?.length || 0} pages`)
    console.log(`   - ${mediaData.docs?.length || 0} media items`)
    console.log(`   - ${categoriesData.docs?.length || 0} categories`)

    // Create backup of existing seed files
    const backupDir = path.join(process.cwd(), 'seed-backup-' + Date.now())
    if (fs.existsSync(seedDir)) {
      console.log('📦 Creating backup of existing seed files...')
      fs.cpSync(seedDir, backupDir, { recursive: true })
      console.log(`   Backup saved to: ${backupDir}`)
    }

    // Generate post seed files
    console.log('📝 Generating post seed files...')
    if (postsData.docs && postsData.docs.length > 0) {
      postsData.docs.forEach((post, index) => {
        const postContent = generatePostSeedContent(post, index + 1)
        const filename = `post-${index + 1}.ts`
        fs.writeFileSync(path.join(seedDir, filename), postContent, 'utf8')
        console.log(`   ✅ Generated ${filename} - "${post.title}"`)
      })
    }

    // Generate page seed files
    console.log('📄 Generating page seed files...')
    if (pagesData.docs && pagesData.docs.length > 0) {
      pagesData.docs.forEach((page) => {
        const pageContent = generatePageSeedContent(page)
        const filename = `${page.slug}.ts`
        fs.writeFileSync(path.join(seedDir, filename), pageContent, 'utf8')
        console.log(`   ✅ Generated ${filename} - "${page.title}"`)
      })
    }

    // Generate media reference file
    console.log('🖼️ Generating media reference file...')
    const mediaContent = generateMediaReference(mediaData.docs || [])
    fs.writeFileSync(path.join(seedDir, 'media-references.ts'), mediaContent, 'utf8')

    // Generate categories seed file
    console.log('📂 Generating categories seed file...')
    const categoriesContent = generateCategoriesSeed(categoriesData.docs || [])
    fs.writeFileSync(path.join(seedDir, 'categories-seed.ts'), categoriesContent, 'utf8')

    // Generate updated index file
    console.log('📋 Generating updated index file...')
    const indexContent = generateUpdatedIndex(postsData.docs || [], pagesData.docs || [])
    fs.writeFileSync(path.join(seedDir, 'index-new.ts'), indexContent, 'utf8')

    console.log('✅ Seed file generation complete!')
    console.log('\n📋 Next steps:')
    console.log('1. Review the generated files in src/endpoints/seed/')
    console.log('2. Replace the old index.ts with index-new.ts')
    console.log('3. Update any media references to use your uploaded images')
    console.log('4. Test the seed process')
    console.log(`5. If needed, restore from backup: ${backupDir}`)
  } catch (error) {
    console.error('❌ Error generating seed files:', error)
    process.exit(1)
  }
}

function generatePostSeedContent(post, index) {
  // Clean up the content to remove database IDs and replace with placeholders
  const cleanContent = cleanContentForSeed(post.content)
  const cleanMeta = cleanMetaForSeed(post.meta)

  // Convert to string and replace placeholders with actual code
  let contentStr = JSON.stringify(cleanContent, null, 2)
  contentStr = contentStr.replace(/"MEDIA_ID_PLACEHOLDER"/g, 'heroImage.id')

  let metaStr = JSON.stringify(cleanMeta, null, 2)
  metaStr = metaStr.replace(/"MEDIA_ID_PLACEHOLDER"/g, 'heroImage.id')

  return `import type { Media, User } from '@/payload-types'

export type PostArgs = {
  heroImage: Media | null
  blockImage?: Media | null
  author: User | null
}

export const post${index}: (args: PostArgs) => any = ({ heroImage, blockImage, author }) => {
  return {
    slug: '${post.slug}',
    _status: 'published',
    authors: [author],
    content: ${contentStr},
    heroImage: heroImage.id,
    meta: ${metaStr},
    relatedPosts: [], // this is populated by the seed script
    title: ${JSON.stringify(post.title)},
    categories: [], // this will be populated by the seed script
    publishedAt: ${post.publishedAt ? `'${post.publishedAt}'` : 'new Date().toISOString()'},
  }
}
`
}

function generatePageSeedContent(page) {
  const cleanHero = cleanContentForSeed(page.hero)
  const cleanLayout = cleanLayoutForSeed(page.layout)
  const cleanMeta = cleanMetaForSeed(page.meta)

  const argTypeName = capitalizeFirstLetter(page.slug.replace(/-/g, ''))

  // Convert to string and replace placeholders with actual code
  let heroStr = JSON.stringify(cleanHero, null, 2)
  heroStr = heroStr.replace(/"MEDIA_ID_PLACEHOLDER"/g, 'heroImage?.id')

  let layoutStr = JSON.stringify(cleanLayout, null, 2)
  layoutStr = layoutStr.replace(/"MEDIA_ID_PLACEHOLDER"/g, 'metaImage?.id || heroImage?.id')

  let metaStr = JSON.stringify(cleanMeta, null, 2)
  metaStr = metaStr.replace(/"MEDIA_ID_PLACEHOLDER"/g, 'metaImage?.id || heroImage?.id')

  return `import type { Media } from '@/payload-types'

type ${argTypeName}Args = {
  heroImage?: Media | null
  metaImage?: Media | null
  contactForm?: any
}

export const ${page.slug.replace(/-/g, '')}: (args: ${argTypeName}Args) => any = ({ heroImage, metaImage, contactForm }) => {
  return {
    slug: '${page.slug}',
    _status: 'published',
    hero: ${heroStr},
    layout: ${layoutStr},
    meta: ${metaStr},
    title: ${JSON.stringify(page.title)},
    publishedAt: ${page.publishedAt ? `'${page.publishedAt}'` : 'new Date().toISOString()'},
  }
}
`
}

function generateMediaReference(mediaItems) {
  const mediaMap = mediaItems.reduce((acc, item) => {
    acc[item.id] = {
      filename: item.filename,
      alt: item.alt || '',
      mimeType: item.mimeType,
      url: item.url,
    }
    return acc
  }, {})

  return `// Media reference mapping for seed data
// This maps database IDs to media file information
export const mediaMapping = ${JSON.stringify(mediaMap, null, 2)}

// Helper function to find media by filename
export function findMediaByFilename(filename: string) {
  return Object.values(mediaMapping).find(media => media.filename === filename)
}
`
}

function generateCategoriesSeed(categories) {
  const cleanCategories = categories.map((cat) => ({
    title: cat.title,
    breadcrumbs: cat.breadcrumbs || [],
  }))

  return `export const categoriesData = ${JSON.stringify(cleanCategories, null, 2)}
`
}

function generateUpdatedIndex(posts, pages) {
  const postImports = posts
    .map((_, index) => `import { post${index + 1} } from './post-${index + 1}'`)
    .join('\n')
  const pageImports = pages
    .map((page) => {
      const cleanSlug = page.slug.replace(/-/g, '')
      return `import { ${cleanSlug} } from './${page.slug}'`
    })
    .join('\n')

  const postList = posts.map((_, index) => `post${index + 1}`).join(', ')
  const pageList = pages.map((page) => page.slug.replace(/-/g, '')).join(', ')

  return `import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'
import fs from 'fs'
import path from 'path'

// Import generated post seed data
${postImports}

// Import generated page seed data  
${pageImports}

// Import other seed data
import { categoriesData } from './categories-seed'
import { contactForm as contactFormData } from './contact-form'

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
  payload.logger.info('Seeding database with current content...')

  // Clear existing data (keep existing logic)
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

  // Create admin users (keep existing logic)
  payload.logger.info(\`— Seeding WDEG admin users...\`)
  
  let kennethAdmin
  try {
    kennethAdmin = await payload.create({
      collection: 'users',
      data: {
        name: 'Kenneth Courtney',
        email: 'kenneth.courtney@gmail.com',
        password: 'angelos!2025',
      },
    })
    payload.logger.info('✅ Kenneth Courtney admin created')
  } catch (error) {
    const existingKenneth = await payload.find({
      collection: 'users',
      where: { email: { equals: 'kenneth.courtney@gmail.com' } },
      limit: 1,
    })
    if (existingKenneth.docs.length > 0) {
      kennethAdmin = existingKenneth.docs[0]
      payload.logger.info('✅ Kenneth Courtney admin already exists')
    }
  }

  let ronaldAdmin
  try {
    ronaldAdmin = await payload.create({
      collection: 'users',
      data: {
        name: 'Ronald Courtney',
        email: 'billthecat1225@gmail.com',
        password: 'angelos!2025',
      },
    })
    payload.logger.info('✅ Ronald Courtney admin created')
  } catch (error) {
    const existingRonald = await payload.find({
      collection: 'users',
      where: { email: { equals: 'billthecat1225@gmail.com' } },
      limit: 1,
    })
    if (existingRonald.docs.length > 0) {
      ronaldAdmin = existingRonald.docs[0]
      payload.logger.info('✅ Ronald Courtney admin already exists')
    }
  }

  // Seed media (keep existing media upload logic)
  payload.logger.info(\`— Seeding media...\`)
  
  // Upload WDEG hero image
  let wdegHeroImage = null
  try {
    const wdegHeroPath = path.join(process.cwd(), 'public', 'wdeg', 'wdeg.jpg')
    if (fs.existsSync(wdegHeroPath)) {
      const existingWdegHero = await payload.find({
        collection: 'media',
        where: { filename: { equals: 'wdeg.jpg' } },
        limit: 1,
      })

      if (existingWdegHero.docs.length === 0) {
        const wdegBuffer = fs.readFileSync(wdegHeroPath)
        wdegHeroImage = await payload.create({
          collection: 'media',
          data: {
            alt: 'Where Did Everyone Go? - Main Hero Background',
          },
          file: {
            name: 'wdeg.jpg',
            data: wdegBuffer,
            mimetype: 'image/jpeg',
            size: wdegBuffer.length,
          },
        })
        payload.logger.info('✅ Uploaded WDEG hero image')
      } else {
        wdegHeroImage = existingWdegHero.docs[0]
        payload.logger.info('✅ WDEG hero image already exists')
      }
    }
  } catch (error) {
    payload.logger.warn('⚠️ Failed to upload WDEG hero image:', error)
  }

  // Upload all WDEG book images (keep existing logic)
  payload.logger.info(\`— Uploading WDEG book images...\`)
  let defaultImage = wdegHeroImage
  try {
    const wdegImagesDir = path.join(process.cwd(), 'public', 'wdeg', 'images')
    if (fs.existsSync(wdegImagesDir)) {
      const imageFiles = fs
        .readdirSync(wdegImagesDir)
        .filter((file) => file.match(/\\.(jpg|jpeg|png|gif|webp)$/i))

      let uploadedCount = 0
      let skippedCount = 0

      for (const imageFile of imageFiles) {
        try {
          const existingImage = await payload.find({
            collection: 'media',
            where: { filename: { equals: imageFile } },
            limit: 1,
          })

          if (existingImage.docs.length === 0) {
            const imagePath = path.join(wdegImagesDir, imageFile)
            const imageBuffer = fs.readFileSync(imagePath)

            const uploadedImage = await payload.create({
              collection: 'media',
              data: {
                alt: \`WDEG Book - \${imageFile.replace(/\\.(jpg|jpeg|png|gif|webp)$/i, '').replace(/[_-]/g, ' ')}\`,
              },
              file: {
                name: imageFile,
                data: imageBuffer,
                mimetype: \`image/\${path.extname(imageFile).slice(1).toLowerCase()}\`,
                size: imageBuffer.length,
              },
            })
            
            if (!defaultImage) defaultImage = uploadedImage
            uploadedCount++
          } else {
            if (!defaultImage) defaultImage = existingImage.docs[0]
            skippedCount++
          }
        } catch (error) {
          payload.logger.warn(\`⚠️ Failed to upload \${imageFile}:\`, error)
        }
      }

      payload.logger.info(
        \`✅ WDEG images: \${uploadedCount} uploaded, \${skippedCount} already existed\`,
      )
    }
  } catch (error) {
    payload.logger.warn('⚠️ Failed to process WDEG images:', error)
  }

  // Seed categories
  payload.logger.info(\`— Seeding categories...\`)
  const createdCategories = []
  for (const categoryData of categoriesData) {
    const category = await payload.create({
      collection: 'categories',
      data: categoryData,
    })
    createdCategories.push(category)
  }

  // Seed forms
  payload.logger.info(\`— Seeding forms...\`)
  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

  // Seed posts
  payload.logger.info(\`— Seeding posts...\`)
  const postFunctions = [${postList}]
  const createdPosts = []
  
  for (const postFunction of postFunctions) {
    const post = await payload.create({
      collection: 'posts',
      depth: 0,
      context: {
        disableRevalidate: true,
      },
      data: postFunction({ 
        heroImage: defaultImage || wdegHeroImage, 
        blockImage: defaultImage || wdegHeroImage,
        author: ronaldAdmin || kennethAdmin 
      }),
    })
    createdPosts.push(post)
  }

  // Update posts with related posts
  for (let i = 0; i < createdPosts.length; i++) {
    const relatedPosts = createdPosts.filter((_, index) => index !== i).slice(0, 2)
    await payload.update({
      id: createdPosts[i].id,
      collection: 'posts',
      data: {
        relatedPosts: relatedPosts.map(p => p.id),
      },
    })
  }

  // Seed pages
  payload.logger.info(\`— Seeding pages...\`)
  const pageFunctions = [${pageList}]
  const createdPages = []
  
  for (const pageFunction of pageFunctions) {
    const page = await payload.create({
      collection: 'pages',
      depth: 0,
      data: pageFunction({ 
        heroImage: wdegHeroImage || defaultImage,
        metaImage: defaultImage || wdegHeroImage,
        contactForm: contactForm
      }),
    })
    createdPages.push(page)
  }

  // Update globals (keep existing logic)
  payload.logger.info(\`— Seeding globals...\`)
  const homePageDoc = createdPages.find(p => p.slug === 'home')
  const aboutPageDoc = createdPages.find(p => p.slug === 'about')
  const communityPageDoc = createdPages.find(p => p.slug === 'community')
  const contactPageDoc = createdPages.find(p => p.slug === 'contact')
  const privacyPageDoc = createdPages.find(p => p.slug === 'privacy-policy')
  const termsPageDoc = createdPages.find(p => p.slug === 'terms-of-service')

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Book',
              url: '/book',
            },
          },
          aboutPageDoc && {
            link: {
              type: 'reference',
              label: 'About',
              reference: {
                relationTo: 'pages',
                value: aboutPageDoc.id,
              },
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Blog',
              url: '/posts',
            },
          },
          communityPageDoc && {
            link: {
              type: 'reference',
              label: 'Community',
              reference: {
                relationTo: 'pages',
                value: communityPageDoc.id,
              },
            },
          },
          contactPageDoc && {
            link: {
              type: 'reference',
              label: 'Contact',
              reference: {
                relationTo: 'pages',
                value: contactPageDoc.id,
              },
            },
          },
        ].filter(Boolean),
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        navItems: [
          privacyPageDoc && {
            link: {
              type: 'reference',
              label: 'Privacy Policy',
              reference: {
                relationTo: 'pages',
                value: privacyPageDoc.id,
              },
            },
          },
          termsPageDoc && {
            link: {
              type: 'reference',
              label: 'Terms of Service',
              reference: {
                relationTo: 'pages',
                value: termsPageDoc.id,
              },
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Admin',
              url: '/admin',
            },
          },
        ].filter(Boolean),
      },
    }),
  ])

  payload.logger.info('Seeded WDEG database successfully with current content!')
}

// Helper function for fetching files (keep existing)
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

// Helper functions
function cleanContentForSeed(content) {
  if (!content) return content

  // Deep clone and clean the content
  const cleanedContent = JSON.parse(JSON.stringify(content))

  // Recursively replace media IDs and fix problematic structures
  function replaceMediaIds(obj) {
    if (typeof obj === 'string' && /^[a-f0-9]{24}$/.test(obj)) {
      return 'MEDIA_ID_PLACEHOLDER'
    }
    if (Array.isArray(obj)) {
      return obj.map(replaceMediaIds)
    }
    if (obj && typeof obj === 'object') {
      const result = {}
      for (const [key, value] of Object.entries(obj)) {
        // Fix common problematic fields
        if (key === 'label' && value === null) {
          result[key] = ''
        } else if (key === 'newTab' && value === null) {
          result[key] = false
        } else if (key === 'id' && typeof value === 'number') {
          // Skip numeric IDs that cause type issues
          continue
        } else {
          result[key] = replaceMediaIds(value)
        }
      }
      return result
    }
    return obj
  }

  return replaceMediaIds(cleanedContent)
}

function cleanLayoutForSeed(layout) {
  if (!layout || !Array.isArray(layout)) return layout

  return layout.map((block) => {
    // Use the same cleaning function as content
    return cleanContentForSeed(block)
  })
}

function cleanMetaForSeed(meta) {
  if (!meta) return meta

  // Use the same cleaning function as content
  return cleanContentForSeed(meta)
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// Run the generation
generateSeedFiles()
