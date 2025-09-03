'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import styles from './styles.module.css'

interface WDEGNavigationProps {
  currentPage: number
  totalPages: number
  baseUrl?: string
}

const pageMetadata = [
  { pageNumber: 1, title: "Something's Wrong With The World" },
  { pageNumber: 2, title: 'Mystery of the Mass Disappearance' },
  { pageNumber: 3, title: 'The Rapture Is Closer Than You Think' },
  { pageNumber: 4, title: 'Unveiling the Timing of End-Time Events' },
  { pageNumber: 5, title: 'The 14 Events of the Rapture' },
  { pageNumber: 6, title: "God's Prophetic Timeline" },
  { pageNumber: 7, title: 'The Great Tribulation' },
  { pageNumber: 8, title: 'God Judges Evil, Rescues the Righteous' },
  { pageNumber: 9, title: 'Protection from Divine Judgment' },
  { pageNumber: 10, title: "It's All About the Wedding!" },
  { pageNumber: 11, title: 'The Bride of Christ' },
  { pageNumber: 12, title: 'The Parable of the Ten Virgins' },
  { pageNumber: 13, title: 'Wise and Foolish Virgins' },
  { pageNumber: 14, title: 'Signs of the Times' },
  { pageNumber: 15, title: 'Birth Pains Intensifying' },
  { pageNumber: 16, title: 'What Happens During the Tribulation?' },
  { pageNumber: 17, title: 'The Seven Trumpets and Bowls' },
  { pageNumber: 18, title: 'Time for Some Good News!' },
  { pageNumber: 19, title: 'The Narrow Gate' },
  { pageNumber: 20, title: 'Come to Jesus and Receive New Life' },
  { pageNumber: 21, title: 'Walking in New Life' },
  { pageNumber: 22, title: 'Behold Your New Future in Christ' },
  { pageNumber: 23, title: 'Living in Hope' },
  { pageNumber: 24, title: 'The Promise of His Coming' },
  { pageNumber: 25, title: 'Until That Glorious Day Comes' },
  { pageNumber: 26, title: 'Joy Unrelenting in Prayer and Praise' },
]

export const WDEGNavigation: React.FC<WDEGNavigationProps> = ({
  currentPage,
  totalPages = 26,
  baseUrl = '/wdeg-book',
}) => {
  const prevPage = currentPage > 1 ? currentPage - 1 : null
  const nextPage = currentPage < totalPages ? currentPage + 1 : null

  const formatPageNumber = (pageNum: number) => String(pageNum).padStart(3, '0')

  return (
    <div className="border-t border-gray-200 bg-white">
      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${(currentPage / totalPages) * 100}%` }}
        />
      </div>

      {/* Navigation Controls */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Previous Page */}
          <div className="flex-1">
            {prevPage && (
              <Link
                href={`${baseUrl}/page-${formatPageNumber(prevPage)}`}
                className="group flex items-center space-x-2 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                <ChevronLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Previous</div>
                  <div className="text-sm text-gray-900">
                    Page {prevPage}: {pageMetadata[prevPage - 1]?.title}
                  </div>
                </div>
              </Link>
            )}
          </div>

          {/* Current Page Info */}
          <div className="flex-shrink-0 text-center">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <BookOpenIcon className="h-5 w-5" />
              <span>
                Page {currentPage} of {totalPages}
              </span>
            </div>
            <div className="mt-1 text-xs text-gray-400">{pageMetadata[currentPage - 1]?.title}</div>
          </div>

          {/* Next Page */}
          <div className="flex-1 text-right">
            {nextPage && (
              <Link
                href={`${baseUrl}/page-${formatPageNumber(nextPage)}`}
                className="group flex items-center justify-end space-x-2 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                <div className="text-right">
                  <div className="text-xs text-gray-400">Next</div>
                  <div className="text-sm text-gray-900">
                    Page {nextPage}: {pageMetadata[nextPage - 1]?.title}
                  </div>
                </div>
                <ChevronRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>

        {/* Chapter Navigation */}
        <div className="mt-6 border-t border-gray-100 pt-6">
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-gray-900 hover:text-blue-600">
              <span className="flex items-center space-x-2">
                <BookOpenIcon className="h-4 w-4" />
                <span>All Chapters</span>
              </span>
              <ChevronRightIcon className="h-4 w-4 transition-transform group-open:rotate-90" />
            </summary>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {pageMetadata.map((page) => (
                <Link
                  key={page.pageNumber}
                  href={`${baseUrl}/page-${formatPageNumber(page.pageNumber)}`}
                  className={`block rounded-lg border p-3 text-sm transition-colors hover:bg-gray-50 ${
                    currentPage === page.pageNumber
                      ? 'border-blue-200 bg-blue-50 text-blue-900'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">Page {page.pageNumber}</div>
                  <div className="mt-1 text-xs text-gray-500">{page.title}</div>
                </Link>
              ))}
            </div>
          </details>
        </div>

        {/* Back to Book Home */}
        <div className="mt-6 text-center">
          <Link
            href={baseUrl}
            className="inline-flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800"
          >
            <BookOpenIcon className="h-4 w-4" />
            <span>Back to Book Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default WDEGNavigation
