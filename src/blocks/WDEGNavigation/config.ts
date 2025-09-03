import type { Block } from 'payload'

export const WDEGNavigationBlock: Block = {
  slug: 'wdegNavigation',
  labels: {
    singular: 'WDEG Navigation',
    plural: 'WDEG Navigation Blocks',
  },
  fields: [
    {
      name: 'currentPage',
      type: 'number',
      required: true,
      min: 1,
      max: 26,
      admin: {
        description: 'Current page number (1-26)',
      },
    },
    {
      name: 'totalPages',
      type: 'number',
      defaultValue: 26,
      admin: {
        description: 'Total number of pages in the book',
      },
    },
    {
      name: 'baseUrl',
      type: 'text',
      defaultValue: '/wdeg-book',
      admin: {
        description: 'Base URL for the book pages',
      },
    },
  ],
}
