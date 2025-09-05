'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme: _setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    // Only reset header theme on pathname change if it was explicitly set
    // Don't reset to null on every navigation - let pages set their own theme if needed
    // setHeaderTheme(null)
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Dynamic header styling based on headerTheme
  const getHeaderClasses = () => {
    if (headerTheme === 'dark') {
      // Add semi-transparent background for better contrast with white text
      return 'container relative z-20 bg-black/20 backdrop-blur-sm'
    } else {
      return 'container relative z-20'
    }
  }

  return (
    <header className={getHeaderClasses()}>
      <div className="py-8 flex justify-between">
        <Link href="/">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>
        <div className="flex items-center gap-4">
          <HeaderNav data={data} />
        </div>
      </div>
    </header>
  )
}
