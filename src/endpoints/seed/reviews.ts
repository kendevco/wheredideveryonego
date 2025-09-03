import type { Page } from '../../payload-types'

export const reviews = ({
  heroImage,
  metaImage,
}: {
  heroImage: any
  metaImage: any
}): Partial<Page> => ({
  slug: 'reviews',
  _status: 'published',
  title: 'WDEG Feedback | Angel OS',
  hero: {
    type: 'lowImpact',
    media: heroImage?.id,
    richText: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                text: 'WDEG Reader Feedback',
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
                text: 'Share your thoughts and feedback about "Where Did Everyone Go?" digital book.',
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
  layout: [
    {
      blockType: 'content',
      columns: [
        {
          richText: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Your feedback helps improve the WDEG digital book experience. Please share your thoughts, suggestions, or questions about the content.',
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
          size: 'full',
        },
      ],
    },
  ],
  meta: {
    title: 'WDEG Feedback | Angel OS',
    description: 'Share feedback about the Where Did Everyone Go digital book.',
    image: metaImage?.id,
  },
  publishedAt: new Date().toISOString(),
})
