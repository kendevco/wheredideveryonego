import type { Block } from 'payload'

export const LanguageSelector: Block = {
  slug: 'languageSelector',
  interfaceName: 'LanguageSelectorBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Choose Your Language',
      admin: {
        description: 'Main heading for the language selector',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'Experience "Where Did Everyone Go?" in your preferred language',
      admin: {
        description: 'Subtitle text below the main heading',
      },
    },
    {
      name: 'displayStyle',
      type: 'select',
      defaultValue: 'grid',
      options: [
        {
          label: 'Grid Layout',
          value: 'grid',
        },
        {
          label: 'List Layout',
          value: 'list',
        },
      ],
      admin: {
        description: 'How to display the language options',
      },
    },
    {
      name: 'showFlags',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show flag emojis next to language names',
      },
    },
    {
      name: 'enabledLanguages',
      type: 'select',
      hasMany: true,
      defaultValue: ['en', 'es', 'fr', 'de', 'it', 'pt', 'pl', 'ar', 'he', 'jp'],
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
        { label: '日本語', value: 'jp' },
      ],
      admin: {
        description: 'Select which languages to display (all are selected by default)',
      },
    },
  ],
}