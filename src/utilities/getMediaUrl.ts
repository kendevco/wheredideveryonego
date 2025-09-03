import { getClientSideURL } from '@/utilities/getURL'

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  // Check if URL already has http/https protocol (Vercel Blob storage URLs)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return cacheTag ? `${url}?${cacheTag}` : url
  }

  // Check if URL is a Vercel Blob storage URL (starts with blob:)
  if (url.startsWith('blob:')) {
    return cacheTag ? `${url}?${cacheTag}` : url
  }

  // For relative URLs, prepend client-side URL
  const baseUrl = getClientSideURL()
  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`
  return cacheTag ? `${fullUrl}?${cacheTag}` : fullUrl
}
