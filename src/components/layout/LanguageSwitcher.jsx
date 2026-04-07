import { useLanguage } from '@/context/LanguageContext'
import { cn } from '@/utils/cn'

const OPTIONS = [
  { id: 'ua', label: 'UA' },
  { id: 'en', label: 'EN' },
]

const OPTION_LABELS = {
  ua: 'Українська',
  en: 'English',
}

export default function LanguageSwitcher({ dark = false }) {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      role="group"
      aria-label={language === 'ua' ? 'Мова сайту' : 'Site language'}
      className={cn(
        'inline-flex items-center rounded-full p-1 border',
        dark ? 'bg-white border-neutral-200' : 'bg-white/10 border-white/25 backdrop-blur-sm'
      )}
    >
      {OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => setLanguage(option.id)}
          aria-label={OPTION_LABELS[option.id]}
          aria-pressed={language === option.id}
          className={cn(
            'px-3 py-1 text-xs font-semibold rounded-full transition-colors',
            language === option.id
              ? dark
                ? 'bg-primary-900 text-white'
                : 'bg-white text-primary-900'
              : dark
                ? 'text-neutral-500 hover:text-neutral-800'
                : 'text-white/75 hover:text-white'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
