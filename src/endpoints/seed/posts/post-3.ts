import type { Media, User } from '@/payload-types'

export type PostArgs = {
  heroImage: Media | null
  blockImage?: Media | null
  author: User | null
}

export const post3: (args: PostArgs) => any = ({ heroImage, blockImage, author }) => {
  return {
    slug: 'something-wrong-with-the-world',
    _status: 'published',
    authors: [author],
    content: {
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
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: "People everywhere can sense it—something just isn't right. The Bible lays out a prophetic blueprint explaining our present chaos and the storm still ahead.",
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
            type: 'block',
            fields: {
              id: heroImage?.id,
              style: 'warning',
              content: {
                root: {
                  type: 'root',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          mode: 'normal',
                          text: 'Note:',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                        {
                          mode: 'normal',
                          text: ' This book is meant to be found in that hour of desperation—to point to the only truth that matters. When millions vanish in an instant, books like this will provide answers.',
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
              blockName: 'Important Message',
              blockType: 'banner',
            },
            format: '',
            version: 2,
          },
          {
            tag: 'h2',
            type: 'heading',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: "Don't Ignore the Turmoil Around You",
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
                text: "Everything's changing so fast, and it's been a brutal, nonstop grind. First, the COVID-19 pandemic, then the riots, and now our world is on the verge of being overthrown from within and without—all while the World Economic Forum is implementing its plan for world domination.",
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            textStyle: '',
            textFormat: 0,
          },
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: "Has the world gone crazy? The issues we face today are unprecedented: pipeline sabotage, drought, food and water shortages, fuel crises, moral decay, artificial intelligence disruptions, the dollar's decline, government corruption, concentration camps, geopolitical tensions in Ukraine and Taiwan, child trafficking, abortion, mass shootings, constant surveillance, a boiling crisis in the Middle East, global instability, looming nuclear war, the risk of an electromagnetic pulse (EMP) shutting down everything—the list goes on.",
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            textStyle: '',
            textFormat: 0,
          },
          {
            tag: 'h3',
            type: 'heading',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: 'The Beast System is Already Here',
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
                text: "Technology has paved the way for the Beast System, with Big Data recording everything about you. Where you spend your money, where you go, and everything you communicate electronically is stored for future use. The government is actively pushing for a digital currency, which will eliminate privacy in financial transactions. Eventually, those who do not conform to the state's dictates will have their accounts shut down.",
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            textStyle: '',
            textFormat: 0,
          },
          {
            type: 'block',
            fields: {
              id: heroImage?.id,
              media: heroImage?.id,
              blockName: 'Page10',
              blockType: 'mediaBlock',
            },
            format: '',
            version: 2,
          },
          {
            tag: 'h2',
            type: 'heading',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: 'The Rising Discourse About Aliens and UFOs',
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
                text: 'Recently, the U.S. Navy admitted we are not alone, releasing videos of pilots encountering unidentified aerial phenomena performing maneuvers impossible with human technology. Scientists from the Search for Extra-Terrestrial Intelligence (SETI) report repeating radio frequency bursts across the galaxy, which they suggest might be from intelligent sources.',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            textStyle: '',
            textFormat: 0,
          },
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: "With increasing chatter about alien encounters, governments are being pushed to declassify what they know about these visitations. It won't be long before world leaders announce: \"The aliens are here!\" This is the unsettling reality we now face—a reality we can't ignore. It sets the stage for what's coming next.",
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            textStyle: '',
            textFormat: 0,
          },
          {
            type: 'block',
            fields: {
              id: heroImage?.id,
              style: 'warning',
              content: {
                root: {
                  type: 'root',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          mode: 'normal',
                          text: 'The signs are all around us.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                        {
                          mode: 'normal',
                          text: ' The birth pains are accelerating, becoming more intense with each passing day. This is not a time for casual faith—it is a time to wake up, be alert, and walk in the light. Will you be ready when He comes for His bride?',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                  ],
                  direction: 'ltr',
                  textFormat: 1,
                },
              },
              blockName: 'Call to Action',
              blockType: 'banner',
            },
            format: '',
            version: 2,
          },
        ],
        direction: 'ltr',
      },
      media: null,
    },
    heroImage: heroImage?.id,
    meta: {
      title: "Something's Wrong With The World",
      image: heroImage?.id,
      description:
        "People everywhere can sense it—something just isn't right. The Bible lays out a prophetic blueprint explaining our present chaos and the storm still ahead.",
    },
    relatedPosts: [], // this is populated by the seed script
    title: "Something's Wrong With The World",
    categories: [], // this will be populated by the seed script
    publishedAt: '2025-09-04T17:52:32.332Z',
  }
}
