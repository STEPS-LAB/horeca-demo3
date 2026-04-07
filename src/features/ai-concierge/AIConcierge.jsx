import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageSquare, Send, Sparkles, X } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useScrollPosition } from '@/hooks/useScrollPosition'

const RESPONSES = {
  ua: {
    welcome: 'Вітаю! Я ваш AI-консьєрж. Запитайте мене про будь-що щодо вашого перебування.',
    default: 'Дякую за запитання! Я з радістю допоможу з інформацією про курорт. Що саме вас цікавить?',
    restaurant:
      'Рекомендую скуштувати фірмову качку з яблуками, карпаччо з локальної риби та сезонні десерти від шефа.',
    spa: 'Для глибокого релаксу підійде програма з масажем, сауною та аромаритуалом. Тривалість близько 2.5 годин.',
    rooms:
      'Для пари найчастіше обирають "Котедж біля озера", а для сімейного відпочинку зручний "Сімейний люкс".',
    activities:
      'На території доступні еко-стежки, йога, риболовля, каякінг та вечірні спостереження за зорями.',
    placeholder: 'Запитайте щось...',
    openLabel: 'Відкрити AI чат',
    closeLabel: 'Закрити AI чат',
    sendLabel: 'Надіслати повідомлення',
    title: 'AI Консьєрж',
    askAnything: 'Запитайте що завгодно',
    suggestions: [
      'Які страви ви рекомендуєте?',
      'Найкраща програма релаксації?',
      'Який номер найкращий для пари?',
      'Що можна робити на території?',
    ],
  },
  en: {
    welcome: "Hello! I'm your AI concierge. Ask me anything about your stay.",
    default: "Thanks for your message! I'd be happy to help with resort details. What would you like to know?",
    restaurant:
      'I recommend trying signature duck with apples, local fish carpaccio, and our seasonal chef desserts.',
    spa: 'For deep relaxation, choose a package with massage, sauna, and aromatherapy. It takes about 2.5 hours.',
    rooms:
      'For couples, guests usually choose the Lake Cottage. For families, the Family Suite is the most comfortable.',
    activities:
      'You can enjoy eco-trails, yoga, fishing, kayaking, and evening stargazing on the resort grounds.',
    placeholder: 'Ask something...',
    openLabel: 'Open AI chat',
    closeLabel: 'Close AI chat',
    sendLabel: 'Send message',
    title: 'AI Concierge',
    askAnything: 'Ask anything',
    suggestions: [
      'What dishes do you recommend?',
      'Best relaxation program?',
      'Which room is best for a couple?',
      'What can we do on-site?',
    ],
  },
}

function pickReply(value, copy) {
  const text = value.toLowerCase()
  if (/restaurant|ресторан|їжа|страв|food|dish/.test(text)) return copy.restaurant
  if (/spa|спа|масаж|релакс|relax|massage/.test(text)) return copy.spa
  if (/room|номер|котедж|suite|cottage/.test(text)) return copy.rooms
  if (/activity|дозвілля|розваг|що робити|hiking|kayak/.test(text)) return copy.activities
  return copy.default
}

export default function AIConcierge() {
  const { language } = useLanguage()
  const { scrolled } = useScrollPosition()
  const copy = useMemo(() => RESPONSES[language] || RESPONSES.ua, [language])
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState([{ id: 'welcome', role: 'assistant', content: copy.welcome }])
  const endRef = useRef(null)
  const panelId = 'ai-concierge-panel'

  useEffect(() => {
    if (!isOpen) return undefined
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen])

  useEffect(() => {
    setMessages([{ id: 'welcome', role: 'assistant', content: copy.welcome }])
  }, [copy.welcome])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = (event) => {
    event.preventDefault()
    const value = input.trim()
    if (!value || isTyping) return

    const userMessage = { id: String(Date.now()), role: 'user', content: value }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: String(Date.now() + 1), role: 'assistant', content: pickReply(value, copy) },
      ])
      setIsTyping(false)
    }, 900)
  }

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : 18 }}
        transition={{ duration: 0.25 }}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={copy.openLabel}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={`fixed z-40 right-4 sm:right-6 bottom-20 sm:bottom-24 md:bottom-6 flex items-center justify-center rounded-md bg-primary-900 text-white shadow-large transition-all hover:bg-primary-800 ${
          isOpen ? 'w-11 h-11 p-0' : 'gap-2 px-4 py-3'
        } ${
          scrolled ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {isOpen ? (
          <X className="w-4 h-4 text-white" />
        ) : (
          <>
            <MessageSquare className="w-4 h-4 text-secondary-300" />
            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase hidden sm:inline">
              {copy.askAnything}
            </span>
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="fixed inset-0 z-40 bg-black/25 backdrop-blur-md md:backdrop-blur-none"
              onClick={() => setIsOpen(false)}
            />
            <div className="fixed inset-0 z-50 p-3 sm:p-6 flex items-center justify-center md:items-end md:justify-end">
              <motion.div
                id={panelId}
                initial={{ opacity: 0, y: 14, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 14, scale: 0.985 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-md md:mb-20 md:mr-6 bg-white rounded-md shadow-large overflow-hidden flex flex-col max-h-[78vh] overscroll-contain"
              >
                <div className="flex items-center justify-between bg-gradient-to-r from-primary-800 to-primary-700 px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-white font-semibold">{copy.title}</p>
                      <p className="text-[11px] text-white/70">Online</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-white/80 hover:text-white"
                    aria-label={copy.closeLabel}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 overscroll-contain">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 8, scale: 0.995 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.24, ease: 'easeOut', delay: index * 0.02 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[84%] px-3 py-2.5 rounded-md text-sm leading-relaxed ${
                          message.role === 'user'
                            ? 'bg-primary-800 text-white'
                            : 'bg-neutral-100 text-neutral-800'
                        }`}
                      >
                        {message.content}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-3 py-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:120ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:240ms]" />
                    </motion.div>
                  )}
                  <div ref={endRef} />
                </div>

                {messages.length < 3 && (
                  <div className="px-4 pb-2 flex flex-wrap gap-2">
                    {copy.suggestions.map((item) => (
                      <button
                        key={item}
                        onClick={() => setInput(item)}
                        className="text-xs px-2.5 py-1.5 rounded-md bg-neutral-100 text-neutral-700 hover:bg-primary-50 hover:text-primary-900 transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}

                <form onSubmit={sendMessage} className="p-3 border-t border-neutral-100">
                  <div className="flex items-center gap-2">
                    <input
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      placeholder={copy.placeholder}
                      aria-label={copy.placeholder}
                      className="flex-1 h-11 min-h-11 rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm outline-none focus:border-primary-500"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isTyping}
                      aria-label={copy.sendLabel}
                      className="min-h-11 min-w-11 shrink-0 rounded-md bg-primary-800 text-white inline-flex items-center justify-center disabled:opacity-45 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors"
                    >
                      <Send className="w-4 h-4" aria-hidden />
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
