import { computed, ref } from 'vue'

const VALID_LANGUAGES = ['es', 'en']
const STORAGE_KEY = 'site-language'
const DEFAULT_LANGUAGE = 'es'

const getInitialLanguage = () => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return VALID_LANGUAGES.includes(stored) ? stored : DEFAULT_LANGUAGE
}

const language = ref(getInitialLanguage())

const persistLanguage = (lang) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, lang)
  document.documentElement.setAttribute('lang', lang)
}

persistLanguage(language.value)

const setLanguage = (lang) => {
  if (!VALID_LANGUAGES.includes(lang)) return
  language.value = lang
  persistLanguage(lang)
}

const toggleLanguage = () => {
  setLanguage(language.value === 'es' ? 'en' : 'es')
}

export const useLanguage = () => ({
  language,
  isSpanish: computed(() => language.value === 'es'),
  setLanguage,
  toggleLanguage,
})
