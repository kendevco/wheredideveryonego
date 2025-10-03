import React from 'react'
import { DynamicBookViewer } from '@/components/BookViewer/DynamicBook'

export type BookViewerBlockType = {
  blockName?: string
  blockType?: 'BookViewer'
  initialLanguage?: string
  showLanguageSelector?: boolean
  defaultViewMode?: 'single' | 'all'
}

export const BookViewerBlock: React.FC<BookViewerBlockType> = ({
  initialLanguage = 'en',
  showLanguageSelector: _showLanguageSelector = true,
  defaultViewMode: _defaultViewMode = 'single',
}) => {
  return (
    <div className="container mx-auto">
      <DynamicBookViewer initialLanguage={initialLanguage} className="py-8" />
    </div>
  )
}
