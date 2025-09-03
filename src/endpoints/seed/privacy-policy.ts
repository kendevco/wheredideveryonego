import type { Page } from '@/payload-types'

export const privacyPolicy = ({ heroImage, metaImage }: { heroImage?: any; metaImage?: any }): Partial<Page> => ({
  title: 'Privacy Policy',
  slug: 'privacy-policy',
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
                text: 'Privacy Policy',
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
                text: 'Your privacy is important to us.',
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
                      text: 'This privacy policy describes how we collect, use, and protect your personal information when you use our website and services.',
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
                      text: 'Information We Collect',
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
                      text: 'We collect information you provide directly to us, such as when you contact us or subscribe to our newsletter.',
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
                      text: 'How We Use Your Information',
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
                      text: 'We use the information we collect to provide, maintain, and improve our services and communicate with you.',
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
    title: 'Privacy Policy | WDEG',
    description: 'Our privacy policy explains how we collect, use, and protect your personal information.',
    ...(metaImage && { image: metaImage.id }),
  },
})
