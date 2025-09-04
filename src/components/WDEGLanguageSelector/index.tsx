'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'

interface Language {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'jp', name: '日本語', flag: '🇯🇵' },
]

interface WDEGLanguageSelectorProps {
  title?: string
  subtitle?: string
  className?: string
  showFlags?: boolean
  displayStyle?: 'grid' | 'list'
}

export const WDEGLanguageSelector: React.FC<WDEGLanguageSelectorProps> = ({
  title = 'Choose Your Language',
  subtitle = 'Experience "Where Did Everyone Go?" in your preferred language',
  className,
  showFlags = true,
  displayStyle = 'grid',
}) => {
  return (
    <div className={cn('w-full max-w-4xl mx-auto p-6', className)}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>
      </div>

      <div
        className={cn(
          displayStyle === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'
            : 'flex flex-col space-y-3',
        )}
      >
        {languages.map((language) => (
          <Link
            key={language.code}
            href={`/wdeg-book?lang=${language.code}`}
            className={cn(
              'group relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700',
              'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700',
              'transition-all duration-200 ease-in-out',
              'hover:shadow-lg hover:scale-105',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              displayStyle === 'grid' ? 'p-4 text-center' : 'p-3 flex items-center space-x-3',
            )}
          >
            {showFlags && (
              <span
                className={cn('text-2xl', displayStyle === 'grid' ? 'block mb-2' : 'flex-shrink-0')}
              >
                {language.flag}
              </span>
            )}
            <div className={displayStyle === 'list' ? 'flex-1' : ''}>
              <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {language.name}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-blue-500/10 transition-all duration-200" />
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          More translations coming soon! Each language offers the full interactive reading
          experience.
        </p>
      </div>
    </div>
  )
}
