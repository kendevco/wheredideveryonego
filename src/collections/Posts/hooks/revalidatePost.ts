import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/posts/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      // Revalidate the individual post page
      revalidatePath(path)

      // Revalidate posts listing and archive pages
      revalidatePath('/posts')
      revalidatePath('/') // Home page might show recent posts

      // Revalidate sitemap
      revalidateTag('posts-sitemap')

      // Revalidate any pages that might display posts
      revalidateTag('posts')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/posts/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidatePath('/posts')
      revalidatePath('/')
      revalidateTag('posts-sitemap')
      revalidateTag('posts')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/posts/${doc?.slug}`

    // Revalidate the deleted post path
    revalidatePath(path)

    // Revalidate posts listing and archive pages
    revalidatePath('/posts')
    revalidatePath('/')

    // Revalidate sitemap and tags
    revalidateTag('posts-sitemap')
    revalidateTag('posts')
  }

  return doc
}
