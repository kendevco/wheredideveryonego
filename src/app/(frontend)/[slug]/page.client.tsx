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
    // Don't override header theme - let it inherit from global theme
    // setHeaderTheme(undefined as any)
  }, [router, setHeaderTheme])

  return null
}
