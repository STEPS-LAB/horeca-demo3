import SectionHeader from '@/components/ui/SectionHeader'
import { useLanguage } from '@/context/LanguageContext'

const GALLERY_BASES = [
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c',
  'https://images.unsplash.com/photo-1455587734955-081b22074882',
  'https://images.unsplash.com/photo-1468824357306-a439d58ccb1c',
]

function gallerySrc(photo, w) {
  return `${photo}?w=${w}&q=72&fm=webp&fit=max`
}

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
          {GALLERY_BASES.map((photo, index) => (
            <div key={photo} className="overflow-hidden rounded-lg shadow-soft">
              <img
                src={gallerySrc(photo, 560)}
                srcSet={`${gallerySrc(photo, 320)} 320w, ${gallerySrc(photo, 560)} 560w, ${gallerySrc(photo, 800)} 800w`}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 360px"
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
