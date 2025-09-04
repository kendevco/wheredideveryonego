import { redirect } from 'next/navigation'

export default function RootPage() {
  // Redirect to home page (no locale needed)
  redirect('/home')
}
