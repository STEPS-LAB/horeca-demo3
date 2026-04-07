import { Link, useLocation } from 'react-router-dom'
import { TreePine, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react'
import { NAV_LINKS, NAV_LABELS } from '@/constants'
import { useLanguage } from '@/context/LanguageContext'
import { cn } from '@/utils/cn'

const SOCIAL_LINKS = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Facebook, label: 'Facebook' },
  { icon: Youtube, label: 'YouTube' },
]

export default function Footer() {
  const { pathname } = useLocation()
  const { language } = useLanguage()
  const isUa = language === 'ua'
  const mobileBookBarVisible =
    pathname !== '/contact' && pathname !== '/booking' && pathname !== '/checkout'
  const t = {
    ctaTitle: isUa ? 'Готові забронювати ідеальний відпочинок?' : 'Ready to book your perfect stay?',
    ctaSubtitle: isUa
      ? 'Обирайте номер і підтвердіть бронювання за кілька кроків.'
      : 'Choose your room and confirm booking in just a few steps.',
    ctaButton: isUa ? 'Перейти до бронювання' : 'Go to booking',
    hotelColumn: isUa ? 'Навігація' : 'Navigation',
    infoColumn: isUa ? 'Контакти' : 'Contacts',
    addressLabel: isUa ? 'Адреса' : 'Address',
    phoneLabel: isUa ? 'Телефон' : 'Phone',
    emailLabel: 'Email',
    developedBy: 'Developed by',
    privacy: isUa ? 'Політика конфіденційності' : 'Privacy policy',
    terms: isUa ? 'Умови бронювання' : 'Booking terms',
    rights: isUa ? 'Всі права захищені.' : 'All rights reserved.',
  }

  return (
    <footer
      className={cn(
        'bg-primary-950 text-white',
        mobileBookBarVisible && 'max-lg:pb-[5.5rem]'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Banner */}
        <div className="pt-10">
          <div className="bg-primary-900/80 border border-primary-800 rounded-lg px-6 py-7 sm:px-8 sm:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xl sm:text-2xl font-bold font-display text-white mb-2">{t.ctaTitle}</p>
              <p className="text-sm text-neutral-200">{t.ctaSubtitle}</p>
            </div>
            <Link
              to="/booking"
              className="inline-flex items-center justify-center h-11 px-5 rounded-lg bg-white text-primary-900 lg:hover:bg-neutral-100 active:scale-[0.95] lg:hover:scale-[1.02] transition-all duration-200 font-semibold font-display whitespace-nowrap"
            >
              {t.ctaButton}
            </Link>
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-x-20 xl:gap-x-28">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-primary-800 rounded-sm">
                <TreePine className="w-5 h-5 text-secondary-400" />
              </div>
              <span className="text-xl font-bold font-display">Готель</span>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {isUa
                ? 'Преміальний лісовий курорт серед нескінченних карпатських лісів. Місце, де природа, розкіш та спокій стають єдиним цілим.'
                : 'A premium forest resort among endless Carpathian woods. A place where nature, luxury, and peace become one.'}
            </p>
          </div>

          {/* Hotel Links */}
          <div className="space-y-4 lg:justify-self-center">
            <p className="text-sm font-semibold font-display tracking-widest uppercase text-secondary-300">
              {t.hotelColumn}
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.filter((link) => link.key !== 'contacts').map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-neutral-200 lg:hover:text-white transition-colors duration-150"
                  >
                    {NAV_LABELS[language][link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4 lg:justify-self-end">
            <p className="text-sm font-semibold font-display tracking-widest uppercase text-secondary-300">
              {t.infoColumn}
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary-400 shrink-0 mt-0.5" aria-hidden />
                <div className="text-sm text-neutral-200">
                  <p className="text-xs uppercase tracking-wide text-neutral-400 mb-1">{t.addressLabel}</p>
                  <a
                    href="https://maps.google.com/?q=гора+1,+Буковель,+Івано-Франківська+область,+Україна"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lg:hover:text-white transition-colors"
                  >
                    {isUa ? 'Карпатська обл., смт. Готель, вул. Лісова, 1' : 'Carpathian region, Hotel town, Lisova St., 1'}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary-400 shrink-0" aria-hidden />
                <div className="text-sm text-neutral-200">
                  <p className="text-xs uppercase tracking-wide text-neutral-400 mb-1">{t.phoneLabel}</p>
                  <a
                    href="tel:+380000000000"
                    className="lg:hover:text-white transition-colors"
                  >
                    +38 (000) 000-00-00
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-secondary-400 shrink-0" aria-hidden />
                <div className="text-sm text-neutral-200">
                  <p className="text-xs uppercase tracking-wide text-neutral-400 mb-1">{t.emailLabel}</p>
                  <a
                    href="mailto:hotel@gmail.com"
                    className="lg:hover:text-white transition-colors"
                  >
                    hotel@gmail.com
                  </a>
                </div>
              </li>
              <li>
                <p className="text-xs uppercase tracking-wide text-neutral-400 mb-2">Social</p>
                <div className="flex items-center gap-4 flex-wrap">
                  {SOCIAL_LINKS.map(({ icon: Icon, label }) => (
                    <button
                      key={label}
                      type="button"
                      aria-label={label}
                      className="min-h-11 min-w-11 bg-primary-800 lg:hover:bg-primary-700 rounded-sm flex items-center justify-center transition-colors duration-200 cursor-default"
                    >
                      <Icon className="w-4 h-4 text-neutral-300" />
                    </button>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-neutral-400 text-left">
            © {new Date().getFullYear()} {isUa ? 'Готель' : 'Hotel'}. {t.rights}
            <span className="block mt-3 sm:mt-2 lg:inline lg:mt-0 lg:ml-1">
              {t.developedBy}{' '}
              <a
                href="https://stepslab.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-200 lg:hover:text-white transition-colors"
              >
                STEPS LAB
              </a>.
            </span>
          </p>
          <div className="flex items-center justify-start gap-8 w-full sm:w-auto flex-wrap">
            <button
              type="button"
              className="text-xs text-neutral-300 lg:hover:text-white transition-colors cursor-default text-left"
            >
              {t.privacy}
            </button>
            <button
              type="button"
              className="text-xs text-neutral-300 lg:hover:text-white transition-colors cursor-default text-left"
            >
              {t.terms}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
