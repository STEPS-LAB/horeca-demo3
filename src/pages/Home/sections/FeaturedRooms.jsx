import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { roomsApi } from '@/services/api/rooms'
import RoomCard from '@/features/rooms/RoomCard'
import { SkeletonCard } from '@/components/ui/Skeleton'
import SectionHeader from '@/components/ui/SectionHeader'
import { useLanguage } from '@/context/LanguageContext'

export default function FeaturedRooms() {
  const { language } = useLanguage()
  const isUa = language === 'ua'

  const { data: rooms, isLoading } = useQuery({
    queryKey: ['rooms', 'featured'],
    queryFn: () => roomsApi.getFeatured(),
  })

  return (
    <section id="rooms" className="section-padding bg-canvas">
      <div className="container-max container-padding">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow={isUa ? 'Номери' : 'Rooms'}
            title={isUa ? 'Найкращі номери' : 'Best rooms'}
            align="left"
            className="max-w-xl"
          />
          <Link
            to="/rooms"
            className="flex items-center gap-2 min-h-11 text-sm font-semibold font-display text-primary-900 hover:text-primary-700 transition-colors shrink-0 group underline underline-offset-4 decoration-primary-900/30 hover:decoration-primary-700"
          >
            {isUa ? 'Переглянути всі номери' : 'View all rooms'}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : rooms?.map((room, i) => <RoomCard key={room.id} room={room} index={i} />)}
        </div>
      </div>
    </section>
  )
}
