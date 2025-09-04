'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Globe } from 'lucide-react'
import { WDEGHero } from '@/heros/WDEGHero'
import Image from 'next/image'

interface WDEGBookProps {
  initialLanguage?: string
  className?: string
}

const AVAILABLE_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'jp', name: '日本語', flag: '🇯🇵' },
]

export function DynamicWDEGBook({ initialLanguage = 'en', className }: WDEGBookProps) {
  const [currentLanguage, setCurrentLanguage] = useState(initialLanguage)
  const [chapters, setChapters] = useState<{ [key: number]: string }>({})
  const [currentChapter, setCurrentChapter] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'single' | 'all'>('single')
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)

  // Update currentLanguage when initialLanguage prop changes
  useEffect(() => {
    console.log('🔍 DynamicBook - initialLanguage prop changed to:', initialLanguage)
    setCurrentLanguage(initialLanguage)
  }, [initialLanguage])

  // Load chapters for current language
  const loadChapters = async (language: string) => {
    console.log('🔍 DynamicBook - Loading chapters for language:', language)
    setLoading(true)
    setError(null)

    try {
      const url = `/api/wdeg-translations?lang=${language}`
      console.log('🔍 DynamicBook - Fetching from:', url)

      const response = await fetch(url)
      console.log('🔍 DynamicBook - Response status:', response.status)

      const data = await response.json()
      console.log('🔍 DynamicBook - Response data:', data)

      if (data.success) {
        console.log('✅ DynamicBook - Chapters loaded:', Object.keys(data.chapters).length)
        console.log('✅ DynamicBook - Chapter numbers:', Object.keys(data.chapters))
        setChapters(data.chapters)
      } else {
        console.log('❌ DynamicBook - Load failed:', data.error)
        console.log('❌ DynamicBook - Debug info:', data.debug)
        setError(data.error || 'Failed to load chapters')
      }
    } catch (err) {
      console.error('❌ DynamicBook - Network error:', err)
      setError('Network error loading chapters')
    } finally {
      setLoading(false)
    }
  }

  // Load chapters when language changes
  useEffect(() => {
    console.log('🔍 DynamicBook - useEffect triggered, currentLanguage:', currentLanguage)
    loadChapters(currentLanguage)
  }, [currentLanguage])

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode)
    setShowLanguageSelector(false)
  }

  const formatChapterContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      const trimmed = line.trim()
      if (!trimmed) return <br key={index} />

      // Simple formatting - first line as title, others as paragraphs
      if (index === 0 || (trimmed.length < 100 && !trimmed.includes('.'))) {
        return (
          <h3 key={index} className="text-xl font-bold mb-4 text-foreground">
            {trimmed}
          </h3>
        )
      }

      return (
        <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
          {trimmed}
        </p>
      )
    })
  }

  const currentLang = AVAILABLE_LANGUAGES.find((lang) => lang.code === currentLanguage)
  const totalChapters = Object.keys(chapters).length

  // Get chapter image path
  const getChapterImage = (chapterNumber: number) => {
    const paddedNumber = chapterNumber.toString().padStart(3, '0')
    return `/wdeg/images/page_${paddedNumber}.png`
  }

  // Get cover art for main view
  //const getCoverArt = () => '/wdeg/images/cover_art.png'

  return (
    <>
      <WDEGHero viewMode={viewMode} currentChapter={currentChapter} totalChapters={totalChapters} />

      {/* Controls positioned right after hero for immediate visibility */}
      <div className="bg-background/95 backdrop-blur border-b border-border sticky top-16 z-30">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* View Mode Toggle - Prominently placed */}
            <div className="flex items-center gap-3">
              <Button
                variant={viewMode === 'single' ? 'default' : 'outline'}
                onClick={() => setViewMode('single')}
                size="sm"
              >
                Single Chapter
              </Button>
              <Button
                variant={viewMode === 'all' ? 'default' : 'outline'}
                onClick={() => setViewMode('all')}
                size="sm"
              >
                Complete Book
              </Button>
              <Badge variant="secondary">{totalChapters} chapters</Badge>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                className="flex items-center gap-2"
                size="sm"
              >
                <Globe className="h-4 w-4" />
                {currentLang?.flag} {currentLang?.name}
              </Button>

              {showLanguageSelector && (
                <div className="absolute right-0 top-12 z-50 bg-background border border-border rounded-lg shadow-lg p-2 min-w-[200px]">
                  {AVAILABLE_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full text-left px-3 py-2 rounded hover:bg-accent flex items-center gap-2 ${
                        currentLanguage === lang.code
                          ? 'bg-accent text-accent-foreground'
                          : 'text-foreground'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`max-w-4xl mx-auto p-6 ${className}`}>
        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading chapters...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <p className="text-destructive">Error: {error}</p>
              <Button
                onClick={() => loadChapters(currentLanguage)}
                variant="outline"
                className="mt-4"
              >
                Retry
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Single Chapter View */}
        {!loading && !error && viewMode === 'single' && chapters[currentChapter] && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="flex items-center gap-2">
                  Chapter {currentChapter}
                  <Badge variant="outline">{currentLang?.name}</Badge>
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentChapter(Math.max(1, currentChapter - 1))}
                    disabled={currentChapter <= 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground px-2">
                    {currentChapter} of {totalChapters}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentChapter(Math.min(totalChapters, currentChapter + 1))}
                    disabled={currentChapter >= totalChapters}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                {formatChapterContent(chapters[currentChapter])}
              </div>

              {/* Chapter Image - Artfully placed after content */}
              <div className="mt-8 relative">
                <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={getChapterImage(currentChapter)}
                    alt={`Chapter ${currentChapter} Illustration`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium opacity-90">
                      Chapter {currentChapter} Illustration
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Pagination Controls */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentChapter(Math.max(1, currentChapter - 1))}
                    disabled={currentChapter <= 1}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>
                      {currentChapter} of {totalChapters}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setCurrentChapter(Math.min(totalChapters, currentChapter + 1))}
                    disabled={currentChapter >= totalChapters}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Complete Book View */}
        {!loading && !error && viewMode === 'all' && (
          <div className="space-y-8">
            {Object.entries(chapters)
              .sort(([a], [b]) => parseInt(a) - parseInt(b))
              .map(([chapterNum, content]) => (
                <Card key={chapterNum} id={`chapter-${chapterNum}`}>
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      {/* Small Chapter Image */}
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={getChapterImage(parseInt(chapterNum))}
                          alt={`Chapter ${chapterNum}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardTitle className="flex items-center gap-2">
                        Chapter {chapterNum}
                        <Badge variant="outline">{currentLang?.name}</Badge>
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                      {formatChapterContent(content)}
                    </div>

                    {/* Chapter Image - Artfully placed after content */}
                    <div className="mt-8 relative">
                      <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg">
                        <Image
                          src={getChapterImage(parseInt(chapterNum))}
                          alt={`Chapter ${chapterNum} Illustration`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="text-sm font-medium opacity-90">
                            Chapter {chapterNum} Illustration
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Chapter Navigation in Complete Book View */}
                    <div className="mt-6 pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const prevChapter = parseInt(chapterNum) - 1
                            if (prevChapter >= 1) {
                              document.getElementById(`chapter-${prevChapter}`)?.scrollIntoView({
                                behavior: 'smooth',
                              })
                            }
                          }}
                          disabled={parseInt(chapterNum) <= 1}
                          className="flex items-center gap-2"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous Chapter
                        </Button>

                        <div className="text-xs text-muted-foreground">
                          Chapter {chapterNum} of {totalChapters}
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const nextChapter = parseInt(chapterNum) + 1
                            if (nextChapter <= totalChapters) {
                              document.getElementById(`chapter-${nextChapter}`)?.scrollIntoView({
                                behavior: 'smooth',
                              })
                            }
                          }}
                          disabled={parseInt(chapterNum) >= totalChapters}
                          className="flex items-center gap-2"
                        >
                          Next Chapter
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}

        {/* Chapter Navigation for Complete Book View */}
        {viewMode === 'all' && totalChapters > 0 && (
          <div className="fixed bottom-6 right-6 bg-background border border-border rounded-lg p-4 shadow-lg">
            <p className="text-sm font-medium mb-2">Quick Navigation</p>
            <div className="grid grid-cols-6 gap-1">
              {Array.from({ length: totalChapters }, (_, i) => i + 1).map((num) => (
                <Button
                  key={num}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    document.getElementById(`chapter-${num}`)?.scrollIntoView({
                      behavior: 'smooth',
                    })
                  }}
                  className="h-8 w-8 p-0 text-xs"
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
