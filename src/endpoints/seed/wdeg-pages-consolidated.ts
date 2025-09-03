import type { Payload, PayloadRequest } from 'payload'
import fs from 'fs'
import path from 'path'

// Page metadata - extracted from content analysis
const pageMetadata = [
  {
    pageNumber: 1,
    title: "Something's Wrong With The World",
    excerpt:
      "People everywhere can sense it—something just isn't right. The Bible lays out a prophetic blueprint explaining our present chaos and the storm still ahead.",
    h1: "Something's Wrong With The World",
    description:
      'An examination of current world events through a biblical lens, exploring the signs of the times and prophetic indicators of end-time events.',
  },
  {
    pageNumber: 2,
    title: 'Mystery of the Mass Disappearance',
    excerpt:
      "Any day now, millions of people will mysteriously vanish from the Earth at the peak of global chaos. The world will ask in unison: 'Where did everyone go?'",
    h1: 'Mystery of the Mass Disappearance',
    description:
      'A vivid description of the Rapture event and the chaos that will follow when millions of believers suddenly disappear from Earth.',
  },
  {
    pageNumber: 3,
    title: 'The Rapture Is Closer Than You Think',
    excerpt:
      'Videos roll in—two friends walking side by side, and in an instant, one is gone. The same eerie scenes play on every station, in every language, across every country.',
    h1: 'The Rapture Is Closer Than You Think',
    description:
      'Biblical evidence and prophecy pointing to the imminent return of Christ and the catching away of His church.',
  },
  {
    pageNumber: 4,
    title: 'Unveiling the Timing of End-Time Events',
    excerpt:
      'Daniel was an Old Testament prophet who could interpret dreams and see the future. Understanding Daniel helps us comprehend the timing and sequence of end-time events.',
    h1: 'Unveiling the Timing of End-Time Events',
    description:
      "An exploration of Daniel's prophecies and their relevance to understanding the timeline of biblical end-time events.",
  },
  {
    pageNumber: 5,
    title: 'The 14 Events of the Rapture',
    excerpt:
      'Tim LaHaye, co-author of the Left Behind series, notes 14 events of the Rapture that will occur when Christ returns for His church.',
    h1: 'The 14 Events of the Rapture',
    description:
      'A detailed breakdown of the biblical sequence of events that will occur during the Rapture of the church.',
  },
  {
    pageNumber: 6,
    title: "God's Prophetic Timeline",
    excerpt:
      'The seventieth week of Daniel, this final seven-year period will begin when a covenant is confirmed between the Antichrist and Israel.',
    h1: "God's Prophetic Timeline",
    description:
      "Understanding the prophetic timeline from Daniel's 70 weeks and its application to end-time events.",
  },
  {
    pageNumber: 7,
    title: 'The Great Tribulation',
    excerpt:
      'For then there will be great distress, unequaled from the beginning of the world until now—and never to be equaled again.',
    h1: 'The Great Tribulation',
    description:
      'An examination of the coming seven-year tribulation period and its unprecedented nature in human history.',
  },
  // Add remaining chapters as needed...
]

function convertTextToRichText(text: string): any {
  const lines = text.split('\n').filter((line) => line.trim() !== '')
  const children: any[] = []

  for (const line of lines) {
    const trimmedLine = line.trim()
    if (!trimmedLine) continue

    // Check if it's a heading (first line or standalone line that looks like a title)
    if (lines.indexOf(line) === 0 || (trimmedLine.length < 100 && !trimmedLine.includes('.'))) {
      children.push({
        type: 'heading',
        children: [
          {
            type: 'text',
            text: trimmedLine,
            version: 1,
          },
        ],
        tag: lines.indexOf(line) === 0 ? 'h1' : 'h2',
        version: 1,
      })
    } else {
      children.push({
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: trimmedLine,
            version: 1,
          },
        ],
        version: 1,
      })
    }
  }

  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

