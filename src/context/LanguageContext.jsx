import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LanguageContext = createContext(null)

const DEFAULT_LANGUAGE = 'ua'

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || DEFAULT_LANGUAGE)

  useEffect(() => {
    localStorage.setItem('language', language)
    // BCP 47: Ukrainian is "uk", not "ua" (fixes Lighthouse invalid [lang])
    document.documentElement.lang = language === 'ua' ? 'uk' : 'en'
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((prev) => (prev === 'ua' ? 'en' : 'ua')),
    }),
    [language]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
