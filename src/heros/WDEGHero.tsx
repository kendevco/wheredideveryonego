'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface WDEGHeroProps {
  viewMode: 'single' | 'all'
  currentChapter: number
  totalChapters: number
}

export const WDEGHero: React.FC<WDEGHeroProps> = ({ viewMode, currentChapter, totalChapters }) => {
  const [heroImage, setHeroImage] = useState<string>('/wdeg/images/cover_art.png')
  const [displayChapter, setDisplayChapter] = useState<number>(1)

  // Get chapter image path
  const getChapterImage = (chapterNumber: number) => {
    const paddedNumber = chapterNumber.toString().padStart(3, '0')
    return `/wdeg/images/page_${paddedNumber}.png`
  }

  // Handle scroll-based chapter detection for complete book view
  useEffect(() => {
    if (viewMode === 'all') {
      const handleScroll = () => {
        const chapterElements = Array.from(document.querySelectorAll('[id^="chapter-"]'))
        const scrollPosition = window.scrollY + window.innerHeight / 2

        for (let i = chapterElements.length - 1; i >= 0; i--) {
          const element = chapterElements[i] as HTMLElement
          const elementTop = element.offsetTop

          if (scrollPosition >= elementTop) {
            const chapterNum = parseInt(element.id.replace('chapter-', ''))
            if (chapterNum !== displayChapter) {
              setDisplayChapter(chapterNum)
              setHeroImage(getChapterImage(chapterNum))
            }
            break
          }
        }
      }

      // Throttle scroll events
      let ticking = false
      const throttledScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            handleScroll()
            ticking = false
          })
          ticking = true
        }
      }

      window.addEventListener('scroll', throttledScroll)
      return () => window.removeEventListener('scroll', throttledScroll)
    }
  }, [viewMode, displayChapter])

  // Update hero image based on current chapter for single view
  useEffect(() => {
    if (viewMode === 'single') {
      setHeroImage(getChapterImage(currentChapter))
      setDisplayChapter(currentChapter)
    } else {
      setHeroImage('/wdeg/images/cover_art.png')
      setDisplayChapter(1)
    }
  }, [viewMode, currentChapter])

  return (
    <div className="relative -mt-16 flex min-h-[80vh] items-end">
      <div className="container relative z-10 pb-8 pt-32">
        <div className="max-w-[48rem]">
          <h1 className="mb-6 text-5xl font-bold leading-tight text-white md:text-6xl">
            Where Did Everyone Go?
          </h1>
          <p className="mb-8 text-xl text-white/90">
            A Biblical Guide to Understanding the Rapture and End Times
          </p>
          {viewMode === 'single' ? (
            <p className="text-lg text-white/80">
              Chapter {displayChapter} of {totalChapters}
            </p>
          ) : (
            <p className="text-lg text-white/80">
              {displayChapter > 1
                ? `Currently viewing Chapter ${displayChapter}`
                : 'Complete Book View'}
            </p>
          )}
        </div>
      </div>
      <Image
        alt={
          displayChapter > 0
            ? `Chapter ${displayChapter} Illustration`
            : 'Where Did Everyone Go? Cover Art'
        }
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        fill
        priority
        src={heroImage}
      />
      <div className="absolute inset-0 -z-10 bg-black/50" />
    </div>
  )
}