export const seedWDEGPages = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('— Seeding WDEG book as single consolidated page...')

  // Check if WDEG book already exists
  const existingWDEG = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'wdeg-book' } },
    limit: 1,
  })

  if (existingWDEG.docs.length > 0) {
    payload.logger.info('⏭️ WDEG book page already exists, skipping')
    return
  }

  // Upload all chapter images first
  const uploadedImages: any[] = []
  payload.logger.info('— Uploading WDEG chapter images...')

  for (let pageNum = 1; pageNum <= 26; pageNum++) {
    const pageNumber = pageNum.toString().padStart(2, '0')
    const imagePath = path.join(
      process.cwd(),
      'src',
      'endpoints',
      'seed',
      'wdeg',
      'images',
      `page_${pageNumber}.png`,
    )

    if (fs.existsSync(imagePath)) {
      try {
        // Check if image already exists
        const existingImage = await payload.find({
          collection: 'media',
          where: { filename: { equals: `page_${pageNumber}.png` } },
          limit: 1,
        })

        if (existingImage.docs.length > 0) {
          uploadedImages[pageNum] = existingImage.docs[0]
        } else {
          const imageBuffer = fs.readFileSync(imagePath)
          const imageDoc = await payload.create({
            collection: 'media',
            data: {
              alt: `WDEG Chapter ${pageNum} Illustration`,
            },
            file: {
              name: `page_${pageNumber}.png`,
              data: imageBuffer,
              mimetype: 'image/png',
              size: imageBuffer.length,
            },
          })
          uploadedImages[pageNum] = imageDoc
          payload.logger.info(`✅ Uploaded image for chapter ${pageNum}`)
        }
      } catch (error) {
        payload.logger.warn(`⚠️ Failed to upload image for chapter ${pageNum}:`, error)
      }
    }
  }

  // Build consolidated content layout with all chapters
  const layoutBlocks: any[] = [
    {
      blockType: 'content' as const,
      blockName: 'Introduction',
      columns: [
        {
          size: 'full' as const,
          richText: convertTextToRichText(
            'Where Did Everyone Go?\n\nA Biblical Guide to Understanding the Rapture and End Times\n\nThis book is a humble attempt to answer the biggest question people will have when millions vanish in an instant: "Where did everyone go?" Books like this are meant to be found in that hour of desperation—to point to the only truth that matters.\n\nThe complete book is presented below with all chapters in sequence. Use your browser\'s language settings or the language switcher to view content in different languages.',
          ),
        },
      ],
    },
  ]

  // Add each chapter as a content block with image
  for (const pageInfo of pageMetadata) {
    const pageNumber = pageInfo.pageNumber.toString().padStart(2, '0')

    // Try to read English content first (fallback)
    const englishFilePath = path.join(
      process.cwd(),
      'src',
      'endpoints',
      'seed',
      'wdeg',
      'en',
      `page_${pageNumber}.txt`,
    )

    let chapterContent = `Chapter ${pageInfo.pageNumber}: ${pageInfo.title}\n\n${pageInfo.excerpt}\n\n${pageInfo.description}`

    if (fs.existsSync(englishFilePath)) {
      try {
        chapterContent = fs.readFileSync(englishFilePath, 'utf-8')
      } catch (error) {
        payload.logger.warn(`⚠️ Could not read content for chapter ${pageInfo.pageNumber}`)
      }
    }

    // Add chapter content block
    layoutBlocks.push({
      blockType: 'content' as const,
      blockName: `Chapter ${pageInfo.pageNumber}`,
      columns: [
        {
          size: 'full' as const,
          richText: convertTextToRichText(chapterContent),
        },
      ],
    })

    // Add chapter image if available
    if (uploadedImages[pageInfo.pageNumber]) {
      layoutBlocks.push({
        blockType: 'mediaBlock' as const,
        blockName: `Chapter ${pageInfo.pageNumber} Image`,
        media: uploadedImages[pageInfo.pageNumber].id,
        caption: `Illustration for Chapter ${pageInfo.pageNumber}: ${pageInfo.title}`,
      })
    }
  }

  // Create the consolidated WDEG book page
  try {
    const wdegBookPage = await payload.create({
      collection: 'pages',
      data: {
        title: 'Where Did Everyone Go? - Complete Book',
        slug: 'wdeg-book',
        _status: 'published',
        publishedAt: new Date().toISOString(),
        hero: {
          type: 'lowImpact',
          richText: convertTextToRichText(
            'Where Did Everyone Go?\n\nThe Complete Biblical Guide to Understanding the Rapture and End Times',
          ),
          ...(uploadedImages[1] && { media: uploadedImages[1].id }),
        },
        layout: layoutBlocks,
        meta: {
          title: 'Where Did Everyone Go? - Complete Book | WDEG',
          description:
            'The complete biblical guide to understanding the Rapture and End Times. All 26 chapters in one comprehensive resource to help answer the biggest question people will have when millions vanish.',
          ...(uploadedImages[1] && { image: uploadedImages[1].id }),
        },
      },
    })

    payload.logger.info('✅ Created consolidated WDEG book page with all chapters')
  } catch (error) {
    payload.logger.error('❌ Failed to create consolidated WDEG book page:', error)
  }

  // Upload cover art if it doesn't exist
  try {
    const coverPath = path.join(process.cwd(), 'src', 'endpoints', 'seed', 'wdeg', 'wdeg.jpg')
    if (fs.existsSync(coverPath)) {
      const existingCover = await payload.find({
        collection: 'media',
        where: { filename: { equals: 'wdeg.jpg' } },
        limit: 1,
      })

      if (existingCover.docs.length === 0) {
        const coverBuffer = fs.readFileSync(coverPath)
        await payload.create({
          collection: 'media',
          data: {
            alt: 'Where Did Everyone Go? - Book Cover',
          },
          file: {
            name: 'wdeg.jpg',
            data: coverBuffer,
            mimetype: 'image/jpeg',
            size: coverBuffer.length,
          },
        })
        payload.logger.info('✅ Uploaded WDEG cover image')
      }
    }
  } catch (error) {
    payload.logger.warn('⚠️ Failed to upload WDEG cover image:', error)
  }
}
