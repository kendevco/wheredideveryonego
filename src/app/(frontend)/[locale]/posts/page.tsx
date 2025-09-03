import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { RenderHero } from '@/heros/RenderHero'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  // Get the hero image (same as home page)
  const heroImage = await payload.find({
    collection: 'media',
    where: {
      alt: {
        equals: 'Straight metallic shapes with a blue gradient',
      },
    },
    limit: 1,
  })

  const hero = {
    type: 'highImpact' as const,
    media: heroImage.docs[0]?.id,
    richText: {
      root: {
        type: 'root' as const,
        children: [
          {
            type: 'heading' as const,
            children: [
              {
                type: 'text' as const,
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Posts & Articles',
                version: 1,
              },
            ],
            direction: 'ltr' as const,
            format: '',
            indent: 0,
            tag: 'h1',
            version: 1,
          },
          {
            type: 'paragraph' as const,
            children: [
              {
                type: 'text' as const,
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Explore biblical insights, prophecy updates, and spiritual guidance for understanding the times we live in.',
                version: 1,
              },
            ],
            direction: 'ltr' as const,
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
  }

  return (
    <article className="pt-16 pb-24">
      <PageClient />

      <RenderHero {...(hero as any)} />

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </article>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Where Did Everyone Go? Posts`,
  }
}
