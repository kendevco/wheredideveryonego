import type { Payload, PayloadRequest } from 'payload'
import fs from 'fs'
import path from 'path'

// Only English language now
const languages = [{ code: 'en', name: 'English' }]

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
  {
    pageNumber: 8,
    title: 'God Judges Evil, Rescues the Righteous',
    excerpt:
      'The wrath of God is being revealed from heaven against all the godlessness and wickedness of people who suppress the truth.',
    h1: 'God Judges Evil, Rescues the Righteous',
    description:
      "Understanding God's righteous judgment and His plan to rescue the faithful from coming wrath.",
  },
  {
    pageNumber: 9,
    title: 'Protection from Divine Judgment',
    excerpt:
      'Since you have kept my command to endure patiently, I will also keep you from the hour of trial that is going to come on the whole world.',
    h1: 'Protection from Divine Judgment',
    description:
      'Biblical promises of protection for the faithful during the time of global tribulation and judgment.',
  },
  {
    pageNumber: 10,
    title: "It's All About the Wedding!",
    excerpt:
      'The wedding imagery is the most prominent of all the analogies the Bible gives us concerning the Rapture and the relationship between Christ and His Church.',
    h1: "It's All About the Wedding!",
    description:
      "Understanding the biblical wedding imagery and how it relates to Christ's relationship with His church.",
  },
  {
    pageNumber: 11,
    title: 'The Bride of Christ',
    excerpt:
      'This Jewish wedding tradition directly symbolizes the relationship between Jesus and His Church through covenant, purchase price, and preparation.',
    h1: 'The Bride of Christ',
    description:
      'Exploring the biblical concept of the church as the Bride of Christ and the wedding feast to come.',
  },
  {
    pageNumber: 12,
    title: 'The Parable of the Ten Virgins',
    excerpt:
      'At that time, the kingdom of heaven will be like ten virgins who took their lamps and went out to meet the bridegroom.',
    h1: 'The Parable of the Ten Virgins',
    description:
      "Jesus' parable about readiness and preparation for His return, distinguishing between the wise and foolish.",
  },
  {
    pageNumber: 13,
    title: 'Wise and Foolish Virgins',
    excerpt:
      'The five wise virgins carried full jars of oil—symbolizing the indwelling fullness of the Holy Spirit and a life genuinely surrendered to God.',
    h1: 'Wise and Foolish Virgins',
    description:
      "Understanding the difference between genuine faith and mere religious appearance in preparation for Christ's return.",
  },
  {
    pageNumber: 14,
    title: 'Signs of the Times',
    excerpt:
      'Tell us, when will these things happen, and what will be the sign of your coming and the end of the age?',
    h1: 'Signs of the Times',
    description:
      "Jesus' teaching about the signs that will precede His return and the end of the age.",
  },
  {
    pageNumber: 15,
    title: 'Birth Pains Intensifying',
    excerpt:
      "Birth pains intensify and increase in frequency as the time of birth approaches. This is precisely what's happening today.",
    h1: 'Birth Pains Intensifying',
    description:
      "How current world events align with Jesus' prophecy about birth pains preceding His return.",
  },
  {
    pageNumber: 16,
    title: 'What Happens During the Tribulation?',
    excerpt:
      'As the seals begin to open, we are introduced to the Antichrist, who comes promising peace but ultimately brings worldwide war.',
    h1: 'What Happens During the Tribulation?',
    description:
      'A detailed look at the events that will unfold during the seven-year tribulation period.',
  },
  {
    pageNumber: 17,
    title: 'The Seven Trumpets and Bowls',
    excerpt:
      'The first bowl of wrath inflicts painful sores upon those who accepted the Mark of the Beast. The judgments intensify with each bowl.',
    h1: 'The Seven Trumpets and Bowls',
    description:
      'The progressive judgments of God during the tribulation through the seven trumpets and seven bowls of wrath.',
  },
  {
    pageNumber: 18,
    title: 'Time for Some Good News!',
    excerpt:
      'The picture of doom painted here does not have to be your future. God is merciful and fervently desires that none should perish.',
    h1: 'Time for Some Good News!',
    description:
      'The gospel message of hope and salvation available to all who will receive Christ.',
  },
  {
    pageNumber: 19,
    title: 'The Narrow Gate',
    excerpt:
      'Enter through the narrow gate. Wide is the gate, and broad is the road that leads to destruction, and many enter through it.',
    h1: 'The Narrow Gate',
    description:
      "Jesus' teaching about the narrow path to salvation and the urgency of making the right choice.",
  },
  {
    pageNumber: 20,
    title: 'Come to Jesus and Receive New Life',
    excerpt:
      "If you recognize your need for God's mercy and long to spend eternity with Him, offer this prayer with a heart of faith.",
    h1: 'Come to Jesus and Receive New Life',
    description:
      'A prayer of salvation and the beginning of new life in Christ for those who believe.',
  },
  {
    pageNumber: 21,
    title: 'Walking in New Life',
    excerpt:
      'In the strength of His Holy Spirit, we are boldly encouraged to put off your old self and put on the new self, created to be like God.',
    h1: 'Walking in New Life',
    description:
      'Practical guidance for living the Christian life and growing in faith after accepting Christ.',
  },
  {
    pageNumber: 22,
    title: 'Behold Your New Future in Christ',
    excerpt:
      'I consider that our present sufferings are not worth comparing with the glory that will be revealed in us.',
    h1: 'Behold Your New Future in Christ',
    description: 'Biblical promises about the glorious future awaiting those who belong to Christ.',
  },
  {
    pageNumber: 23,
    title: 'Living in Hope',
    excerpt:
      'For the grace of God has appeared that offers salvation to all people while we wait for the blessed hope—the appearing of our great God and Savior.',
    h1: 'Living in Hope',
    description: "How to live with hope and expectation while waiting for Christ's return.",
  },
  {
    pageNumber: 24,
    title: 'The Promise of His Coming',
    excerpt:
      'Dear friends, now we are children of God, and what we will be has not yet been made known. But we know that when Christ appears, we shall be like Him.',
    h1: 'The Promise of His Coming',
    description:
      'The blessed hope of transformation and glorification when Christ returns for His people.',
  },
  {
    pageNumber: 25,
    title: 'Until That Glorious Day Comes',
    excerpt:
      'The Scriptures we have explored reveal the glorious hope and promise believers have in Jesus Christ despite the suffering and challenges we may face now.',
    h1: 'Until That Glorious Day Comes',
    description:
      "Encouragement for believers to remain faithful and hopeful until Christ's return.",
  },
  {
    pageNumber: 26,
    title: 'Joy Unrelenting in Prayer and Praise',
    excerpt:
      "The Lord's Prayer isn't just for quiet moments in church pews—it's for your bedroom, your car, and your most anxious hours.",
    h1: 'Joy Unrelenting in Prayer and Praise',
    description:
      "The importance of prayer and praise in the believer's life, featuring the Lord's Prayer.",
  },
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
  payload.logger.info('— Seeding WDEG book pages...')

  // First, create the main WDEG book parent page
  let wdegParentPage
  try {
    const existingParent = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'wdeg-book' } },
      limit: 1,
    })

    if (existingParent.docs.length === 0) {
      wdegParentPage = await payload.create({
        collection: 'pages',
        data: {
          title: 'Where Did Everyone Go? - The Book',
          slug: 'wdeg-book',
          _status: 'published',
          publishedAt: new Date().toISOString(),
          hero: {
            type: 'lowImpact',
            richText: convertTextToRichText(
              'Where Did Everyone Go?\n\nA Biblical Guide to Understanding the Rapture and End Times',
            ),
          },
          layout: [
            {
              blockType: 'content' as const,
              columns: [
                {
                  size: 'full' as const,
                  richText: convertTextToRichText(
                    'This book is a humble attempt to answer the biggest question people will have when millions vanish in an instant: "Where did everyone go?" Books like this are meant to be found in that hour of desperation—to point to the only truth that matters.\n\nNavigate through the chapters below to explore biblical prophecy, understand the signs of the times, and discover the hope found in Jesus Christ.',
                  ),
                },
              ],
            },
            {
              blockType: 'wdegNavigation' as const,
              currentPage: 1,
              totalPages: 26,
              baseUrl: '/wdeg-book',
            },
          ],
          meta: {
            title: 'Where Did Everyone Go? - The Complete Book | WDEG',
            description:
              'A comprehensive biblical guide to understanding the Rapture, end times prophecy, and finding hope in Jesus Christ during the last days.',
          },
        },
      })
      payload.logger.info('✅ Created WDEG parent page')
    } else {
      wdegParentPage = existingParent.docs[0]
      payload.logger.info('✅ WDEG parent page already exists')
    }
  } catch (error) {
    payload.logger.error('❌ Failed to create WDEG parent page:', error)
    return
  }

  // Create all 26 pages for each language
  for (const pageInfo of pageMetadata) {
    for (const language of languages) {
      try {
        const pageNumber = String(pageInfo.pageNumber).padStart(3, '0')
        const slug = `wdeg-book/page-${pageNumber}`

        // Check if page already exists
        const existingPage = await payload.find({
          collection: 'pages',
          where: { slug: { equals: slug } },
          limit: 1,
        })

        if (existingPage.docs.length > 0) {
          payload.logger.info(`— Page ${pageNumber} (${language.code}) already exists`)
          continue
        }

        // Read the content file (English only)
        const filePath = path.join(process.cwd(), 'public', 'wdeg', 'en', `${pageNumber}.txt`)

        if (!fs.existsSync(filePath)) {
          payload.logger.warn(`⚠️ Content file not found: ${filePath}`)
          continue
        }

        const content = fs.readFileSync(filePath, 'utf-8')
        const richTextContent = convertTextToRichText(content)

        // Find corresponding image
        const imagePath = path.join(
          process.cwd(),
          'public',
          'wdeg',
          'images',
          `page_${pageNumber}.png`,
        )
        let imageDoc = null

        if (fs.existsSync(imagePath)) {
          // Check if image already exists in media collection
          const existingImage = await payload.find({
            collection: 'media',
            where: { filename: { equals: `page_${pageNumber}.png` } },
            limit: 1,
          })

          if (existingImage.docs.length > 0) {
            imageDoc = existingImage.docs[0]
          } else {
            // Upload the image
            try {
              const imageBuffer = fs.readFileSync(imagePath)
              imageDoc = await payload.create({
                collection: 'media',
                data: {
                  alt: `WDEG Page ${pageInfo.pageNumber} Illustration`,
                },
                file: {
                  name: `page_${pageNumber}.png`,
                  data: imageBuffer,
                  mimetype: 'image/png',
                  size: imageBuffer.length,
                },
              })
            } catch (imageError) {
              payload.logger.warn(`⚠️ Failed to upload image for page ${pageNumber}:`, imageError)
            }
          }
        }

        // Create the page
        const pageData = {
          title: pageInfo.title,
          slug,
          _status: 'published' as const,
          publishedAt: new Date().toISOString(),
          parent: wdegParentPage.id,
          hero: {
            type: 'lowImpact' as const,
            richText: convertTextToRichText(`${pageInfo.h1}\n\nPage ${pageInfo.pageNumber} of 26`),
            ...(imageDoc && { media: imageDoc.id }),
          },
          layout: [
            {
              blockType: 'content' as const,
              columns: [
                {
                  size: 'full' as const,
                  richText: richTextContent,
                },
              ],
            },
            {
              blockType: 'wdegNavigation' as const,
              currentPage: pageInfo.pageNumber,
              totalPages: 26,
              baseUrl: '/wdeg-book',
            },
          ],
          meta: {
            title: `${pageInfo.title} - Page ${pageInfo.pageNumber} | WDEG`,
            description: pageInfo.description,
            ...(imageDoc && { image: imageDoc.id }),
          },
        }

        await payload.create({
          collection: 'pages',
          data: pageData,
        })

        payload.logger.info(`✅ Created page ${pageNumber} (${language.code}): ${pageInfo.title}`)
      } catch (error) {
        payload.logger.error(
          `❌ Failed to create page ${pageInfo.pageNumber} (${language.code}):`,
          error,
        )
      }
    }
  }

  // Upload cover art if it doesn't exist
  try {
    const coverArtPath = path.join(process.cwd(), 'public', 'wdeg', 'images', 'cover_art.png')
    if (fs.existsSync(coverArtPath)) {
      const existingCover = await payload.find({
        collection: 'media',
        where: { filename: { equals: 'cover_art.png' } },
        limit: 1,
      })

      if (existingCover.docs.length === 0) {
        const coverBuffer = fs.readFileSync(coverArtPath)
        await payload.create({
          collection: 'media',
          data: {
            alt: 'Where Did Everyone Go? - Book Cover',
          },
          file: {
            name: 'cover_art.png',
            data: coverBuffer,
            mimetype: 'image/png',
            size: coverBuffer.length,
          },
        })
        payload.logger.info('✅ Uploaded WDEG cover art')
      }
    }
  } catch (error) {
    payload.logger.warn('⚠️ Failed to upload cover art:', error)
  }

  payload.logger.info('✅ WDEG book pages seeding completed!')
}
