import type { Metadata } from 'next/types'
import { DynamicWDEGBook } from '@/components/WDEGBook/DynamicBook'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function WDEGBookPage() {
  return (
    <article className="pt-16 pb-24">
      <PageClient />
      <DynamicWDEGBook initialLanguage="en" />
    </article>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Where Did Everyone Go? - Complete Book | WDEG',
    description:
      'Experience the complete "Where Did Everyone Go?" book with revolutionary dynamic reading features. Available in 9 languages with instant switching, chapter navigation, and real-time content loading. A biblical guide to understanding the Rapture and End Times.',
    openGraph: {
      title: 'Where Did Everyone Go? - Complete Book',
      description:
        'A biblical guide to understanding the Rapture and End Times. Available in 9 languages with dynamic content loading.',
      type: 'website',
    },
  }
}
