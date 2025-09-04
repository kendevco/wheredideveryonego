import type { Metadata } from 'next/types'
import { DynamicWDEGBook } from '@/components/WDEGBook/DynamicBook'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-dynamic'

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function WDEGBookPage({ searchParams }: Props) {
  const params = await searchParams
  const language = typeof params.lang === 'string' ? params.lang : 'en'

  // Validate language
  const availableLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'pl', 'ar', 'he', 'jp']
  const selectedLanguage = availableLanguages.includes(language) ? language : 'en'

  console.log('🔍 WDEGBookPage - searchParams:', params)
  console.log('🔍 WDEGBookPage - language from params:', language)
  console.log('🔍 WDEGBookPage - selectedLanguage:', selectedLanguage)

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      <DynamicWDEGBook initialLanguage={selectedLanguage} />
    </article>
  )
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams
  const language = typeof params.lang === 'string' ? params.lang : 'en'

  const languageNames = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
    it: 'Italiano',
    pt: 'Português',
    pl: 'Polski',
    ar: 'العربية',
    he: 'עברית',
    jp: '日本語',
  }

  const availableLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'pl', 'ar', 'he', 'jp']
  const selectedLanguage = availableLanguages.includes(language) ? language : 'en'
  const languageName = languageNames[selectedLanguage as keyof typeof languageNames]

  return {
    title: `Where Did Everyone Go? - ${languageName} | WDEG`,
    description: `Experience "Where Did Everyone Go?" in ${languageName}. A biblical guide to understanding the Rapture and End Times with revolutionary dynamic reading features.`,
    openGraph: {
      title: `Where Did Everyone Go? - ${languageName}`,
      description: `A biblical guide to understanding the Rapture and End Times in ${languageName}.`,
      type: 'website',
    },
  }
}
