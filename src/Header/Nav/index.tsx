'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useTheme } from '@/providers/Theme'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const { headerTheme } = useHeaderTheme()
  const { theme } = useTheme()

  // Smart theme logic:
  // - If headerTheme is set, it indicates the page wants to override header styling
  // - But we still need to consider user's actual theme for proper contrast
  // - For pages with hero images (headerTheme='dark'), use white text only if it won't clash
  const getTextClasses = () => {
    if (headerTheme === 'dark') {
      // Page wants dark header theme (like Posts page with hero image)
      // Use white text with good contrast
      return 'text-white hover:text-white/90 drop-shadow-sm'
    } else if (headerTheme === 'light') {
      // Page explicitly wants light header theme
      return 'text-gray-900 hover:text-primary'
    } else {
      // No header theme override - use responsive classes based on user theme
      return 'text-gray-900 dark:text-white hover:text-primary'
    }
  }

  const textClasses = getTextClasses()

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" className={textClasses} />
      })}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className={`w-5 ${textClasses}`} />
      </Link>
      {/* Hide theme selector on mobile since footer has one */}
      <div className="hidden sm:block">
        <ThemeSelector />
      </div>
    </nav>
  )
}
