import { lazy, Suspense } from 'react'
import HeroSection from './sections/HeroSection'

const AboutSection = lazy(() => import('./sections/AboutSection'))
const FeaturedRooms = lazy(() => import('./sections/FeaturedRooms'))
const GallerySection = lazy(() => import('./sections/GallerySection'))
const TestimonialsSection = lazy(() => import('./sections/TestimonialsSection'))

function BelowFoldFallback() {
  return <div className="min-h-32 bg-canvas" aria-hidden />
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<BelowFoldFallback />}>
        <AboutSection />
        <FeaturedRooms />
        <GallerySection />
        <TestimonialsSection />
      </Suspense>
    </>
  )
}
