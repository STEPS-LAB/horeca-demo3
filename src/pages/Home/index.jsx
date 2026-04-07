import { lazy, Suspense, useEffect, useState } from 'react'
import HeroSection from './sections/HeroSection'

const AboutSection = lazy(() => import('./sections/AboutSection'))
const FeaturedRooms = lazy(() => import('./sections/FeaturedRooms'))
const GallerySection = lazy(() => import('./sections/GallerySection'))
const TestimonialsSection = lazy(() => import('./sections/TestimonialsSection'))

function BelowFoldFallback() {
  return <div className="min-h-32 bg-canvas" aria-hidden />
}

export default function Home() {
  const [showBelowFold, setShowBelowFold] = useState(false)

  useEffect(() => {
    let cancelled = false

    const reveal = () => {
      if (!cancelled) setShowBelowFold(true)
    }

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = window.requestIdleCallback(reveal, { timeout: 1500 })
      return () => {
        cancelled = true
        window.cancelIdleCallback(id)
      }
    }

    const t = window.setTimeout(reveal, 900)
    return () => {
      cancelled = true
      window.clearTimeout(t)
    }
  }, [])

  return (
    <>
      <HeroSection />
      {showBelowFold ? (
        <Suspense fallback={<BelowFoldFallback />}>
          <AboutSection />
          <FeaturedRooms />
          <GallerySection />
          <TestimonialsSection />
        </Suspense>
      ) : (
        <BelowFoldFallback />
      )}
    </>
  )
}
