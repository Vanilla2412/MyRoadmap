import { ref } from 'vue'

const currentLang = ref<'ja' | 'en'>('ja')

// Read initial setting from localStorage if running in browser
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('myroadmap_docs_lang')
  if (saved === 'ja' || saved === 'en') {
    currentLang.value = saved
  }
}

export function useLanguage() {
  const setLang = (lang: 'ja' | 'en') => {
    currentLang.value = lang
    if (typeof window !== 'undefined') {
      localStorage.setItem('myroadmap_docs_lang', lang)
    }
  }

  const toggleLang = () => {
    setLang(currentLang.value === 'ja' ? 'en' : 'ja')
  }

  return {
    currentLang,
    setLang,
    toggleLang
  }
}
