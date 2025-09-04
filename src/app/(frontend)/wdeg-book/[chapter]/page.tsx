import type { Metadata } from 'next/types'
import { DynamicWDEGBook } from '@/components/WDEGBook/DynamicBook'
import { redirect } from 'next/navigation'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

type Args = {
  params: Promise<{
    locale: string
    chapter: string
  }>
}

export default async function WDEGChapterPage({ params: paramsPromise }: Args) {
  const { locale, chapter } = await paramsPromise

  // Extract page number from chapter parameter (e.g., "page-001" -> 1)
  const pageMatch = chapter.match(/page-(\d+)/)
  const pageNumber = pageMatch ? parseInt(pageMatch[1], 10) : 1

  // Validate page number
  if (pageNumber < 1 || pageNumber > 26) {
    redirect(`/${locale}/wdeg-book`)
  }

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      <DynamicWDEGBook
        initialLanguage={locale === 'en' ? 'en' : locale}
        className="wdeg-chapter-view"
      />
    </article>
  )
}

export async function generateStaticParams() {
  const chapters = Array.from({ length: 26 }, (_, i) => {
    const pageNumber = (i + 1).toString().padStart(3, '0')
    return { chapter: `page-${pageNumber}` }
  })

  return chapters
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { chapter } = await paramsPromise
  const pageMatch = chapter.match(/page-(\d+)/)
  const pageNumber = pageMatch ? parseInt(pageMatch[1], 10) : 1

  const chapterTitles = [
    "Something's Wrong With The World",
    'Mystery of the Mass Disappearance',
    'The Rapture Is Closer Than You Think',
    'Unveiling the Timing of End-Time Events',
    'The 14 Events of the Rapture',
    "God's Prophetic Timeline",
    'The Great Tribulation',
    'God Judges Evil, Rescues the Righteous',
    'Protection from Divine Judgment',
    "It's All About the Wedding!",
    'The Bride of Christ',
    'The Parable of the Ten Virgins',
    'Wise and Foolish Virgins',
    'Signs of the Times',
    'Birth Pains Intensifying',
    'What Happens During the Tribulation?',
    'The Seven Trumpets and Bowls',
    'Time for Some Good News!',
    'The Narrow Gate',
    'Come to Jesus and Receive New Life',
    'Walking in New Life',
    'Behold Your New Future in Christ',
    'Living in Hope',
    'The Promise of His Coming',
    'Until That Glorious Day Comes',
    'Joy Unrelenting in Prayer and Praise',
  ]

  const chapterTitle = chapterTitles[pageNumber - 1] || 'Chapter'

  return {
    title: `Chapter ${pageNumber}: ${chapterTitle} | Where Did Everyone Go?`,
    description: `Read Chapter ${pageNumber} of "Where Did Everyone Go?" - ${chapterTitle}. A biblical guide to understanding the Rapture and End Times.`,
    openGraph: {
      title: `Chapter ${pageNumber}: ${chapterTitle}`,
      description: `Read Chapter ${pageNumber} of "Where Did Everyone Go?" - ${chapterTitle}`,
      type: 'article',
    },
  }
}
