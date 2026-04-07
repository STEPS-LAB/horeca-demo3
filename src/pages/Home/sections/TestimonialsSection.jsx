import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { TESTIMONIALS } from '@/constants'
import SectionHeader from '@/components/ui/SectionHeader'
import { useLanguage } from '@/context/LanguageContext'

const TEXT_EN = [
  'An incredible place! We stayed three nights in the forest suite - the best recharge in years. Nature, silence, and fantastic cuisine.',
  'The lakeside cottage is amazing. Morning fishing, evening sauna, and a starry sky. Service level is excellent.',
  'The SPA penthouse exceeded all expectations. Mountain views, private jacuzzi, and truly premium service.',
  'A perfect place for a family vacation. The kids loved nature and activities, and the staff was very attentive.',
]

export default function TestimonialsSection() {
  const { language } = useLanguage()
  const isUa = language === 'ua'
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = useCallback((idx, dir) => {
    setDirection(dir)
    setCurrent(idx)
  }, [])

  const prev = () =>
    goTo((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length, -1)

  const next = useCallback(
    () => goTo((current + 1) % TESTIMONIALS.length, 1),
    [current, goTo]
  )

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const t = TESTIMONIALS[current]
  const prevLabel = isUa ? 'Попередній відгук' : 'Previous testimonial'
  const nextLabel = isUa ? 'Наступний відгук' : 'Next testimonial'

  return (
    <section className="section-padding" style={{ backgroundColor: '#F0EEE9' }}>
      <div className="container-max container-padding">
        <SectionHeader
          eyebrow={isUa ? 'Відгуки гостей' : 'Guest reviews'}
          title={isUa ? 'Що кажуть наші гості' : 'What our guests say'}
          description={
            isUa
              ? 'Справжні враження від людей, які обрали Готель для свого відпочинку.'
              : 'Real impressions from people who chose our hotel for their stay.'
          }
        />

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="relative">
            {/* Mobile controls */}
            <div className="md:hidden absolute -top-12 right-0 z-10 flex items-center gap-3">
              <button
                type="button"
                onClick={prev}
                aria-label={prevLabel}
                className="min-h-11 min-w-11 bg-white rounded-full shadow-medium flex items-center justify-center hover:bg-neutral-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-primary-900" aria-hidden />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label={nextLabel}
                className="min-h-11 min-w-11 bg-white rounded-full shadow-medium flex items-center justify-center hover:bg-neutral-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-primary-900" aria-hidden />
              </button>
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={{
                  enter: (d) => ({ opacity: 0, x: d * 60 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d) => ({ opacity: 0, x: d * -60 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="bg-white rounded-lg p-8 sm:p-10 shadow-medium text-center"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg sm:text-xl text-neutral-700 leading-relaxed mb-8 italic">
                  "{isUa ? t.text : TEXT_EN[current]}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    width={48}
                    height={48}
                    loading="lazy"
                    decoding="async"
                    className="w-12 h-12 rounded-full object-cover border-2 border-secondary-200"
                    style={{ borderColor: '#D8C3A5' }}
                  />
                  <div className="text-left">
                    <p className="font-bold font-display text-primary-900">{t.name}</p>
                    <p className="text-sm text-neutral-400">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Desktop controls */}
            <button
              type="button"
              onClick={prev}
              aria-label={prevLabel}
              className="hidden md:flex absolute -left-12 lg:-left-14 top-1/2 -translate-y-1/2 min-h-11 min-w-11 bg-white rounded-full shadow-medium items-center justify-center hover:bg-neutral-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-primary-900" aria-hidden />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={nextLabel}
              className="hidden md:flex absolute -right-12 lg:-right-14 top-1/2 -translate-y-1/2 min-h-11 min-w-11 bg-white rounded-full shadow-medium items-center justify-center hover:bg-neutral-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-primary-900" aria-hidden />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i, i > current ? 1 : -1)}
                aria-label={
                  isUa ? `Перейти до відгуку ${i + 1} з ${TESTIMONIALS.length}` : `Go to testimonial ${i + 1} of ${TESTIMONIALS.length}`
                }
                aria-current={i === current ? true : undefined}
                className="min-h-11 min-w-[1.25rem] inline-flex items-center justify-center rounded-full transition-all duration-300 touch-manipulation"
              >
                <span
                  className="h-1.5 rounded-full block transition-all duration-300"
                  style={{
                    width: i === current ? '24px' : '6px',
                    backgroundColor: i === current ? '#1F3A2E' : '#D4D4D4',
                  }}
                  aria-hidden
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
