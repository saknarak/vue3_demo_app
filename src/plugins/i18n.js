import { createI18n } from 'vue-i18n'

const messages = Object.fromEntries(
  Object.entries(
    import.meta.globEager('../../locales/*.y(a)?ml'))
    .map(([key, value]) => {
      const yaml = key.endsWith('.yaml')
      console.log('key=', key)
      return [key.slice(14, yaml ? -5 : -4), value.default]
    }),
)

export const install = ({ app }) => {
  console.log('i18n install')
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    messages,
  })
  console.log('messages', messages)

  app.use(i18n)
}
