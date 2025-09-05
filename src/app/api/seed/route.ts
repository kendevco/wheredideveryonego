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

    // Create a mock request object for the seed function
    const req = {
      payload,
      user: null,
    }

    // Run the seed function
    await seed({ payload, req: req as any })

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
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
