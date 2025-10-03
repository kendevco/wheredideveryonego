import type { Media, User } from '@/payload-types'

export type PostArgs = {
  heroImage: Media | null
  blockImage?: Media | null
  author: User | null
}

export const post2: (args: PostArgs) => any = ({ heroImage, blockImage, author }) => {
  return {
    slug: 'mystery-of-mass-disappearance',
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
                text: 'Any day now, millions of people will mysteriously vanish from the Earth at the peak of global chaos. The world will ask in unison: "Where did everyone go?"',
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
              style: 'info',
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
                          text: 'Scripture says:',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                        {
                          mode: 'normal',
                          text: ' "For the Lord Himself will descend from heaven with a cry of command, the voice of the archangel, and the sound of the trumpet of God. And the dead in Christ will rise first. Then we who are alive, who are left, will be caught up with them in the clouds to meet the Lord in the air." (1 Thessalonians 4:16-17)',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textFormat: 1,
                    },
                  ],
                  direction: 'ltr',
                },
              },
              blockName: 'Biblical Truth',
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
                text: 'The Rapture Is Closer Than You Think',
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
                text: 'Imagine you are driving to pick up groceries when an old Toyota suddenly veers out of control, crashing into a school bus that was dropping off children. You see the bus driver frantically looking around, searching for the missing kids. He stumbles into the street, only to be struck by an oncoming car. Then it dawns on you—cars are crashing all around.',
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
                text: 'Within minutes, you see a plane nosedive behind the grocery store, hitting the ground with a deafening explosion, sending fire and debris in every direction. How is this happening, you wonder, your hands shaking uncontrollably? You drive home in a panic, weaving frantically through the wreckage.',
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
                text: "You turn on the radio and hear sheer madness: Entire schools of children—particularly the youngest—are missing and unaccounted for; driverless cars crash into buildings; planes fall out of the sky; trains derail—pandemonium. Loved ones gone without a trace. The broadcasters sound shaken, unsure of what they're reading from the teleprompter. ",
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
                text: 'Videos roll in—two friends walking side by side, and in an instant, one is gone. A nanny cam records a room full of preschoolers napping peacefully until, one by one, their blankets collapse as if an unseen force has plucked them away. The same eerie scenes play on every station, in every language, across every country.',
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
                          text: 'This is our hope—',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                        {
                          mode: 'normal',
                          text: 'the hope of never dying, of being transformed in an instant, and of being rescued from this sin-sick planet before the Great and Terrible Day of the Lord. It is not fear that drives this hope, but love—a longing to be with the One who promised, "I go to prepare a place for you."',
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
              blockName: 'The Hope of the Rapture',
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
      title: 'Mystery of the Mass Disappearance',
      image: heroImage?.id,
      description:
        'Any day now, millions of people will mysteriously vanish from the Earth at the peak of global chaos. The world will ask in unison: "Where did everyone go?"',
    },
    relatedPosts: [], // this is populated by the seed script
    title: 'Mystery of the Mass Disappearance',
    categories: [], // this will be populated by the seed script
    publishedAt: '2025-09-04T17:52:33.173Z',
  }
}
