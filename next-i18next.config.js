/** @type {import('next-i18next').UserConfig} */

module.exports = {
  i18n: {
    locales: ['ru', 'en'],
    defaultLocale: 'ru',
  },
  keySeparator: '.',
  react: { useSuspense: true },
}
