import { lazy, Suspense } from 'react'

const AIConcierge = lazy(() => import('@/features/ai-concierge/AIConcierge'))
const MobileBookingBar = lazy(() => import('@/features/booking/MobileBookingBar'))

export default function LazyGlobalWidgets() {
  return (
    <Suspense fallback={null}>
      <AIConcierge />
      <MobileBookingBar />
    </Suspense>
  )
}
