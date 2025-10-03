import type { Media } from '@/payload-types'

type CommunityArgs = {
  heroImage?: Media
  metaImage?: Media
  contactForm?: any
}

export const community: (args: CommunityArgs) => any = ({ heroImage, metaImage, contactForm }) => {
  return {
    slug: 'community',
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
                  text: 'Join the WDEG Community',
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
                  text: 'Connect with believers seeking to understand biblical prophecy and prepare for the end times.',
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
      {        blockName: 'Community Features',
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
                        text: "The WDEG community brings together believers from all walks of life who are seeking to understand biblical prophecy and prepare their hearts for the Lord's return. Our platform provides a safe space for fellowship, study, and spiritual growth.",
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
                        text: 'Community Features',
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
                        text: '• Bible Study Groups - Join online and local groups studying end times prophecy and biblical truth\n• Prayer Circles - Connect with fellow believers for prayer and spiritual support\n• Testimony Sharing - Share how God is working in your life and preparing your heart\n• Prophecy Discussions - Engage in thoughtful conversations about current events and biblical prophecy\n• Resource Library - Access recommended books, sermons, and study materials\n• Event Notifications - Stay informed about conferences, revivals, and community gatherings',
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
                        text: 'Growing in Faith Together',
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
                        text: "Whether you're a new believer seeking to understand God's plan or a mature Christian looking to deepen your knowledge of prophecy, our community welcomes you. We believe in supporting one another as we watch and wait for our Lord's return.",
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
                        text: 'Connect With Us',
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
                        text: "Have questions about biblical prophecy or want to connect with other believers in your area? We'd love to hear from you. Contact us through our contact page or join one of our online fellowship groups.",
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
      {        title: 'Choose Your Language',
        subtitle: 'Experience "Where Did Everyone Go?" in your preferred language',
        displayStyle: 'grid',
        showFlags: true,
        blockName: 'Language Selector',
        enabledLanguages: ['ar', 'de', 'en', 'es', 'fr', 'he', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'ru', 'sv', 'zh'],
        blockType: 'languageSelector',
      },
    ],
    meta: {
      title: 'Community | WDEG',
      image: metaImage?.id,
      description:
        'Join the WDEG community of believers studying biblical prophecy, preparing for the end times, and growing in faith together.',
    },
    title: 'Community | WDEG',
    publishedAt: '2025-09-04T17:55:31.405Z',
  }
}
