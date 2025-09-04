import type { Block } from 'payload'

export const WDEGBookBlock: Block = {
  slug: 'wdegBook',
  labels: {
    singular: 'WDEG Book',
    plural: 'WDEG Book Blocks',
  },
  fields: [
    {
      name: 'initialLanguage',
      type: 'select',
      defaultValue: 'en',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Español', value: 'es' },
        { label: 'Français', value: 'fr' },
        { label: 'Deutsch', value: 'de' },
        { label: 'Italiano', value: 'it' },
        { label: 'Português', value: 'pt' },
        { label: 'Polski', value: 'pl' },
        { label: 'العربية', value: 'ar' },
        { label: 'עברית', value: 'he' },
      ],
      admin: {
        description: 'Default language to display when the page loads',
      },
    },
    {
      name: 'showLanguageSelector',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show the language selector dropdown',
      },
    },
    {
      name: 'defaultViewMode',
      type: 'select',
      defaultValue: 'single',
      options: [
        { label: 'Single Chapter', value: 'single' },
        { label: 'Complete Book', value: 'all' },
      ],
      admin: {
        description: 'Default view mode when the page loads',
      },
    },
  ],
}


