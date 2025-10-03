import type { Media, User } from '@/payload-types'

export type PostArgs = {
  heroImage: Media | null
  blockImage?: Media | null
  author: User | null
}

export const post1: (args: PostArgs) => any = ({ heroImage, blockImage, author }) => {
  return {
    slug: 'time-for-good-news',
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
            type: 'block',
            fields: {
              id: heroImage?.id,
              style: 'success',
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
                          text: 'Good News: ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                        {
                          mode: 'normal',
                          text: 'The picture of doom painted here does not have to be your future. God is merciful and fervently desires that none should perish. In Christ, God made a way for broken people to be restored, adopted, and brought near as His own beloved children.',
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
              blockName: 'Hope in Christ',
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
                text: 'Time for Some Good News! ',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
              {
                mode: 'normal',
                text: "God's message of grace ",
                type: 'text',
                style: '',
                detail: 0,
                format: 2,
                version: 1,
              },
              {
                mode: 'normal',
                text: 'demonstrates His immense love for us, as He desires to spend eternity with us.',
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
                text: 'Knowing we would sin and be separated from Him, He had a redemptive plan even before time began. He sent His Son, Jesus Christ, to pay the ultimate price for our sins so we might dwell eternally with Him. This was not a backup plan—it was the expression of His love from the very beginning. He created us to glorify and enjoy Him forever, yet our sin separated us from His presence.',
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
                text: 'Christ offered the perfect sacrifice, paying a debt He didn\'t owe—one we could never pay. If we receive this incredible gift and believe in the Son of God, Scripture says we are saved: "To all who received Him, to those who believed in His name, He gave the right to become children of God." (John 1:12-13)',
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
              blockName: 'Media Block Middle',
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
                text: 'The Narrow Gate: A Choice That Matters',
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
                text: 'Even with such a costly gift offered freely, not everyone will receive it. The invitation is open to all, but the path is not popular—and Scripture makes that painfully clear. Jesus said: "Enter through the narrow gate. Wide is the gate, and broad is the road that leads to destruction, and many enter through it. But small is the gate, and narrow is the road that leads to life, and only a few find it." (Matthew 7:13-14)',
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
                text: "He did everything necessary by dying for you. Won't you make the right choice today? Time is rapidly running out. Today is the day of salvation—not tomorrow, not someday. Apart from Christ, your future holds nothing worthwhile, for the world and its evil desires are passing away. The birth pains are accelerating, becoming more intense with each passing day.",
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
                          text: '"Here I am! I stand at the door and knock. If anyone hears my voice and opens the door, I will come in and dine with him, and he with Me." (Revelation 3:20)',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          mode: 'normal',
                          text: "He is knocking at your door to save you, not to condemn you. The door only opens from the inside, and He will not force His way in. Don't let the noise of this life drown out the most important invitation you will ever receive. The time to come home is now.",
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
                  ],
                  direction: 'ltr',
                },
              },
              blockName: 'Answer the Call',
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
      title: 'Time for Some Good News!',
      image: heroImage?.id,
      description:
        "Time for Some Good News! God's message of grace demonstrates His immense love for us, as He desires to spend eternity with us. The picture of doom does not have to be your future.",
    },
    relatedPosts: [], // this is populated by the seed script
    title: 'Time for Some Good News!',
    categories: [], // this will be populated by the seed script
    publishedAt: '2025-09-04T17:52:34.133Z',
  }
}
