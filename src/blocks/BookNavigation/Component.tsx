import React from 'react'
import BookNavigation from '@/components/BookNavigation'

interface BookNavigationBlockProps {
  currentPage: number
  totalPages?: number
  baseUrl?: string
  disableInnerContainer?: boolean
}

export const BookNavigationBlock: React.FC<BookNavigationBlockProps> = ({
  currentPage,
  totalPages = 26,
  baseUrl = '/book',
  disableInnerContainer: _disableInnerContainer,
}) => {
  return <BookNavigation currentPage={currentPage} totalPages={totalPages} baseUrl={baseUrl} />
}

export default BookNavigationBlock
