#!/usr/bin/env node

import fetch from 'node-fetch'

async function runSeed() {
  const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  // Check for --reset flag
  const reset = process.argv.includes('--reset')

  console.log('🌱 Starting database seeding...')
  console.log(`📡 Connecting to: ${url}/api/seed`)

  if (reset) {
    console.log('⚠️  RESET MODE: Will clear all existing data!')
  } else {
    console.log('🔄 RESILIENT MODE: Will preserve existing data')
    console.log('💡 Use --reset flag to clear all data before seeding')
  }

  try {
    const response = await fetch(`${url}/api/seed?reset=${reset}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()

    if (result.success) {
      console.log('✅ Database seeded successfully!')
      console.log(result.message)
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
