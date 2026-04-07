import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LazyGlobalWidgets from './LazyGlobalWidgets'

export default function RootLayout() {
  const { pathname, hash } = useLocation()
  const isMobileBarHidden = pathname === '/contact' || pathname === '/booking' || pathname === '/checkout'

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '')
      const element = document.getElementById(targetId)

      if (element) {
        const headerOffset = 96
        const top = element.getBoundingClientRect().top + window.scrollY - headerOffset
        window.scrollTo({ top, behavior: 'smooth' })
        return
      }
    }

    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Header />
      <main className={`flex-1 ${isMobileBarHidden ? '' : 'pb-16 lg:pb-0'}`}>
        <Outlet />
      </main>
      <Footer />
      <LazyGlobalWidgets />
    </div>
  )
}
