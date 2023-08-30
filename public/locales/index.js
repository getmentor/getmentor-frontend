import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en.js'
import ru from './ru.js'

const resources = { en, ru }

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'en', // use en if detected lng is not available
  })

export default i18n
