#!/usr/bin/env node

/**
 * Simple script to extract current posts and pages content from Payload
 * Run this with: node scripts/extract-current-content.js
 */

import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function extractContent() {
  console.log('🔍 Starting content extraction...')

  try {
    // We'll use the REST API to get the data
    const baseUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'

    console.log('📖 Fetching posts...')
    const postsResponse = await fetch(`${baseUrl}/api/posts?depth=2&limit=100`)
    const postsData = await postsResponse.json()

    console.log('📄 Fetching pages...')
    const pagesResponse = await fetch(`${baseUrl}/api/pages?depth=2&limit=100`)
    const pagesData = await pagesResponse.json()

    console.log('🖼️ Fetching media...')
    const mediaResponse = await fetch(`${baseUrl}/api/media?depth=1&limit=500`)
    const mediaData = await mediaResponse.json()

    console.log('📂 Fetching categories...')
    const categoriesResponse = await fetch(`${baseUrl}/api/categories?depth=1&limit=100`)
    const categoriesData = await categoriesResponse.json()

    // Create output directory
    const outputDir = path.join(process.cwd(), 'extracted-content')
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Save raw data
    fs.writeFileSync(
      path.join(outputDir, 'posts-raw.json'),
      JSON.stringify(postsData, null, 2),
      'utf8',
    )

    fs.writeFileSync(
      path.join(outputDir, 'pages-raw.json'),
      JSON.stringify(pagesData, null, 2),
      'utf8',
    )

    fs.writeFileSync(
      path.join(outputDir, 'media-raw.json'),
      JSON.stringify(mediaData, null, 2),
      'utf8',
    )

    fs.writeFileSync(
      path.join(outputDir, 'categories-raw.json'),
      JSON.stringify(categoriesData, null, 2),
      'utf8',
    )

    console.log('✅ Content extraction complete!')
    console.log(`📁 Raw data saved to: ${outputDir}`)
    console.log(`📊 Found:`)
    console.log(`   - ${postsData.docs?.length || 0} posts`)
    console.log(`   - ${pagesData.docs?.length || 0} pages`)
    console.log(`   - ${mediaData.docs?.length || 0} media items`)
    console.log(`   - ${categoriesData.docs?.length || 0} categories`)
  } catch (error) {
    console.error('❌ Error extracting content:', error)
    console.log('\n💡 Make sure your Payload server is running on http://localhost:3000')
    console.log('   Or set PAYLOAD_PUBLIC_SERVER_URL environment variable')
  }
}

// Run the extraction
extractContent()
