import type { Page } from '../../payload-types'

export const community = ({
  heroImage,
  metaImage,
}: {
  heroImage: any
  metaImage: any
}): Partial<Page> => ({
  slug: 'community',
  _status: 'published',
  title: 'Community | WDEG',
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
                text: 'Join the WDEG Community',
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
                text: 'Connect with believers seeking to understand biblical prophecy and prepare for the end times.',
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
      blockName: 'Community Features',
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
                      text: "The WDEG community brings together believers from all walks of life who are seeking to understand biblical prophecy and prepare their hearts for the Lord's return. Our platform provides a safe space for fellowship, study, and spiritual growth.",
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
                      text: 'Community Features',
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
                      text: '• Bible Study Groups - Join online and local groups studying end times prophecy and biblical truth\n• Prayer Circles - Connect with fellow believers for prayer and spiritual support\n• Testimony Sharing - Share how God is working in your life and preparing your heart\n• Prophecy Discussions - Engage in thoughtful conversations about current events and biblical prophecy\n• Resource Library - Access recommended books, sermons, and study materials\n• Event Notifications - Stay informed about conferences, revivals, and community gatherings',
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
                      text: 'Growing in Faith Together',
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
                      text: "Whether you're a new believer seeking to understand God's plan or a mature Christian looking to deepen your knowledge of prophecy, our community welcomes you. We believe in supporting one another as we watch and wait for our Lord's return.",
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
                      text: 'Connect With Us',
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
                      text: "Have questions about biblical prophecy or want to connect with other believers in your area? We'd love to hear from you. Contact us through our contact page or join one of our online fellowship groups.",
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
    title: 'Community | WDEG',
    description:
      'Join the WDEG community of believers studying biblical prophecy, preparing for the end times, and growing in faith together.',
    image: metaImage.id,
  },
  publishedAt: new Date().toISOString(),
})
