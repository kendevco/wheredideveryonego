import type { Page } from '@/payload-types'

export const termsOfService = ({ heroImage, metaImage }: { heroImage?: any; metaImage?: any }): Partial<Page> => ({
  title: 'Terms of Service',
  slug: 'terms-of-service',
  _status: 'published',
  publishedAt: new Date().toISOString(),
  hero: {
    type: 'lowImpact',
    richText: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                text: 'Terms of Service',
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
                text: 'Please read these terms carefully before using our services.',
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
    ...(heroImage && { media: heroImage.id }),
  },
  layout: [
    {
      blockType: 'content',
      columns: [
        {
          size: 'full',
          richText: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'These terms of service govern your use of our website and services. By accessing or using our services, you agree to be bound by these terms.',
                      version: 1,
                    },
                  ],
                  version: 1,
                },
                {
                  type: 'heading',
                  children: [
                    {
                      type: 'text',
                      text: 'Acceptance of Terms',
                      version: 1,
                    },
                  ],
                  tag: 'h2',
                  version: 1,
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'By using our services, you acknowledge that you have read, understood, and agree to be bound by these terms.',
                      version: 1,
                    },
                  ],
                  version: 1,
                },
                {
                  type: 'heading',
                  children: [
                    {
                      type: 'text',
                      text: 'Use of Services',
                      version: 1,
                    },
                  ],
                  tag: 'h2',
                  version: 1,
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'You may use our services for lawful purposes only and in accordance with these terms.',
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
    },
  ],
  meta: {
    title: 'Terms of Service | WDEG',
    description: 'Terms of service for using our website and services.',
    ...(metaImage && { image: metaImage.id }),
  },
})
