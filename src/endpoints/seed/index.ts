import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'
import fs from 'fs'
import path from 'path'

import { contactForm as contactFormData } from './contact-form'
import { contact as contactPageData } from './contact-page'
import { home } from './home'
import { about } from './about'
import { community } from './community'
import { privacyPolicy } from './privacy-policy'
import { termsOfService } from './terms-of-service'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'

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

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
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

  await Promise.all(
    collections
      .filter((collection) => {
        const collectionConfig = (payload.collections as Record<string, any>)[collection]
        return Boolean(collectionConfig?.config?.versions)
      })
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding WDEG admin users...`)

  // Clean up existing demo users
  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals: 'demo-author@example.com',
      },
    },
  })

  // Create Kenneth Courtney as super admin
  let _kennethAdmin
  try {
    _kennethAdmin = await payload.create({
      collection: 'users',
      data: {
        name: 'Kenneth Courtney',
        email: 'kenneth.courtney@gmail.com',
        password: 'angelos!2025',
      },
    })
    payload.logger.info('✅ Kenneth Courtney admin created')
  } catch (error) {
    // User might already exist
    const existingKenneth = await payload.find({
      collection: 'users',
      where: { email: { equals: 'kenneth.courtney@gmail.com' } },
      limit: 1,
    })
    if (existingKenneth.docs.length > 0) {
      _kennethAdmin = existingKenneth.docs[0]
      payload.logger.info('✅ Kenneth Courtney admin already exists')
    } else {
      throw error
    }
  }

  // Create Ronald Courtney as admin
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
    // User might already exist
    const existingRonald = await payload.find({
      collection: 'users',
      where: { email: { equals: 'billthecat1225@gmail.com' } },
      limit: 1,
    })
    if (existingRonald.docs.length > 0) {
      ronaldAdmin = existingRonald.docs[0]
      payload.logger.info('✅ Ronald Courtney admin already exists')
    } else {
      throw error
    }
  }

  payload.logger.info(`— Seeding media...`)

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post1.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post3.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp',
    ),
  ])

  const [image1Doc, image2Doc, image3Doc, imageHomeDoc] = await Promise.all([
    payload.create({
      collection: 'media',
      data: image1,
      file: image1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image2Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image3Buffer,
    }),
    payload.create({
      collection: 'media',
      data: imageHero1,
      file: hero1Buffer,
    }),

    payload.create({
      collection: 'categories',
      data: {
        title: 'Biblical Prophecy',
        breadcrumbs: [
          {
            label: 'Biblical Prophecy',
            url: '/biblical-prophecy',
          },
        ],
      },
    }),

    payload.create({
      collection: 'categories',
      data: {
        title: 'End Times',
        breadcrumbs: [
          {
            label: 'End Times',
            url: '/end-times',
          },
        ],
      },
    }),

    payload.create({
      collection: 'categories',
      data: {
        title: 'Christian Living',
        breadcrumbs: [
          {
            label: 'Christian Living',
            url: '/christian-living',
          },
        ],
      },
    }),

    payload.create({
      collection: 'categories',
      data: {
        title: 'Book Reviews',
        breadcrumbs: [
          {
            label: 'Book Reviews',
            url: '/book-reviews',
          },
        ],
      },
    }),
  ])

  payload.logger.info(`— Seeding posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const post1Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post1({ heroImage: image1Doc, blockImage: image2Doc, author: ronaldAdmin }),
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post2({ heroImage: image2Doc, blockImage: image3Doc, author: ronaldAdmin }),
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post3({ heroImage: image3Doc, blockImage: image1Doc, author: ronaldAdmin }),
  })

  // update each post with related posts
  await payload.update({
    id: post1Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post2Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post2Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post3Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post2Doc.id],
    },
  })

  payload.logger.info(`— Seeding forms...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

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

  // Upload all WDEG book images
  payload.logger.info(`— Uploading WDEG book images...`)
  try {
    const wdegImagesDir = path.join(process.cwd(), 'public', 'wdeg', 'images')
    if (fs.existsSync(wdegImagesDir)) {
      const imageFiles = fs
        .readdirSync(wdegImagesDir)
        .filter((file) => file.match(/\.(jpg|jpeg|png|gif|webp)$/i))

      let uploadedCount = 0
      let skippedCount = 0

      for (const imageFile of imageFiles) {
        try {
          // Check if image already exists
          const existingImage = await payload.find({
            collection: 'media',
            where: { filename: { equals: imageFile } },
            limit: 1,
          })

          if (existingImage.docs.length === 0) {
            const imagePath = path.join(wdegImagesDir, imageFile)
            const imageBuffer = fs.readFileSync(imagePath)

            await payload.create({
              collection: 'media',
              data: {
                alt: `WDEG Book - ${imageFile.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '').replace(/[_-]/g, ' ')}`,
              },
              file: {
                name: imageFile,
                data: imageBuffer,
                mimetype: `image/${path.extname(imageFile).slice(1).toLowerCase()}`,
                size: imageBuffer.length,
              },
            })
            uploadedCount++
          } else {
            skippedCount++
          }
        } catch (error) {
          payload.logger.warn(`⚠️ Failed to upload ${imageFile}:`, error)
        }
      }

      payload.logger.info(
        `✅ WDEG images: ${uploadedCount} uploaded, ${skippedCount} already existed`,
      )
    } else {
      payload.logger.warn('⚠️ WDEG images directory not found')
    }
  } catch (error) {
    payload.logger.warn('⚠️ Failed to process WDEG images:', error)
  }

  payload.logger.info(`— Seeding pages...`)

  const [homePageDoc, aboutPageDoc, communityPageDoc, privacyPageDoc, termsPageDoc, contactPage] =
    await Promise.all([
      payload.create({
        collection: 'pages',
        depth: 0,
        data: home({ heroImage: wdegHeroImage || imageHomeDoc, metaImage: image2Doc }),
      }),
      payload.create({
        collection: 'pages',
        depth: 0,
        data: about({ heroImage: imageHomeDoc, metaImage: image2Doc }) as any,
      }),
      payload.create({
        collection: 'pages',
        depth: 0,
        data: community({ heroImage: imageHomeDoc, metaImage: image2Doc }) as any,
      }),
      payload.create({
        collection: 'pages',
        depth: 0,
        data: privacyPolicy({ heroImage: imageHomeDoc, metaImage: image2Doc }) as any,
      }),
      payload.create({
        collection: 'pages',
        depth: 0,
        data: termsOfService({ heroImage: imageHomeDoc, metaImage: image2Doc }) as any,
      }),
      payload.create({
        collection: 'pages',
        depth: 0,
        data: contactPageData({ contactForm: contactForm }),
      }),
    ])

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'The Book',
              url: '/wdeg-book',
            },
          },
          {
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
          {
            link: {
              type: 'reference',
              label: 'Community',
              reference: {
                relationTo: 'pages',
                value: communityPageDoc.id,
              },
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Contact',
              reference: {
                relationTo: 'pages',
                value: contactPage.id,
              },
            },
          },
        ],
      },
    }),
    payload.updateGlobal({
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
          {
            link: {
              type: 'custom',
              label: 'Admin',
              url: '/admin',
            },
          },
        ],
      },
    }),
  ])

  payload.logger.info('Seeded WDEG database successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
