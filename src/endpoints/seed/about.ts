import type { Page } from '../../payload-types'

export const about = ({
  heroImage,
  metaImage,
}: {
  heroImage: any
  metaImage: any
}): Partial<Page> => ({
  slug: 'about',
  _status: 'published',
  title: 'About WDEG',
  hero: {
    type: 'lowImpact',
    media: heroImage.id,
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
                text: 'About Where Did Everyone Go?',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
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
                text: 'Understanding Biblical Prophecy and Preparing for the End Times',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
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
      blockName: 'About WDEG',
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
                      text: '"Where Did Everyone Go?" is a biblical guide designed to help people understand the Rapture and end times prophecy. This book serves as a beacon of hope and truth for those seeking answers about biblical prophecy and God\'s plan for the last days.',
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
                      text: 'Our Mission',
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
                      text: "To provide clear, biblical answers about the Rapture and end times events. We believe that understanding God's prophetic timeline brings hope, comfort, and urgency to live for Christ. Our mission is to help believers prepare their hearts and share the Gospel before the Lord's return.",
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
                      text: "What You'll Find",
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
                      text: "This comprehensive resource covers: The timing of the Rapture, The 14 events of the Rapture, Signs of the times and birth pains, The Great Tribulation period, God's prophetic timeline, The Bride of Christ and the Wedding, How to receive salvation through Jesus Christ, and Living with hope and purpose in the last days.",
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
                      text: 'About the Author',
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
                      text: "This book was written with a heart for souls and a deep love for God's Word. The author's desire is to see people come to know Jesus Christ as their personal Savior and to help believers understand the blessed hope of the Rapture.",
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
    title: 'About | WDEG',
    description:
      'Learn about "Where Did Everyone Go?" - a biblical guide to understanding the Rapture and end times prophecy.',
    image: metaImage.id,
  },
  publishedAt: new Date().toISOString(),
})
