import type { Metadata } from 'next/types'
import { DynamicWDEGBook } from '@/components/WDEGBook/DynamicBook'
import React, { Suspense } from 'react'
import PageClient from './page.client'

export default function WDEGBookPage() {
  return (
    <article className="pt-16 pb-24">
      <PageClient />
      <Suspense fallback={<div className="text-center py-12">Loading book...</div>}>
        <DynamicWDEGBook />
      </Suspense>
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Where Did Everyone Go? - Interactive Book | WDEG',
  description:
    'Experience "Where Did Everyone Go?" in multiple languages. A biblical guide to understanding the Rapture and End Times with revolutionary dynamic reading features.',
  openGraph: {
    title: 'Where Did Everyone Go? - Interactive Book',
    description:
      'A biblical guide to understanding the Rapture and End Times with dynamic reading features.',
    type: 'website',
  },
}
