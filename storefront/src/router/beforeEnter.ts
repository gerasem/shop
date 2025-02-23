import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { loadLocaleMessages } from '@/i18n/translation.ts'

const SUPPORTED_LANGUAGES = ['en', 'de']
const DEFAULT_LANGUAGE = 'de'

export async function handleLocaleRouting(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
): Promise<void> {
  console.log('handle routing')
  const lang = to.params.locale || detectUserLanguage()
  const normalizedLang = normalizeLanguage(lang as string)

  if (to.params.locale !== normalizedLang) {
    next({
      path: `/${normalizedLang}`,
      query: to.query,
      hash: to.hash,
    })

    return
  }

  await loadLocaleMessages(normalizedLang)

  next()
}

function normalizeLanguage(lang: string): string {
  return SUPPORTED_LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE
}

function detectUserLanguage(): string {
  const browserLang = navigator.language.split('-')[0]
  return normalizeLanguage(browserLang)
}
