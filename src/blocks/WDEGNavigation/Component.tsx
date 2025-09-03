import React from 'react'
import WDEGNavigation from '@/components/WDEGNavigation'

interface WDEGNavigationBlockProps {
  currentPage: number
  totalPages?: number
  baseUrl?: string
  disableInnerContainer?: boolean
}

export const WDEGNavigationBlock: React.FC<WDEGNavigationBlockProps> = ({
  currentPage,
  totalPages = 26,
  baseUrl = '/wdeg-book',
  disableInnerContainer,
}) => {
  return <WDEGNavigation currentPage={currentPage} totalPages={totalPages} baseUrl={baseUrl} />
}

export default WDEGNavigationBlock
