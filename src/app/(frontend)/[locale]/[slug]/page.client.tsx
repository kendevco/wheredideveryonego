'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useHeaderTheme } from '@/providers/HeaderTheme'

export default function PageClient() {
  const router = useRouter()
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    // Prefetch common routes for better performance
    router.prefetch('/')
    // Set header theme according to system preference (do not force light/dark)
    setHeaderTheme(undefined as any)
  }, [router, setHeaderTheme])

  return null
}
