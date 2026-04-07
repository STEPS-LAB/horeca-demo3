import { motion } from 'framer-motion'
import { RESORT_FEATURES } from '@/constants'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import SectionHeader from '@/components/ui/SectionHeader'
import { getIcon } from '@/utils/icons'
import { useLanguage } from '@/context/LanguageContext'

const FEATURES_EN = {
  'Преміальний сервіс 24/7': 'Premium 24/7 service',
  'Преміальний СПА-центр': 'Premium SPA center',
  'Авторська кухня': "Chef's signature cuisine",
  'Природне озеро': 'Natural lake',
}

const FEATURES_DESC_EN = {
  'Персональний консьєрж, room service та підтримка гостей цілодобово для бездоганного відпочинку.':
    'Personal concierge, room service, and 24/7 guest support for a seamless stay.',
  'Повний спектр оздоровчих процедур: масажі, обгортання, ванни з трав\'яними відварами.':
    'A full range of wellness treatments: massages, wraps, and herbal baths.',
  'Ресторан використовує виключно локальні продукти від місцевих фермерів та власний сад.':
    'Our restaurant uses only local products from nearby farmers and our own garden.',
  'Плавання, рибалка, каяки та SUP-серфінг на кристально чистому гірському озері.':
    'Swimming, fishing, kayaking and SUP on a crystal-clear mountain lake.',
}

export default function AboutSection() {
  const [ref, inView] = useIntersectionObserver()
  const { language } = useLanguage()
  const isUa = language === 'ua'

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-max container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Images collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Left column */}
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-medium">
                  <img
                    src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80"
                    alt={isUa ? 'Природа курорту' : 'Resort nature'}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden shadow-medium">
                  <img
                    src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80"
                    alt={isUa ? 'СПА процедури' : 'SPA procedures'}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              {/* Right column — offset down */}
              <div className="space-y-4 mt-8">
                <div className="aspect-square rounded-lg overflow-hidden shadow-medium">
                  <img
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80"
                    alt={isUa ? 'Авторська кухня' : 'Signature cuisine'}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-medium">
                  <img
                    src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&q=80"
                    alt={isUa ? 'Озеро' : 'Lake'}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div
              className="absolute -bottom-4 -right-4 rounded-xl px-5 py-4 shadow-xl"
              style={{ backgroundColor: '#1F3A2E', color: 'white' }}
            >
              <p className="text-3xl font-bold font-display">12+</p>
              <p className="text-xs" style={{ color: '#a7c4b5' }}>
                {isUa ? 'років досвіду' : 'years of experience'}
              </p>
            </div>
          </div>

          {/* Text content */}
          <div ref={ref} className="space-y-8">
            <SectionHeader
              eyebrow={isUa ? 'Про нас' : 'About us'}
              title={isUa ? 'Більше ніж просто готель' : 'More than just a hotel'}
              description={
                isUa
                  ? 'Ми створили місце, де кожна деталь продумана для вашого відновлення. Від архітектури, що вписується в природний ландшафт, до авторської кухні з місцевих продуктів — Готель це досвід, який змінює уявлення про відпочинок.'
                  : 'We created a place where every detail is designed for restoration. From architecture integrated into the landscape to signature cuisine with local ingredients, this hotel redefines a quality getaway.'
              }
              align="left"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {RESORT_FEATURES.map(({ icon, title, description }, i) => {
                const Icon = getIcon(icon)
                return (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div
                      className="w-10 h-10 rounded-md flex items-center justify-center shrink-0"
                      style={{ backgroundColor: '#e8f0ec' }}
                    >
                      <Icon className="w-5 h-5" style={{ color: '#1F3A2E' }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold font-display text-primary-900 mb-1">
                        {isUa ? title : FEATURES_EN[title] || title}
                      </h3>
                      <p className="text-xs text-neutral-500 leading-relaxed">
                        {isUa ? description : FEATURES_DESC_EN[description] || description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
