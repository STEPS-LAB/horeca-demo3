import { useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Check, User, Phone, Mail, CalendarDays, ArrowRight } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useBookingStore } from '@/store/bookingStore'
import { bookingApi } from '@/services/api/booking'
import { roomsApi } from '@/services/api/rooms'
import { formatPrice, formatDate, getNights } from '@/utils/format'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Rating from '@/components/ui/Rating'
import { useLanguage } from '@/context/LanguageContext'
import { localizeRoom } from '@/i18n/rooms'

const schema = z.object({
  firstName: z
    .string()
    .min(2, "Мінімум 2 символи")
    .regex(/^[A-Za-zА-Яа-яІіЇїЄєҐґ'’\-\s]+$/, 'Лише літери'),
  lastName: z
    .string()
    .min(2, "Мінімум 2 символи")
    .regex(/^[A-Za-zА-Яа-яІіЇїЄєҐґ'’\-\s]+$/, 'Лише літери'),
  phone: z
    .string()
    .refine((value) => {
      const digits = value.replace(/\D/g, '')
      return digits.length === 12 && digits.startsWith('380')
    }, 'Введіть коректний номер'),
  email: z.string().email('Невірний email'),
  requests: z.string().optional(),
})

const PHONE_PREFIX = '+38 (0'

export default function Booking() {
  const { language } = useLanguage()
  const isUa = language === 'ua'
  const navigate = useNavigate()
  const {
    selectedRoom,
    checkIn,
    checkOut,
    adults,
    children,
    setSelectedRoom,
    setDates,
    setGuests,
    setConfirmation,
  } = useBookingStore()

  const { data: rooms = [] } = useQuery({
    queryKey: ['rooms', 'booking-page'],
    queryFn: () => roomsApi.getAll({ sort: 'popular' }),
  })

  useEffect(() => {
    if (!selectedRoom && rooms.length > 0) {
      setSelectedRoom(rooms[0])
    }
  }, [selectedRoom, rooms, setSelectedRoom])

  useEffect(() => {
    if (!checkIn || !checkOut) {
      const today = new Date()
      const inDate = new Date(today)
      inDate.setDate(today.getDate() + 1)
      const outDate = new Date(today)
      outDate.setDate(today.getDate() + 2)
      setDates(inDate.toISOString().split('T')[0], outDate.toISOString().split('T')[0])
    }
  }, [checkIn, checkOut, setDates])

  const nights = getNights(checkIn, checkOut)
  const total = selectedRoom ? selectedRoom.price * nights : 0
  const checkInInputRef = useRef(null)
  const checkOutInputRef = useRef(null)

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      bookingApi.createBooking({
        room: selectedRoom,
        checkIn,
        checkOut,
        adults,
        children,
        guest: data,
        total,
        nights,
      }),
    onSuccess: (booking) => {
      setConfirmation(booking)
      navigate('/confirmation')
    },
  })

  if (!selectedRoom) return null
  const localizedRoom = localizeRoom(selectedRoom, language)
  const totalGuests = adults + children
  const guestLabel = isUa
    ? totalGuests === 1
      ? 'гість'
      : totalGuests < 5
        ? 'гості'
        : 'гостей'
    : totalGuests === 1
      ? 'guest'
      : 'guests'
  const formatDisplayDate = (value) =>
    value
      ? new Date(`${value}T00:00:00`).toLocaleDateString(isUa ? 'uk-UA' : 'en-US', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      : isUa
        ? 'Оберіть дату'
        : 'Select date'
  const openDatePicker = (inputRef) => {
    if (!inputRef.current) return
    inputRef.current.focus()
    if (typeof inputRef.current.showPicker === 'function') inputRef.current.showPicker()
  }
  const sanitizeName = (value) => value.replace(/[^A-Za-zА-Яа-яІіЇїЄєҐґ'’\-\s]/g, '')
  const applyPhoneMask = (raw) => {
    let digits = raw.replace(/\D/g, '')
    if (digits.startsWith('380')) digits = digits.slice(3)
    else if (digits.startsWith('0')) digits = digits.slice(1)
    digits = digits.slice(0, 9)

    let result = PHONE_PREFIX
    if (digits.length === 0) return result
    result += digits.slice(0, 2)
    if (digits.length >= 2) result += ')-'
    result += digits.slice(2, 5)
    if (digits.length >= 5) result += '-'
    result += digits.slice(5, 7)
    if (digits.length >= 7) result += '-'
    result += digits.slice(7, 9)
    return result
  }
  const handlePhoneChange = (event) => {
    const masked = applyPhoneMask(event.target.value)
    setValue('phone', masked, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }
  const handlePhoneFocus = () => {
    if (!getValues('phone')) {
      setValue('phone', PHONE_PREFIX, { shouldDirty: true, shouldTouch: true })
    }
  }
  const handlePhoneBlur = () => {
    if (getValues('phone') === PHONE_PREFIX) {
      setValue('phone', '', { shouldDirty: true, shouldTouch: true, shouldValidate: true })
    }
  }
  const handlePhoneKeyDown = (event) => {
    const value = getValues('phone') || ''
    if (event.key === 'Backspace' && (value === PHONE_PREFIX || value === '')) {
      event.preventDefault()
      setValue('phone', '', { shouldDirty: true, shouldTouch: true, shouldValidate: true })
      return
    }
    const allowedControlKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End']
    const isModifierKey = event.ctrlKey || event.metaKey
    if (isModifierKey || allowedControlKeys.includes(event.key)) return
    if (!/^\d$/.test(event.key)) event.preventDefault()
  }

  return (
    <div className="min-h-screen bg-canvas pt-20">
      <div className="container-max container-padding py-10">
        <div className="mb-8 bg-white rounded-lg shadow-soft p-5 transition-shadow duration-200 hover:shadow-medium">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-end">
            <div className="flex-1">
              <label className="text-sm font-bold text-primary-900 font-display mb-2 block">
                {isUa ? 'Оберіть номер' : 'Select room'}
              </label>
              <select
                value={selectedRoom.slug}
                onChange={(e) => {
                  const nextRoom = rooms.find((room) => room.slug === e.target.value)
                  if (nextRoom) setSelectedRoom(nextRoom)
                }}
                className="h-11 w-full px-3 rounded-lg border border-neutral-200 text-sm text-neutral-800 bg-white focus:outline-none focus:border-primary-500 transition-colors duration-200 hover:border-primary-300"
              >
                {rooms.map((room) => (
                  <option key={room.slug} value={room.slug}>
                    {localizeRoom(room, language).name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:w-[320px]">
              <div>
                <label className="text-sm font-bold text-primary-900 font-display mb-2 block">
                  {isUa ? 'Заїзд' : 'Check-in'}
                </label>
                <label
                  onClick={() => openDatePicker(checkInInputRef)}
                  className="relative h-11 w-full px-3 rounded-lg border border-neutral-200 text-sm text-neutral-800 bg-white flex items-center justify-between cursor-pointer transition-colors duration-200 hover:border-primary-300"
                >
                  <span>{formatDisplayDate(checkIn)}</span>
                  <CalendarDays className="w-4 h-4 text-primary-900 shrink-0" />
                  <input
                    ref={checkInInputRef}
                    type="date"
                    value={checkIn || ''}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDates(e.target.value, checkOut)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label={isUa ? 'Дата заїзду' : 'Check-in date'}
                  />
                </label>
              </div>
              <div>
                <label className="text-sm font-bold text-primary-900 font-display mb-2 block">
                  {isUa ? 'Виїзд' : 'Check-out'}
                </label>
                <label
                  onClick={() => openDatePicker(checkOutInputRef)}
                  className="relative h-11 w-full px-3 rounded-lg border border-neutral-200 text-sm text-neutral-800 bg-white flex items-center justify-between cursor-pointer transition-colors duration-200 hover:border-primary-300"
                >
                  <span>{formatDisplayDate(checkOut)}</span>
                  <CalendarDays className="w-4 h-4 text-primary-900 shrink-0" />
                  <input
                    ref={checkOutInputRef}
                    type="date"
                    value={checkOut || ''}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDates(checkIn, e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label={isUa ? 'Дата виїзду' : 'Check-out date'}
                  />
                </label>
              </div>
            </div>
            <div className="grid grid-cols-[44px_minmax(0,1fr)_44px] gap-2 w-full lg:w-auto">
              <button
                type="button"
                onClick={() => setGuests(Math.max(1, adults - 1), children)}
                aria-label={isUa ? 'Зменшити кількість дорослих' : 'Decrease number of adults'}
                className="w-11 h-11 rounded-lg border border-neutral-200 text-lg text-primary-900 transition-colors duration-200 hover:border-primary-300 hover:bg-primary-50"
              >
                -
              </button>
              <div className="h-11 w-full px-4 rounded-lg border border-neutral-200 flex items-center justify-center text-sm text-neutral-700 transition-colors duration-200 hover:border-primary-300 hover:bg-primary-50/40">
                {totalGuests} {guestLabel}
              </div>
              <button
                type="button"
                onClick={() => setGuests(Math.min(8, adults + 1), children)}
                aria-label={isUa ? 'Збільшити кількість дорослих' : 'Increase number of adults'}
                className="w-11 h-11 rounded-lg border border-neutral-200 text-lg text-primary-900 transition-colors duration-200 hover:border-primary-300 hover:bg-primary-50"
              >
                +
              </button>
            </div>
          </div>
          <Link
            to="/rooms"
            className="inline-flex items-center gap-2 min-h-11 text-sm font-semibold font-display text-primary-900 hover:text-primary-700 transition-colors duration-200 mt-4 group underline underline-offset-4 decoration-primary-900/30 hover:decoration-primary-700"
          >
            {isUa ? 'Переглянути всі номери' : 'View all rooms'}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start lg:items-stretch">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-soft p-6 sm:p-8"
            >
              <h1 className="text-2xl font-bold font-display text-primary-900 mb-6">
                {isUa ? 'Ваші дані для бронювання' : 'Your booking details'}
              </h1>

              <form onSubmit={handleSubmit(mutate)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label={isUa ? "Ім'я" : 'First name'}
                    placeholder={isUa ? "Ваше імʼя.." : 'Your name..'}
                    prefix={<User className="w-4 h-4" />}
                    error={errors.firstName?.message}
                    className="rounded-lg"
                    {...register('firstName', {
                      onChange: (event) => {
                        event.target.value = sanitizeName(event.target.value)
                      },
                    })}
                  />
                  <Input
                    label={isUa ? 'Прізвище' : 'Last name'}
                    placeholder={isUa ? 'Ваше прізвище..' : 'Your surname..'}
                    error={errors.lastName?.message}
                    className="rounded-lg"
                    {...register('lastName', {
                      onChange: (event) => {
                        event.target.value = sanitizeName(event.target.value)
                      },
                    })}
                  />
                </div>

                <Input
                  label={isUa ? 'Телефон' : 'Phone'}
                  type="tel"
                  placeholder="+38 (0__)-___-__-__"
                  prefix={<Phone className="w-4 h-4" />}
                  error={errors.phone?.message}
                  className="rounded-lg"
                  inputMode="numeric"
                  autoComplete="tel"
                  {...register('phone', {
                    onChange: handlePhoneChange,
                    onFocus: handlePhoneFocus,
                    onBlur: handlePhoneBlur,
                  })}
                  onKeyDown={handlePhoneKeyDown}
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="example@mail.com"
                  prefix={<Mail className="w-4 h-4" />}
                  error={errors.email?.message}
                  className="rounded-lg"
                  {...register('email')}
                />

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-neutral-700 font-display">
                    {isUa ? "Особливі побажання (необов'язково)" : 'Special requests (optional)'}
                  </label>
                  <textarea
                    placeholder={
                      isUa
                        ? "Ранній заїзд, алергія на пір'яні подушки, святкування..."
                        : 'Early check-in, allergy to feather pillows, celebration...'
                    }
                    rows={3}
                    className="w-full bg-white border border-neutral-200 rounded-lg px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-900/20 focus:border-primary-900 transition-colors resize-none hover:border-neutral-300"
                    {...register('requests')}
                  />
                </div>

                <div className="pt-4 border-t border-neutral-100">
                  <div className="flex items-center gap-2 text-sm text-neutral-500 mb-5">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    {isUa
                      ? 'Безкоштовне скасування до 48 годин до заїзду'
                      : 'Free cancellation up to 48 hours before check-in'}
                  </div>
                  <Button type="submit" fullWidth size="md" loading={isPending} className="rounded-lg">
                    {isPending
                      ? isUa
                        ? 'Обробляємо бронювання...'
                        : 'Processing booking...'
                      : isUa
                        ? 'Підтвердити бронювання'
                        : 'Confirm booking'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-soft p-6 lg:h-full lg:flex lg:flex-col">
              <h3 className="font-bold font-display text-primary-900 mb-4">
                {isUa ? 'Деталі бронювання' : 'Booking details'}
              </h3>

              <div className="mb-4">
                <img
                  src={localizedRoom.images[0]}
                  alt={localizedRoom.name}
                  className="w-full h-52 object-cover rounded-lg mb-3"
                />
                <h4 className="font-bold font-display text-primary-900">{localizedRoom.name}</h4>
                <Rating
                  value={localizedRoom.rating}
                  count={localizedRoom.reviewCount}
                  size="xs"
                  className="mt-1"
                />
              </div>

              <div className="space-y-3 text-sm border-t border-neutral-100 pt-4">
                <div className="flex justify-between">
                  <span className="text-neutral-500">{isUa ? 'Заїзд' : 'Check-in'}</span>
                  <span className="font-medium">{formatDate(checkIn)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">{isUa ? 'Виїзд' : 'Check-out'}</span>
                  <span className="font-medium">{formatDate(checkOut)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">{isUa ? 'Тривалість' : 'Duration'}</span>
                  <span className="font-medium">
                    {nights} {isUa ? (nights === 1 ? 'ніч' : nights < 5 ? 'ночі' : 'ночей') : nights === 1 ? 'night' : 'nights'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">{isUa ? 'Гості' : 'Guests'}</span>
                  <span className="font-medium">{adults + children} {isUa ? 'особи' : 'guests'}</span>
                </div>
              </div>

              <div className="border-t border-neutral-100 mt-auto pt-4">
                <div className="flex justify-between text-sm text-neutral-600 mb-2">
                  <span>
                    {formatPrice(localizedRoom.price)} × {nights} {isUa ? 'ночей' : 'nights'}
                  </span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between font-bold text-primary-900">
                  <span>{isUa ? 'Разом' : 'Total'}</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
