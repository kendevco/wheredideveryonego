import { redirect } from 'next/navigation'

export default function RootPage() {
  // Redirect to default locale
  redirect('/en')
}

// Add static generation for the root page
export const dynamic = 'force-static'
