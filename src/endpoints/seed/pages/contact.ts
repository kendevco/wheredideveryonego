import type { Media } from '@/payload-types'

type ContactArgs = {
  heroImage?: Media
  metaImage?: Media
  contactForm?: any
}

export const contact: (args: ContactArgs) => any = ({ heroImage, metaImage, contactForm }) => {
  return {
    slug: 'contact',
    _status: 'published',
    hero: {
      type: 'highImpact',
      richText: null,
      links: [],
      media: heroImage?.id,
    },
    layout: [
      {        form: contactForm?.id,
        enableIntro: true,
        introContent: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                tag: 'h3',
                type: 'heading',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    mode: 'normal',
                    text: 'We welcome your feedback:',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
              },
            ],
            direction: 'ltr',
          },
        },
        blockName: 'Contact',
        blockType: 'formBlock',
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
      title: null,
      image: null,
      description: null,
    },
    title: 'Contact',
    publishedAt: '2025-09-04T17:58:51.686Z',
  }
}
