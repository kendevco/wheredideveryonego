import type { Media } from '@/payload-types'

type AboutArgs = {
  heroImage?: Media
  metaImage?: Media
  contactForm?: any
}

export const about: (args: AboutArgs) => any = ({ heroImage, metaImage, contactForm }) => {
  return {
    slug: 'about',
    _status: 'published',
    hero: {
      type: 'highImpact',
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
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  mode: 'normal',
                  text: 'About Where Did Everyone Go?',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  mode: 'normal',
                  text: 'Understanding Biblical Prophecy and Preparing for the End Times',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
              textFormat: 0,
            },
          ],
          direction: 'ltr',
        },
      },
      links: [],
      media: heroImage?.id,
    },
    layout: [
      {        blockName: 'About WDEG',
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
                    tag: 'h2',
                    type: 'heading',
                    format: '',
                    version: 1,
                    children: [
                      {
                        text: 'About Where Did Everyone Go?',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'paragraph',
                    format: '',
                    indent: 0,
                    version: 1,
                    children: [
                      {
                        text: '"Where Did Everyone Go?" is a biblical guide designed to help people understand the Rapture and end times prophecy. This book serves as a beacon of hope and truth for those seeking answers about biblical prophecy and God\'s plan for the last days.',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    tag: 'h2',
                    type: 'heading',
                    format: '',
                    version: 1,
                    children: [
                      {
                        text: 'Our Mission',
                        type: 'text',
                        version: 1,
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    format: '',
                    version: 1,
                    children: [
                      {
                        text: "To provide clear, biblical answers about the Rapture and end times events. We believe that understanding God's prophetic timeline brings hope, comfort, and urgency to live for Christ. Our mission is to help believers prepare their hearts and share the Gospel before the Lord's return.",
                        type: 'text',
                        version: 1,
                      },
                    ],
                    textFormat: 0,
                  },
                  {
                    tag: 'h2',
                    type: 'heading',
                    format: '',
                    version: 1,
                    children: [
                      {
                        text: "What You'll Find",
                        type: 'text',
                        version: 1,
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    format: '',
                    version: 1,
                    children: [
                      {
                        text: "This comprehensive resource covers: The timing of the Rapture, The 14 events of the Rapture, Signs of the times and birth pains, The Great Tribulation period, God's prophetic timeline, The Bride of Christ and the Wedding, How to receive salvation through Jesus Christ, and Living with hope and purpose in the last days.",
                        type: 'text',
                        version: 1,
                      },
                    ],
                    textFormat: 0,
                  },
                  {
                    tag: 'h2',
                    type: 'heading',
                    format: '',
                    version: 1,
                    children: [
                      {
                        text: 'About the Author',
                        type: 'text',
                        version: 1,
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    format: '',
                    version: 1,
                    children: [
                      {
                        text: "This book was written with a heart for souls and a deep love for God's Word. The author's desire is to see people come to know Jesus Christ as their personal Savior and to help believers understand the blessed hope of the Rapture.",
                        type: 'text',
                        version: 1,
                      },
                    ],
                    textFormat: 0,
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
      {        title: 'Choose Your Language',
        subtitle: 'Experience "Where Did Everyone Go?" in your preferred language',
        displayStyle: 'grid',
        showFlags: true,
        blockName: null,
        enabledLanguages: ['ar', 'de', 'en', 'es', 'fr', 'he', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'ru', 'sv', 'zh'],
        blockType: 'languageSelector',
      },
    ],
    meta: {
      title: 'About | WDEG',
      image: metaImage?.id,
      description:
        'Learn about "Where Did Everyone Go?" - a biblical guide to understanding the Rapture and end times prophecy.',
    },
    title: 'About WDEG',
    publishedAt: '2025-09-04T17:55:31.405Z',
  }
}
