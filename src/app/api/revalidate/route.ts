import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')
    const path = searchParams.get('path')
    const tag = searchParams.get('tag')

    // Check for secret to prevent unauthorized revalidation
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // Revalidate specific path
    if (path) {
      revalidatePath(path)
      return NextResponse.json({
        revalidated: true,
        path,
        message: `Revalidated path: ${path}`,
      })
    }

    // Revalidate specific tag
    if (tag) {
      revalidateTag(tag)
      return NextResponse.json({
        revalidated: true,
        tag,
        message: `Revalidated tag: ${tag}`,
      })
    }

    // Revalidate all posts-related paths and tags
    revalidatePath('/')
    revalidatePath('/posts')
    revalidateTag('posts')
    revalidateTag('posts-sitemap')
    revalidateTag('pages-sitemap')

    return NextResponse.json({
      revalidated: true,
      message: 'Revalidated all posts and pages',
    })
  } catch (err) {
    return NextResponse.json(
      {
        message: 'Error revalidating',
        error: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
