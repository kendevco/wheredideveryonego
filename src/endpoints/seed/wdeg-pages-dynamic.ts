import type { Payload, PayloadRequest } from 'payload'

function convertTextToRichText(text: string): any {
  const lines = text.split('\n').filter((line) => line.trim() !== '')
  const children: any[] = []

  for (const line of lines) {
    const trimmedLine = line.trim()
    if (!trimmedLine) continue

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
  payload.logger.info('— Seeding dynamic WDEG book page...')

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

  // Create a simple page that will use the dynamic React component
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
        },
        layout: [
          {
            blockType: 'content' as const,
            blockName: 'Dynamic Book Component',
            columns: [
              {
                size: 'full' as const,
                richText: convertTextToRichText(
                  'This interactive book loads content dynamically in multiple languages. The translations are loaded directly from the source files, ensuring the most up-to-date content is always available.\n\nUse the language selector above to switch between available translations, and choose between single-chapter or complete book view modes.',
                ),
              },
            ],
          },
        ],
        meta: {
          title: 'Where Did Everyone Go? - Complete Book | WDEG',
          description:
            'The complete biblical guide to understanding the Rapture and End Times. Interactive multi-language book with dynamic content loading.',
        },
      },
    })

    payload.logger.info('✅ Created dynamic WDEG book page')
  } catch (error) {
    payload.logger.error('❌ Failed to create dynamic WDEG book page:', error)
  }
}







