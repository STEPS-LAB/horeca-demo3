/** Smaller WebP payloads for Unsplash URLs used in cards / lists */
export function optimizeUnsplashImage(url, width = 720) {
  if (typeof url !== 'string' || !url.includes('images.unsplash.com')) return url
  const base = url.split('?')[0]
  return `${base}?w=${width}&q=72&fm=webp&fit=max`
}
