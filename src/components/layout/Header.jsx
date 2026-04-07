import { Link, useLocation } from 'react-router-dom'
import { TreePine, Menu, X } from 'lucide-react'
import { useRef } from 'react'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { useUiStore } from '@/store/uiStore'
import { NAV_LINKS, NAV_LABELS } from '@/constants'
import { cn } from '@/utils/cn'
import { useLanguage } from '@/context/LanguageContext'
import Button from '@/components/ui/Button'
import MobileNav from './MobileNav'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const { pathname, hash } = useLocation()
  const { scrolled } = useScrollPosition()
  const { mobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } = useUiStore()
  const { language } = useLanguage()
  const isUa = language === 'ua'
  const isContactPage = pathname === '/contact'
  const isBookingPage = pathname === '/booking'
  const shouldUseSolidHeader = isBookingPage || scrolled
  const isDarkHeader = !shouldUseSolidHeader
  const touchStartX = useRef(null)

  const isLinkActive = (href) => {
    if (href === '/') return pathname === '/' && !hash
    if (href.startsWith('/#')) return pathname === '/' && hash === href.slice(1)
    return pathname === href
  }

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event) => {
    if (mobileMenuOpen || touchStartX.current == null) return
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current
    const swipeDistance = touchStartX.current - endX
    const startsFromRightEdge = touchStartX.current > window.innerWidth - 36

    if (startsFromRightEdge && swipeDistance > 60) {
      setMobileMenuOpen(true)
    }
  }

  return (
    <>
      <header
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          shouldUseSolidHeader
            ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-neutral-100'
            : isContactPage
              ? 'bg-transparent border-transparent'
              : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className={cn(
                'p-2 rounded-sm transition-colors duration-200',
                isDarkHeader ? 'bg-white/20 backdrop-blur-sm' : 'bg-primary-100'
              )}>
                <TreePine className={cn(
                  'w-5 h-5 transition-colors duration-200',
                  isDarkHeader ? 'text-white' : 'text-primary-900'
                )} />
              </div>
              <span className={cn(
                'text-lg font-bold font-display tracking-tight transition-colors duration-200',
                isDarkHeader ? 'text-white' : 'text-primary-900'
              )}>
                {isUa ? 'Готель' : 'Hotel'}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'px-4 py-2.5 text-sm font-medium font-display rounded-sm transition-colors duration-200 underline underline-offset-4',
                    isDarkHeader
                      ? isLinkActive(link.href)
                        ? 'text-white decoration-white'
                        : 'text-white/90 hover:text-white decoration-white/35 hover:decoration-white/70'
                      : isLinkActive(link.href)
                        ? 'text-primary-900 decoration-primary-900 decoration-2'
                        : 'text-neutral-700 hover:text-primary-900 decoration-neutral-300 hover:decoration-primary-600'
                  )}
                >
                  {NAV_LABELS[language][link.key]}
                </Link>
              ))}
            </nav>

            {/* Desktop Controls */}
            <div className="hidden lg:flex items-center gap-3">
              <LanguageSwitcher dark={!isDarkHeader} />
              <Button
                as={Link}
                to="/booking"
                size="sm"
                variant={isDarkHeader ? 'light' : 'primary'}
                className="rounded-lg min-h-11 px-5"
              >
                {isUa ? 'Забронювати' : 'Book now'}
              </Button>
            </div>

            {/* Mobile controls */}
            <div className="lg:hidden flex items-center gap-2">
              <LanguageSwitcher dark={!isDarkHeader} />
              <button
                type="button"
                className={cn(
                  'min-h-11 min-w-11 inline-flex items-center justify-center rounded-sm transition-colors duration-200',
                  isDarkHeader
                    ? 'text-white hover:bg-white/10'
                    : 'text-primary-900 hover:bg-primary-50'
                )}
                onClick={toggleMobileMenu}
                aria-label={isUa ? 'Відкрити меню' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav />
    </>
  )
}
