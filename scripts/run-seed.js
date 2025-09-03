#!/usr/bin/env node

import fetch from 'node-fetch'

async function runSeed() {
  const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  console.log('🌱 Starting database seeding...')
  console.log(`📡 Connecting to: ${url}/api/seed`)

  try {
    const response = await fetch(`${url}/api/seed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()

    if (result.success) {
      console.log('✅ Database seeded successfully!')
      console.log('📊 You can now access:')
      console.log(`   • Admin Panel: ${url}/admin`)
      console.log(`   • Frontend: ${url}`)
      process.exit(0)
    } else {
      console.error('❌ Seeding failed:', result.error)
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ Failed to connect to seed endpoint:', error.message)
    console.log('💡 Make sure the development server is running: pnpm dev')
    process.exit(1)
  }
}

runSeed()
