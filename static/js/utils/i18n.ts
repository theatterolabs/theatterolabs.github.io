import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import detector from 'i18next-browser-languagedetector'

import { en, zh } from 'locales'

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: {
      en,
      zh,
    },
    fallbackLng: 'en',

    fallbackNS: 'common',
    defaultNS: 'common',

    interpolation: {
      escapeValue: false,
    },
  })
