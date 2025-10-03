import type { Media } from '@/payload-types'

type TermsofserviceArgs = {
  heroImage?: Media
  metaImage?: Media
  contactForm?: any
}

export const termsofservice: (args: TermsofserviceArgs) => any = ({
  heroImage,
  metaImage,
  contactForm,
}) => {
  return {
    slug: 'terms-of-service',
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
                  text: 'Terms of Service',
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
                  text: 'Please read these terms carefully before using our services.',
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
                        text: 'These terms of service govern your use of our website and services. By accessing or using our services, you agree to be bound by these terms.',
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
                        text: 'Acceptance of Terms',
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
                        text: 'By using our services, you acknowledge that you have read, understood, and agree to be bound by these terms.',
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
                        text: 'Use of Services',
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
                        text: 'You may use our services for lawful purposes only and in accordance with these terms.',
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
      title: 'Terms of Service | WDEG',
      image: metaImage?.id,
      description: 'Terms of service for using our website and services.',
    },
    title: 'Terms of Service',
    publishedAt: '2025-09-04T17:55:31.406Z',
  }
}
