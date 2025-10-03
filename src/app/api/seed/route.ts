import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { seed } from '@/endpoints/seed'

export async function POST(request: NextRequest) {
  // Disable seeding in production for security
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      {
        success: false,
        error: 'Seeding is disabled in production',
      },
      { status: 403 },
    )
  }

  try {
    const payload = await getPayload({ config: configPromise })

    // Check for reset flag in query params or body
    const { searchParams } = new URL(request.url)
    const resetFromQuery = searchParams.get('reset') === 'true'

    let resetFromBody = false
    try {
      const body = await request.json()
      resetFromBody = body?.reset === true
    } catch {
      // No body or invalid JSON, ignore
    }

    const reset = resetFromQuery || resetFromBody

    // Create a mock request object for the seed function
    const req = {
      payload,
      user: null,
    }

    // Run the seed function
    await seed({ payload, req: req as any, reset })

    return NextResponse.json({
      success: true,
      message: `Database seeded successfully ${reset ? '(full reset performed)' : '(resilient mode - existing data preserved)'}`,
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
