'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function PageClient() {
  const params = useParams()

  useEffect(() => {
    const chapter = params.chapter as string
    const pageMatch = chapter?.match(/page-(\d+)/)
    const pageNumber = pageMatch ? parseInt(pageMatch[1], 10) : 1

    // Update page title for specific chapter
    document.title = `Chapter ${pageNumber} | Where Did Everyone Go?`
  }, [params])

  return null
}
