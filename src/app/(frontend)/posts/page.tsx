import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { RenderHero } from '@/heros/RenderHero'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

const getCachedPosts = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    return payload.find({
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
  },
  ['posts-page'],
  {
    tags: ['posts'],
    revalidate: 600,
  },
)

export default async function Page() {
  const payload = await getPayload({ config: configPromise })
  const posts = await getCachedPosts()

  // Get the WDEG hero image (same as home page)
  let heroImage = await payload.find({
    collection: 'media',
    where: {
      alt: {
        equals: 'Where Did Everyone Go? - Main Hero Background',
      },
    },
    limit: 1,
  })

  // Fallback to filename search if alt text search fails
  if (!heroImage.docs.length) {
    heroImage = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: 'wdeg.jpg',
        },
      },
      limit: 1,
    })
  }

  // Final fallback to any WDEG image
  if (!heroImage.docs.length) {
    heroImage = await payload.find({
      collection: 'media',
      where: {
        alt: {
          contains: 'WDEG',
        },
      },
      limit: 1,
    })
  }

  // Debug logging
  console.log('Posts page hero image search results:', {
    found: heroImage.docs.length > 0,
    imageId: heroImage.docs[0]?.id,
    imageAlt: heroImage.docs[0]?.alt,
    imageFilename: heroImage.docs[0]?.filename,
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
