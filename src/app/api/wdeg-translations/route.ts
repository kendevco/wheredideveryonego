import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const language = searchParams.get('lang') || 'en'
  const chapter = searchParams.get('chapter')

  console.log('🔍 WDEG API Debug - Request received:', { language, chapter })
  console.log('🔍 Process CWD:', process.cwd())

  try {
    // If requesting a specific chapter
    if (chapter) {
      const chapterNumber = chapter.toString().padStart(3, '0')
      const filePath = path.join(process.cwd(), 'public', 'wdeg', language, `${chapterNumber}.txt`)

      console.log('🔍 Looking for specific chapter file:', filePath)
      console.log('🔍 File exists?', fs.existsSync(filePath))

      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8')
        console.log('✅ Found chapter content, length:', content.length)
        return NextResponse.json({
          success: true,
          content,
          chapter: parseInt(chapter),
          language,
        })
      } else {
        console.log('❌ Chapter file not found:', filePath)
        return NextResponse.json(
          {
            success: false,
            error: `Chapter ${chapter} not found for language ${language}`,
            debug: { filePath, exists: false },
          },
          { status: 404 },
        )
      }
    }

    // If requesting all chapters for a language
    const languageDir = path.join(process.cwd(), 'public', 'wdeg', language)
    console.log('🔍 Looking for language directory:', languageDir)
    console.log('🔍 Directory exists?', fs.existsSync(languageDir))

    if (!fs.existsSync(languageDir)) {
      // Let's check what directories DO exist
      const wdegDir = path.join(process.cwd(), 'public', 'wdeg')
      console.log('🔍 WDEG base directory:', wdegDir)
      console.log('🔍 WDEG base exists?', fs.existsSync(wdegDir))

      if (fs.existsSync(wdegDir)) {
        const availableDirs = fs
          .readdirSync(wdegDir, { withFileTypes: true })
          .filter((dirent) => dirent.isDirectory())
          .map((dirent) => dirent.name)
        console.log('🔍 Available language directories:', availableDirs)

        return NextResponse.json(
          {
            success: false,
            error: `Language ${language} not supported`,
            debug: {
              languageDir,
              exists: false,
              availableLanguages: availableDirs,
              wdegBaseExists: true,
            },
          },
          { status: 404 },
        )
      } else {
        console.log('❌ WDEG base directory does not exist!')
        return NextResponse.json(
          {
            success: false,
            error: `WDEG directory not found`,
            debug: {
              wdegDir,
              exists: false,
            },
          },
          { status: 404 },
        )
      }
    }

    const chapters: { [key: number]: string } = {}
    const files = fs.readdirSync(languageDir)
    console.log('🔍 Files in language directory:', files)

    for (const file of files) {
      console.log('🔍 Checking file:', file)
      if (file.endsWith('.txt') && /^\d{3}\.txt$/.test(file)) {
        const chapterNum = parseInt(file.replace('.txt', ''))
        const filePath = path.join(languageDir, file)
        console.log('🔍 Reading chapter file:', filePath)
        const content = fs.readFileSync(filePath, 'utf-8')
        console.log('🔍 Chapter', chapterNum, 'content length:', content.length)
        chapters[chapterNum] = content
      } else {
        console.log('❌ File does not match pattern:', file)
      }
    }

    console.log('✅ Total chapters loaded:', Object.keys(chapters).length)
    console.log(
      '✅ Chapter numbers:',
      Object.keys(chapters)
        .map((k) => parseInt(k))
        .sort((a, b) => a - b),
    )

    return NextResponse.json({
      success: true,
      language,
      chapters,
      totalChapters: Object.keys(chapters).length,
      debug: {
        languageDir,
        filesFound: files,
        chaptersLoaded: Object.keys(chapters).length,
      },
    })
  } catch (error) {
    console.error('❌ Error loading WDEG translations:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load translations',
        debug: { error: (error as Error).message },
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  // Future: Allow updating translations via API
  return NextResponse.json({ message: 'Translation updates not implemented yet' })
}
