import { motion } from 'framer-motion'
import { Users, Maximize2, Star } from 'lucide-react'
import { cn } from '@/utils/cn'
import { formatPrice } from '@/utils/format'
import Badge from '@/components/ui/Badge'
import Rating from '@/components/ui/Rating'
import { AMENITIES } from '@/constants'
import { useLanguage } from '@/context/LanguageContext'
import { localizeRoom } from '@/i18n/rooms'
import { optimizeUnsplashImage } from '@/utils/imageUrl'

export default function RoomCard({ room, index = 0 }) {
  const { language } = useLanguage()
  const isUa = language === 'ua'
  const localizedRoom = localizeRoom(room, language)
  const categoryLabels = {
    standard: isUa ? 'Стандарт' : 'Standard',
    studio: isUa ? 'Студія' : 'Studio',
    suite: isUa ? 'Люкс' : 'Suite',
    cottage: isUa ? 'Котедж' : 'Cottage',
    penthouse: isUa ? 'Пентхаус' : 'Penthouse',
  }

  const displayAmenities = room.amenities
    .slice(0, 3)
    .map((id) => AMENITIES.find((a) => a.id === id)?.label)
    .filter(Boolean)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-soft h-full flex flex-col transition-all duration-300 lg:hover:-translate-y-[1%] lg:hover:shadow-large">
          {/* Image */}
          <div className="relative h-56 sm:h-64 overflow-hidden">
            <img
              src={optimizeUnsplashImage(localizedRoom.images[0])}
              alt={localizedRoom.name}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            {/* Overlay badges */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <Badge
                variant="default"
                className="bg-white/90 backdrop-blur-sm text-primary-900 shadow-soft"
              >
                {categoryLabels[room.category]}
              </Badge>
              {localizedRoom.originalPrice && <Badge variant="warning">{isUa ? 'Знижка' : 'Discount'}</Badge>}
            </div>
            {/* Rating overlay */}
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-soft">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-semibold text-neutral-800">{localizedRoom.rating}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-lg font-bold font-display text-primary-900 mb-2 line-clamp-1">
              {localizedRoom.name}
            </h3>
            <p className="text-sm text-neutral-500 line-clamp-2 mb-4 leading-relaxed">
              {localizedRoom.shortDescription}
            </p>

            {/* Specs */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                <Users className="w-3.5 h-3.5" />
                <span>{isUa ? `до ${localizedRoom.maxGuests} осіб` : `up to ${localizedRoom.maxGuests} guests`}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{localizedRoom.size} м²</span>
              </div>
            </div>

            {/* Amenities */}
            {displayAmenities.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {displayAmenities.map((label) => (
                  <span
                    key={label}
                    className="text-xs px-2 py-1 bg-primary-50 text-primary-700 rounded-sm font-medium"
                  >
                    {label}
                  </span>
                ))}
                {room.amenities.length > 3 && (
                  <span className="text-xs px-2 py-1 text-neutral-400">
                    +{room.amenities.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Price & CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-100 mt-auto">
              <div>
              {localizedRoom.originalPrice && (
                  <p className="text-xs text-neutral-400 line-through mb-0.5">
                    {formatPrice(localizedRoom.originalPrice)}
                  </p>
                )}
                <p className="text-xl font-bold font-display text-primary-900">
                  {formatPrice(localizedRoom.price)}
                </p>
                <p className="text-xs text-neutral-400">{isUa ? 'за ніч' : 'per night'}</p>
              </div>
            </div>
          </div>
      </div>
    </motion.div>
  )
}
