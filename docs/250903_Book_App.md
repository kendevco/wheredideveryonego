# WDEG Book App - Dynamic Implementation Guide

## Overview
The WDEG (Where Did Everyone Go?) book is implemented as a dynamic, multi-language reading experience using the `DynamicBook.tsx` component. This approach loads content at runtime rather than seeding static pages, providing a more flexible and maintainable solution.

## Architecture

### Components
- **`DynamicWDEGBook`** (`src/components/WDEGBook/DynamicBook.tsx`) - Main interactive book component
- **`WDEGNavigation`** (`src/components/WDEGNavigation/index.tsx`) - Navigation component for static page-based approach (legacy)

### API Endpoint
- **`/api/wdeg-translations`** - Dynamically serves book content from file system

### Asset Structure
```
public/wdeg/
├── wdeg.jpg                    # Hero image
├── bookdata.js                 # Book metadata
├── bookdata.ts                 # TypeScript book metadata
├── images/                     # Chapter illustrations
│   ├── page_01.png
│   ├── page_02.png
│   └── ... (26 total)
└── [language]/                 # Language-specific content
    ├── en/                     # English
    │   ├── 01.txt
    │   ├── 02.txt
    │   └── ... (26 chapters)
    ├── es/                     # Spanish
    ├── fr/                     # French
    ├── de/                     # German
    ├── it/                     # Italian
    ├── pt/                     # Portuguese
    ├── pl/                     # Polish
    ├── ar/                     # Arabic
    └── he/                     # Hebrew
```

## How to Use in Payload CMS

### Adding the WDEG Book Component

1. **Create a new page** or edit an existing page in Payload Admin
2. **Add Layout Block** - Click "Add Layout" button
3. **Select "WDEG Navigation"** from the block options (this will be renamed to "WDEG Viewer")
4. **Configure the block**:
   - Current Page: Set to desired starting page (1-26)
   - Total Pages: 26 (default)
   - Base URL: `/wdeg-book` (default)

### Block Configuration Options

The WDEG Navigation block accepts these parameters:
- **Current Page** (1-26): Starting page number
- **Total Pages**: Total number of pages (26)
- **Base URL**: URL prefix for book pages

## Features

### Multi-Language Support
- **9 Languages Available**: English, Spanish, French, German, Italian, Portuguese, Polish, Arabic, Hebrew
- **Runtime Language Switching**: No page reloads required
- **Automatic Content Loading**: Translations loaded via API on demand

### Reading Modes
- **Single Chapter View**: Focus on one chapter at a time with navigation
- **Complete Book View**: Scroll through entire book with quick navigation
- **Progress Tracking**: Visual progress bar and page indicators

### Navigation Features
- **Chapter-by-Chapter Navigation**: Previous/Next with chapter titles
- **Quick Chapter Access**: Expandable chapter list with direct links
- **Progress Visualization**: Progress bar showing reading completion
- **Responsive Design**: Optimized for desktop and mobile

## API Usage

### Get All Chapters for a Language
```javascript
fetch('/api/wdeg-translations?lang=en')
  .then(res => res.json())
  .then(data => {
    console.log(data.chapters) // Object with chapter numbers as keys
    console.log(data.totalChapters) // Number of available chapters
  })
```

### Get Specific Chapter
```javascript
fetch('/api/wdeg-translations?lang=en&chapter=1')
  .then(res => res.json())
  .then(data => {
    console.log(data.content) // Chapter content as string
    console.log(data.chapter) // Chapter number
  })
```

## Implementation Notes

### Why Dynamic Loading?
- **Maintainability**: Content updates don't require database changes
- **Performance**: Only loads requested content
- **Scalability**: Easy to add new languages or chapters
- **Flexibility**: Can switch between different presentation modes

### File Naming Convention
- Chapter files: `01.txt`, `02.txt`, etc. (zero-padded)
- Images: `page_01.png`, `page_02.png`, etc.
- Languages: ISO 639-1 codes (`en`, `es`, `fr`, etc.)

### Layout Block vs Component
- **WDEG Navigation Block**: For static page-based navigation (legacy approach)
- **DynamicWDEGBook Component**: For dynamic content loading (current approach)
- The "Add Layout" interface shows "WDEG Navigation" but this is actually the WDEG Viewer/Book component

## Deployment Considerations

1. **Asset Location**: Ensure `public/wdeg/` directory is deployed with all content files
2. **File Permissions**: API route needs read access to public directory
3. **Language Support**: Verify all required language directories exist
4. **Image Optimization**: Consider optimizing PNG files for web delivery

## Future Enhancements

- **Search Functionality**: Full-text search across chapters
- **Bookmarking**: Save reading progress
- **Audio Support**: Text-to-speech integration
- **Offline Reading**: Service worker for offline access
- **Print Optimization**: CSS for print-friendly layouts
