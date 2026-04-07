import SectionHeader from '@/components/ui/SectionHeader'
import { useLanguage } from '@/context/LanguageContext'

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=80',
  'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&q=80',
  'https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?w=1200&q=80',
]

export default function GallerySection() {
  const { language } = useLanguage()
  const isUa = language === 'ua'

  return (
    <section id="gallery" className="section-padding bg-white">
      <div className="container-max container-padding">
        <SectionHeader
          eyebrow={isUa ? 'Галерея' : 'Gallery'}
          title={isUa ? 'Атмосфера вашого відпочинку' : 'Atmosphere of your stay'}
          description={
            isUa
              ? 'Кілька моментів, які передають характер готелю та красу локації.'
              : 'A few moments that reflect the spirit of the hotel and the beauty of the location.'
          }
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-10">
          {GALLERY_IMAGES.map((src, index) => (
            <div key={src} className="overflow-hidden rounded-lg shadow-soft">
              <img
                src={src.replace('w=1200', 'w=800')}
                srcSet={`${src.replace('w=1200', 'w=400')} 400w, ${src.replace('w=1200', 'w=800')} 800w, ${src} 1200w`}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
                alt={isUa ? `Галерея готелю ${index + 1}` : `Hotel gallery ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-44 sm:h-56 lg:h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
