import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(request: NextRequest) {
  try {
    // Check if this is running on Vercel and if seeding is allowed
    const authHeader = request.headers.get('authorization')
    const expectedAuth = process.env.SEED_SECRET || 'wdeg-seed-2025'
    
    if (authHeader !== `Bearer ${expectedAuth}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await getPayload({ config: configPromise })

    // Check if database is already seeded
    const existingPages = await payload.find({
      collection: 'pages',
      limit: 1,
      pagination: false,
    })

    if (existingPages.docs.length > 0) {
      return NextResponse.json({ 
        message: 'Database already seeded',
        pages: existingPages.totalDocs 
      })
    }

    // Create basic admin user
    let adminUser
    try {
      adminUser = await payload.create({
        collection: 'users',
        data: {
          name: 'Ronald Courtney',
          email: 'billthecat1225@gmail.com',
          password: 'angelos!2025',
        },
      })
    } catch (error) {
      // User might already exist
      const existingUser = await payload.find({
        collection: 'users',
        where: { email: { equals: 'billthecat1225@gmail.com' } },
        limit: 1,
      })
      if (existingUser.docs.length > 0) {
        adminUser = existingUser.docs[0]
      } else {
        throw error
      }
    }

    // Create basic home page for English
    const homePage = await payload.create({
      collection: 'pages',
      data: {
        slug: 'home',
        _status: 'published',
        title: 'Where Did Everyone Go?',
        hero: {
          type: 'highImpact',
          richText: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'heading',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Where Did Everyone Go?',
                      version: 1,
                    },
                  ],
                  tag: 'h1',
                  version: 1,
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'A prophetic blueprint explaining our present chaos and the storm still ahead. This book is meant to be found in that hour of desperation—to point to the only truth that matters.',
                      version: 1,
                    },
                  ],
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
          links: [
            {
              link: {
                type: 'custom',
                appearance: 'default',
                label: 'Read the Book',
                url: '/wdeg-book',
              },
            },
          ],
        },
        layout: [
          {
            blockType: 'content',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Welcome to the WDEG platform. The database is being seeded with content.',
                        version: 1,
                      },
                    ],
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
          },
        ],
        meta: {
          title: 'Where Did Everyone Go? | WDEG',
          description: 'A prophetic blueprint explaining our present chaos and the storm still ahead.',
        },
        publishedAt: new Date().toISOString(),
      },
      locale: 'en',
    })

    // Create basic pages for other locales
    const otherLocales = ['es', 'fr', 'de', 'it', 'pt', 'pl', 'ar', 'he']
    const createdPages = [homePage]

    for (const locale of otherLocales) {
      try {
        const localePage = await payload.create({
          collection: 'pages',
          data: {
            slug: 'home',
            _status: 'published',
            title: 'Where Did Everyone Go?',
            hero: {
              type: 'highImpact',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      children: [
                        {
                          type: 'text',
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: 'Where Did Everyone Go?',
                          version: 1,
                        },
                      ],
                      tag: 'h1',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
            },
            layout: [
              {
                blockType: 'content',
                content: {
                  root: {
                    type: 'root',
                    children: [
                      {
                        type: 'paragraph',
                        children: [
                          {
                            type: 'text',
                            detail: 0,
                            format: 0,
                            mode: 'normal',
                            style: '',
                            text: `Welcome to the WDEG platform (${locale}). Content is being prepared.`,
                            version: 1,
                          },
                        ],
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                  },
                },
              },
            ],
            meta: {
              title: 'Where Did Everyone Go? | WDEG',
              description: 'A prophetic blueprint explaining our present chaos and the storm still ahead.',
            },
            publishedAt: new Date().toISOString(),
          },
          locale: locale as any,
        })
        createdPages.push(localePage)
      } catch (error) {
        console.warn(`Failed to create home page for locale ${locale}:`, error)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      created: {
        user: adminUser.id,
        pages: createdPages.length,
        locales: ['en', ...otherLocales.filter((_, i) => createdPages[i + 1])],
      },
    })
  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to seed database', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}
