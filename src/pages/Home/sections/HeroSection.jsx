import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/context/LanguageContext'

const HERO_BASE = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e'
const HERO_SRC_SET = [
  `${HERO_BASE}?w=640&q=75&auto=format&fit=max 640w`,
  `${HERO_BASE}?w=828&q=75&auto=format&fit=max 828w`,
  `${HERO_BASE}?w=1200&q=75&auto=format&fit=max 1200w`,
  `${HERO_BASE}?w=1600&q=75&auto=format&fit=max 1600w`,
  `${HERO_BASE}?w=2000&q=75&auto=format&fit=max 2000w`,
].join(', ')

export default function HeroSection() {
  const { language } = useLanguage()
  const isUa = language === 'ua'

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={`${HERO_BASE}?w=828&q=75&auto=format&fit=max`}
          srcSet={HERO_SRC_SET}
          sizes="100vw"
          width={1920}
          height={1080}
          alt=""
          decoding="async"
          fetchPriority="high"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays — stronger for text contrast (a11y) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(15,36,27,0.72) 0%, rgba(15,36,27,0.52) 50%, rgba(15,36,27,0.88) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(15,36,27,0.38) 0%, transparent 50%, rgba(15,36,27,0.38) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-20 pb-4 sm:pb-0">
        {/* Award badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-black/25 backdrop-blur-sm border border-white/25 text-white text-sm font-medium"
        >
          <Award className="w-4 h-4 shrink-0 text-amber-100" aria-hidden />
          <span>{isUa ? 'Найкращий еко-курорт Карпат' : 'Best Eco Resort in the Carpathians'}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold font-display text-white mb-6 leading-tight tracking-tight"
        >
          {isUa ? 'Де природа' : 'Where nature'}
          <br />
          <span className="text-amber-100 drop-shadow-sm">{isUa ? 'зустрічає' : 'meets'}</span>
          <br />
          {isUa ? 'розкіш' : 'luxury'}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {isUa
            ? 'Преміальний лісовий курорт у серці Карпат. Унікальне поєднання дикої природи, сучасного комфорту та автентичної карпатської культури.'
            : 'A premium forest resort in the heart of the Carpathians. A unique blend of wild nature, modern comfort, and authentic mountain culture.'}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            as={Link}
            to="/rooms"
            size="xl"
            variant="light"
            className="min-w-[min(100%,12rem)] min-h-12 font-bold shadow-xl hover:shadow-2xl"
          >
            {isUa ? 'Обрати номер' : 'Choose a room'}
          </Button>
          <Button
            as={Link}
            to="/booking"
            size="xl"
            variant="ghost"
            className="min-w-[min(100%,12rem)] min-h-12 text-white border border-white/40 bg-white/10 backdrop-blur-sm hover:bg-white hover:!text-primary-900"
          >
            {isUa ? 'Забронювати' : 'Book now'}
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center justify-center gap-8 sm:gap-16 mt-16"
        >
          {[
            { value: '1000+', label: isUa ? 'задоволених гостей' : 'happy guests' },
            { value: '12', label: isUa ? 'унікальних номерів' : 'unique rooms' },
            { value: '99%', label: isUa ? 'позитивних відгуків' : 'positive reviews' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold font-display text-white mb-1">{value}</p>
              <p className="text-xs sm:text-sm text-white/80 uppercase tracking-wide">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  )
}
