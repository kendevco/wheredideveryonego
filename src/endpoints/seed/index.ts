import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'
import fs from 'fs'
import path from 'path'

// Import generated post seed data
import { post1 } from './posts/post-1'
import { post2 } from './posts/post-2'
import { post3 } from './posts/post-3'

// Import generated page seed data
import { termsofservice } from './pages/terms-of-service'
import { privacypolicy } from './pages/privacy-policy'
import { about } from './pages/about'
import { community } from './pages/community'
import { contact } from './pages/contact'
import { home } from './pages/home'

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
  reset = false,
}: {
  payload: Payload
  req: PayloadRequest
  reset?: boolean
}): Promise<void> => {
  payload.logger.info(
    `🌱 Seeding database ${reset ? '(RESET MODE - will clear all data)' : '(resilient mode - will update existing)'}...`,
  )

  // Only clear data if reset flag is true
  if (reset) {
    payload.logger.info(`— Clearing collections and globals...`)

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
    payload.logger.info('✅ All data cleared')
  }

  // Create or find admin users
  payload.logger.info(`— Setting up admin users...`)

  let kennethAdmin
  try {
    const existingKenneth = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: 'kenneth.courtney@gmail.com',
        },
      },
      limit: 1,
    })

    if (existingKenneth.docs.length > 0) {
      kennethAdmin = existingKenneth.docs[0]
      payload.logger.info('✓ Found existing user: Kenneth Courtney')
    } else {
      kennethAdmin = await payload.create({
        collection: 'users',
        data: {
          name: 'Kenneth Courtney',
          email: 'kenneth.courtney@gmail.com',
          password: 'angelos!2025',
        },
      })
      payload.logger.info('✓ Created user: Kenneth Courtney')
    }
  } catch (error) {
    payload.logger.error('Error with Kenneth admin:', error)
  }

  let timAdmin
  try {
    const existingTim = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: 'tima@angelos.us',
        },
      },
      limit: 1,
    })

    if (existingTim.docs.length > 0) {
      timAdmin = existingTim.docs[0]
      payload.logger.info('✓ Found existing user: Tim Anderson')
    } else {
      timAdmin = await payload.create({
        collection: 'users',
        data: {
          name: 'Tim Anderson',
          email: 'tima@angelos.us',
          password: 'angelos!2025',
        },
      })
      payload.logger.info('✓ Created user: Tim Anderson')
    }
  } catch (error) {
    payload.logger.error('Error with Tim admin:', error)
  }

  // Create or find categories
  payload.logger.info(`— Setting up categories...`)
  const createdCategories = []

  for (const categoryData of categoriesData) {
    try {
      const existing = await payload.find({
        collection: 'categories',
        where: {
          title: {
            equals: categoryData.title,
          },
        },
        limit: 1,
      })

      let category
      if (existing.docs.length > 0) {
        category = existing.docs[0]
        payload.logger.info(`✓ Found existing category: ${categoryData.title}`)
      } else {
        category = await payload.create({
          collection: 'categories',
          data: categoryData,
        })
        payload.logger.info(`✓ Created category: ${categoryData.title}`)
      }
      createdCategories.push(category)
    } catch (error) {
      payload.logger.error(`Error with category ${categoryData.title}:`, error)
    }
  }

  // Create or find media
  payload.logger.info(`— Setting up media...`)

  const mediaDir = path.join(process.cwd(), 'public/media')
  let wdegHeroImage = null
  let defaultImage = null
  let post1Image = null
  let post2Image = null
  let post3Image = null

  // Helper function to find or create media
  const findOrCreateMedia = async (filename: string, altText: string) => {
    try {
      // Check if media already exists
      const existing = await payload.find({
        collection: 'media',
        where: {
          filename: {
            equals: filename,
          },
        },
        limit: 1,
        depth: 0,
      })

      if (existing.docs.length > 0) {
        payload.logger.info(`✓ Found existing media: ${filename}`)
        return existing.docs[0]
      }

      // Create new media
      const filePath = path.join(mediaDir, filename)

      if (!fs.existsSync(filePath)) {
        payload.logger.warn(`⚠️  File not found: ${filePath}`)
        return null
      }

      const media = await payload.create({
        collection: 'media',
        data: {
          alt: altText,
        },
        file: {
          data: fs.readFileSync(filePath),
          mimetype: 'image/webp',
          name: filename,
          size: fs.statSync(filePath).size,
        } as File,
      })

      payload.logger.info(`✓ Created media: ${filename}`)
      return media
    } catch (error) {
      payload.logger.error(`Error with media ${filename}:`, error)
      return null
    }
  }

  // Process all media files
  wdegHeroImage = await findOrCreateMedia(
    'image-hero1.webp',
    'Where Did Everyone Go? - Main Hero Background',
  )
  defaultImage = wdegHeroImage // Use hero as default
  post1Image = await findOrCreateMedia('image-post1.webp', 'Time for Some Good News!')
  post2Image = await findOrCreateMedia('image-post2.webp', 'The Book Title Tells It All')
  post3Image = await findOrCreateMedia('image-post3.webp', 'You Have Questions? Here Are Answers!')

  // Create or find contact form
  payload.logger.info(`— Setting up forms...`)

  let contactForm = null
  try {
    const existingForm = await payload.find({
      collection: 'forms',
      where: {
        title: {
          equals: 'Contact Form',
        },
      },
      limit: 1,
    })

    if (existingForm.docs.length > 0) {
      contactForm = existingForm.docs[0]
      payload.logger.info('✓ Found existing contact form')
    } else {
      contactForm = await payload.create({
        collection: 'forms',
        data: contactFormData,
      })
      payload.logger.info('✓ Created contact form')
    }
  } catch (error) {
    payload.logger.error('Error with contact form:', error)
  }

  // Create or update posts
  payload.logger.info(`— Setting up posts...`)

  const postFunctions = [
    {
      func: post1,
      slug: 'time-for-good-news',
      name: 'Time for Some Good News!',
      image: post1Image,
      category: createdCategories[0],
    },
    {
      func: post2,
      slug: 'mystery-of-mass-disappearance',
      name: 'The Book Title Tells It All',
      image: post2Image,
      category: createdCategories[0],
    },
    {
      func: post3,
      slug: 'something-wrong-with-the-world',
      name: 'You Have Questions? Here Are Answers!',
      image: post3Image,
      category: createdCategories[0],
    },
  ]

  const createdPosts = []

  for (const { func, slug, name, image, category } of postFunctions) {
    try {
      const existing = await payload.find({
        collection: 'posts',
        where: {
          slug: {
            equals: slug,
          },
        },
        limit: 1,
      })

      const postData = func({
        heroImage: image || defaultImage || null,
        author: kennethAdmin || null,
      })

      // Add categories after creation
      if (category) {
        postData.categories = [category.id]
      }

      let post
      if (existing.docs.length > 0) {
        post = await payload.update({
          collection: 'posts',
          id: existing.docs[0].id,
          data: postData,
        })
        payload.logger.info(`✓ Updated post: ${name}`)
      } else {
        post = await payload.create({
          collection: 'posts',
          depth: 0,
          data: postData,
        })
        payload.logger.info(`✓ Created post: ${name}`)
      }

      createdPosts.push(post)
    } catch (error) {
      payload.logger.error(`Error with post ${name}:`)
      if (error instanceof Error) {
        payload.logger.error(error.message)
        if ('data' in error) {
          payload.logger.error('Validation errors:', JSON.stringify((error as any).data, null, 2))
        }
      } else {
        payload.logger.error(error)
      }
    }
  }

  // Create or update pages
  payload.logger.info(`— Setting up pages...`)
  payload.logger.info(`Media status: hero=${wdegHeroImage?.id}, form=${contactForm?.id}`)

  const pageFunctions = [
    { func: termsofservice, slug: 'terms-of-service', name: 'Terms of Service' },
    { func: privacypolicy, slug: 'privacy-policy', name: 'Privacy Policy' },
    { func: about, slug: 'about', name: 'About' },
    { func: community, slug: 'community', name: 'Community' },
    { func: contact, slug: 'contact', name: 'Contact' },
    { func: home, slug: 'home', name: 'Home' },
  ]

  const createdPages = []

  for (const { func, slug, name } of pageFunctions) {
    try {
      const existing = await payload.find({
        collection: 'pages',
        where: {
          slug: {
            equals: slug,
          },
        },
        limit: 1,
      })

      const pageData = func({
        heroImage: (wdegHeroImage || defaultImage) as any,
        metaImage: (wdegHeroImage || defaultImage) as any,
        contactForm: contactForm,
      })

      let page
      if (existing.docs.length > 0) {
        page = await payload.update({
          collection: 'pages',
          id: existing.docs[0].id,
          data: pageData,
        })
        payload.logger.info(`✓ Updated page: ${name}`)
      } else {
        page = await payload.create({
          collection: 'pages',
          depth: 0,
          data: pageData,
        })
        payload.logger.info(`✓ Created page: ${name}`)
      }

      createdPages.push(page)
    } catch (error) {
      payload.logger.error(`Error with page ${name}:`)
      if (error instanceof Error) {
        payload.logger.error(error.message)
        if ('data' in error) {
          payload.logger.error('Validation errors:', JSON.stringify((error as any).data, null, 2))
        }
      } else {
        payload.logger.error(error)
      }
    }
  }

  // Update globals
  payload.logger.info(`— Updating globals...`)

  const homePageDoc = createdPages.find((p) => p.slug === 'home')
  const aboutPageDoc = createdPages.find((p) => p.slug === 'about')
  const communityPageDoc = createdPages.find((p) => p.slug === 'community')
  const contactPageDoc = createdPages.find((p) => p.slug === 'contact')
  const privacyPageDoc = createdPages.find((p) => p.slug === 'privacy-policy')
  const termsPageDoc = createdPages.find((p) => p.slug === 'terms-of-service')

  try {
    await payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            link: {
              type: 'reference',
              label: 'Home',
              reference: {
                relationTo: 'pages',
                value: homePageDoc?.id,
              },
            },
          },
          {
            link: {
              type: 'reference',
              label: 'About',
              reference: {
                relationTo: 'pages',
                value: aboutPageDoc?.id,
              },
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Community',
              reference: {
                relationTo: 'pages',
                value: communityPageDoc?.id,
              },
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Contact',
              reference: {
                relationTo: 'pages',
                value: contactPageDoc?.id,
              },
            },
          },
        ],
      },
    })
    payload.logger.info('✓ Updated header global')
  } catch (error) {
    payload.logger.error('Error updating header:', error)
  }

  try {
    await payload.updateGlobal({
      slug: 'footer',
      data: {
        navItems: [
          {
            link: {
              type: 'reference',
              label: 'Privacy Policy',
              reference: {
                relationTo: 'pages',
                value: privacyPageDoc?.id,
              },
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Terms of Service',
              reference: {
                relationTo: 'pages',
                value: termsPageDoc?.id,
              },
            },
          },
        ],
      },
    })
    payload.logger.info('✓ Updated footer global')
  } catch (error) {
    payload.logger.error('Error updating footer:', error)
  }

  payload.logger.info('')
  payload.logger.info('✅ Database seeding completed successfully!')
  payload.logger.info(`   Users: ${kennethAdmin ? 1 : 0} + ${timAdmin ? 1 : 0}`)
  payload.logger.info(`   Categories: ${createdCategories.length}`)
  payload.logger.info(`   Posts: ${createdPosts.length}`)
  payload.logger.info(`   Pages: ${createdPages.length}`)
}
