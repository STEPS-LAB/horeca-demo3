import { Mail, MapPin, Phone, Clock } from 'lucide-react'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useLanguage } from '@/context/LanguageContext'

function unsplashSrc(base, w) {
  return `${base}?w=${w}&q=70&fm=webp&fit=crop`
}

export default function Contact() {
  const { language } = useLanguage()
  const isUa = language === 'ua'
  const [name, setName] = useState('')

  return (
    <div className="min-h-screen bg-canvas">
      <section className="relative h-[19.2rem] sm:h-[22.4rem] overflow-hidden">
        <img
          src={unsplashSrc('https://images.unsplash.com/photo-1448375240586-882707db888b', 960)}
          srcSet={`${unsplashSrc('https://images.unsplash.com/photo-1448375240586-882707db888b', 640)} 640w, ${unsplashSrc('https://images.unsplash.com/photo-1448375240586-882707db888b', 960)} 960w, ${unsplashSrc('https://images.unsplash.com/photo-1448375240586-882707db888b', 1280)} 1280w, ${unsplashSrc('https://images.unsplash.com/photo-1448375240586-882707db888b', 1600)} 1600w`}
          sizes="100vw"
          alt={isUa ? 'Контакти готелю' : 'Hotel contacts'}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary-950/65" />
        <div className="absolute inset-0 container-max container-padding flex flex-col justify-center text-white">
          <h1 className="text-4xl sm:text-5xl font-bold font-display mb-3">
            {isUa ? "Зв'яжіться з Нами" : 'Contact Us'}
          </h1>
          <p className="text-white/80 max-w-xl">
            {isUa
              ? 'Маєте запитання або особливе прохання? Ми готові зробити ваше перебування досконалим.'
              : 'Have a question or a special request? We are ready to make your stay exceptional.'}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max container-padding grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          <div className="lg:col-span-2 bg-white rounded-lg p-6 sm:p-8 shadow-soft border border-neutral-100 space-y-6">
            <h2 className="text-2xl font-bold font-display text-primary-900">
              {isUa ? "Зв'яжіться з Нами" : 'Contact Us'}
            </h2>
            <div className="space-y-5 text-sm text-neutral-600">
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-900">{isUa ? 'Телефон' : 'Phone'}</p>
                  <a href="tel:+380441234567" className="transition-colors lg:hover:text-primary-900">
                    +380 44 123 4567
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-900">Email</p>
                  <a href="mailto:hotel@gmail.com" className="transition-colors lg:hover:text-primary-900">
                    hotel@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-900">{isUa ? 'Адреса' : 'Address'}</p>
                  <a
                    href="https://maps.google.com/?q=Карпатська+обл.,+смт.+Готель,+вул.+Лісова,+1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors lg:hover:text-primary-900"
                  >
                    Карпатська обл., смт. Готель, вул. Лісова, 1
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-900">
                    {isUa ? 'Заїзд / Виїзд' : 'Check-in / Check-out'}
                  </p>
                  <p>{isUa ? 'З 14:00 / До 12:00' : 'From 14:00 / Until 12:00'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white rounded-lg p-6 sm:p-8 shadow-soft border border-neutral-100">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={isUa ? "Ваше ім'я *" : 'Your Name *'}
                placeholder="—"
                value={name}
                onChange={(event) => setName(event.target.value.replace(/\d/g, ''))}
                className="rounded-lg"
              />
              <Input
                label={isUa ? 'Електронна Пошта *' : 'Email *'}
                placeholder="—"
                type="email"
                className="rounded-lg"
              />
              <div className="sm:col-span-2">
                <Input label={isUa ? 'Тема *' : 'Subject *'} placeholder="—" className="rounded-lg" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {isUa ? 'Повідомлення *' : 'Message *'}
                </label>
                <textarea
                  rows={5}
                  placeholder={
                    isUa
                      ? 'Маєте запитання або особливе прохання? Ми готові зробити ваше перебування досконалим.'
                      : 'Have a question or a special request? We are ready to make your stay exceptional.'
                  }
                  className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20"
                />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" className="w-full rounded-lg" size="md">
                  {isUa ? 'Надіслати Повідомлення' : 'Send Message'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
