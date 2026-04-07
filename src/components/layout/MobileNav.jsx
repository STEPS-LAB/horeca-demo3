import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'
import { TreePine, Phone, Mail, X } from 'lucide-react'
import { useUiStore } from '@/store/uiStore'
import { NAV_LINKS, NAV_LABELS } from '@/constants'
import { useLanguage } from '@/context/LanguageContext'
import { cn } from '@/utils/cn'

export default function MobileNav() {
  const { pathname, hash } = useLocation()
  const { mobileMenuOpen, setMobileMenuOpen } = useUiStore()
  const { language } = useLanguage()
  const isUa = language === 'ua'
  const swipeStartX = useRef(null)
  const swipeStartY = useRef(null)

  const isLinkActive = (href) => {
    if (href === '/') return pathname === '/' && !hash
    if (href.startsWith('/#')) return pathname === '/' && hash === href.slice(1)
    return pathname === href
  }

  const handleGlobalTouchStart = (event) => {
    swipeStartX.current = event.touches[0]?.clientX ?? null
    swipeStartY.current = event.touches[0]?.clientY ?? null
  }

  const handleGlobalTouchEnd = (event) => {
    if (swipeStartX.current == null || swipeStartY.current == null) return

    const endX = event.changedTouches[0]?.clientX ?? swipeStartX.current
    const endY = event.changedTouches[0]?.clientY ?? swipeStartY.current
    const deltaX = endX - swipeStartX.current
    const deltaY = Math.abs(endY - swipeStartY.current)

    // Close drawer on horizontal right swipe anywhere on screen.
    if (deltaX > 90 && deltaY < 80) {
      setMobileMenuOpen(false)
    }
  }

  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          className="fixed inset-0 z-50 lg:hidden"
          onTouchStart={handleGlobalTouchStart}
          onTouchEnd={handleGlobalTouchEnd}
        >
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: 360 }}
            animate={{ x: 0 }}
            exit={{ x: 360 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="x"
            dragDirectionLock
            dragConstraints={{ left: 0, right: 360 }}
            dragElastic={{ left: 0, right: 0.15 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 90 || info.velocity.x > 500) {
                setMobileMenuOpen(false)
              }
            }}
            className="absolute top-0 right-0 bottom-0 w-[86vw] max-w-80 bg-white shadow-xl flex flex-col transform-gpu will-change-transform"
            style={{ touchAction: 'pan-y' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-primary-100 rounded-sm">
                  <TreePine className="w-5 h-5 text-primary-900" />
                </div>
                <span className="text-lg font-bold font-display text-primary-900">
                  {isUa ? 'Готель' : 'Hotel'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-11 min-w-11 inline-flex items-center justify-center text-neutral-500 hover:text-primary-900 hover:bg-primary-50 rounded-sm transition-colors"
                aria-label={isUa ? 'Закрити меню' : 'Close menu'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 p-6 space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center h-12 px-4 rounded-sm text-base font-medium font-display transition-colors duration-150',
                      isLinkActive(link.href)
                        ? 'bg-primary-900 text-white'
                        : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-900'
                    )}
                  >
                    {NAV_LABELS[language][link.key]}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-neutral-100 space-y-3">
              <div className="flex items-center gap-3 text-sm text-neutral-500">
                <Phone className="w-4 h-4" />
                <a href="tel:+380000000000" className="hover:text-primary-900 transition-colors">
                  +38 (000) 000-00-00
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-500">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@chudodiievo.com" className="hover:text-primary-900 transition-colors">
                  info@chudodiievo.com
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
