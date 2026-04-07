import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Calendar, Users, Home, ArrowRight } from 'lucide-react'
import { useBookingStore } from '@/store/bookingStore'
import { formatPrice, formatDate } from '@/utils/format'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/context/LanguageContext'
import { localizeRoom } from '@/i18n/rooms'

export default function Confirmation() {
  const { language } = useLanguage()
  const isUa = language === 'ua'
  const navigate = useNavigate()
  const { confirmation, selectedRoom, checkIn, checkOut, adults, children, reset } =
    useBookingStore()

  useEffect(() => {
    if (!confirmation) navigate('/', { replace: true })
  }, [confirmation, navigate])

  if (!confirmation || !selectedRoom) return null
  const localizedRoom = localizeRoom(selectedRoom, language)

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full"
      >
        {/* Success icon */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </motion.div>
          <h1 className="text-3xl font-bold font-display text-primary-900 mb-2">
            {isUa ? 'Бронювання підтверджено!' : 'Booking confirmed!'}
          </h1>
          <p className="text-neutral-500">
            {isUa ? 'Підтвердження надіслано на вашу email-адресу.' : 'Confirmation has been sent to your email.'}
          </p>
        </div>

        {/* Booking summary card */}
        <div className="bg-white rounded-xl shadow-medium p-6 mb-6">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-neutral-100">
            <span className="text-sm text-neutral-500">{isUa ? 'Номер бронювання' : 'Booking number'}</span>
            <span className="font-bold font-display text-primary-900 text-lg">
              {confirmation.id}
            </span>
          </div>

          <div className="flex gap-4 mb-4">
            <img
              src={localizedRoom.images[0]}
              alt={localizedRoom.name}
              className="w-20 h-16 object-cover rounded-md shrink-0"
            />
            <div>
              <h3 className="font-bold font-display text-primary-900">{localizedRoom.name}</h3>
              <p className="text-sm text-neutral-500">{isUa ? 'Готель курорт' : 'Hotel resort'}</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-neutral-600">
              <Calendar className="w-4 h-4 text-primary-600 shrink-0" />
              <span>
                {formatDate(checkIn)} — {formatDate(checkOut)}
              </span>
            </div>
            <div className="flex items-center gap-3 text-neutral-600">
              <Users className="w-4 h-4 text-primary-600 shrink-0" />
              <span>{adults + children} {isUa ? 'гостей' : 'guests'}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-neutral-100 flex justify-between font-bold text-primary-900">
            <span>{isUa ? 'Оплачено' : 'Paid'}</span>
            <span>{formatPrice(confirmation.total)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button as={Link} to="/rooms" fullWidth variant="primary" onClick={reset}>
            {isUa ? 'Забронювати ще номер' : 'Book another room'}
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button as={Link} to="/" fullWidth variant="secondary" onClick={reset}>
            <Home className="w-4 h-4" />
            {isUa ? 'На головну' : 'Back to home'}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
