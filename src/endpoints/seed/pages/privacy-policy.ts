import type { Media } from '@/payload-types'

type PrivacypolicyArgs = {
  heroImage?: Media
  metaImage?: Media
  contactForm?: any
}

export const privacypolicy: (args: PrivacypolicyArgs) => any = ({
  heroImage,
  metaImage,
  contactForm,
}) => {
  return {
    slug: 'privacy-policy',
    _status: 'published',
    hero: {
      type: 'lowImpact',
      richText: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              tag: 'h1',
              type: 'heading',
              version: 1,
              children: [
                {
                  text: 'Privacy Policy',
                  type: 'text',
                  version: 1,
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  text: 'Your privacy is important to us.',
                  type: 'text',
                  version: 1,
                },
              ],
            },
          ],
          direction: 'ltr',
        },
      },
      links: [],
      media: heroImage?.id,
    },
    layout: [
      {        blockName: null,
        columns: [
          {            size: 'full',
            richText: {
              root: {
                type: 'root',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    type: 'paragraph',
                    version: 1,
                    children: [
                      {
                        text: 'This privacy policy describes how we collect, use, and protect your personal information when you use our website and services.',
                        type: 'text',
                        version: 1,
                      },
                    ],
                  },
                  {
                    tag: 'h2',
                    type: 'heading',
                    version: 1,
                    children: [
                      {
                        text: 'Information We Collect',
                        type: 'text',
                        version: 1,
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    version: 1,
                    children: [
                      {
                        text: 'We collect information you provide directly to us, such as when you contact us or subscribe to our newsletter.',
                        type: 'text',
                        version: 1,
                      },
                    ],
                  },
                  {
                    tag: 'h2',
                    type: 'heading',
                    version: 1,
                    children: [
                      {
                        text: 'How We Use Your Information',
                        type: 'text',
                        version: 1,
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    version: 1,
                    children: [
                      {
                        text: 'We use the information we collect to provide, maintain, and improve our services and communicate with you.',
                        type: 'text',
                        version: 1,
                      },
                    ],
                  },
                ],
                direction: 'ltr',
              },
            },
            enableLink: null,
            link: {
              type: 'reference',
              newTab: false,
              url: null,
              label: '',
              appearance: 'default',
            },
          },
        ],
        blockType: 'content',
      },
    ],
    meta: {
      title: 'Privacy Policy | WDEG',
      image: metaImage?.id,
      description:
        'Our privacy policy explains how we collect, use, and protect your personal information.',
    },
    title: 'Privacy Policy',
    publishedAt: '2025-09-04T17:55:31.406Z',
  }
}
