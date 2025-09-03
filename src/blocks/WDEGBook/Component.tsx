import React from 'react'
import { DynamicWDEGBook } from '@/components/WDEGBook/DynamicBook'

export type WDEGBookBlockType = {
  blockName?: string
  blockType?: 'wdegBook'
  initialLanguage?: string
  showLanguageSelector?: boolean
  defaultViewMode?: 'single' | 'all'
}

export const WDEGBookBlock: React.FC<WDEGBookBlockType> = ({
  initialLanguage = 'en',
  showLanguageSelector = true,
  defaultViewMode = 'single',
}) => {
  return (
    <div className="container mx-auto">
      <DynamicWDEGBook initialLanguage={initialLanguage} className="py-8" />
    </div>
  )
}

