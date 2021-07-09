export default {
  name: 'NS Project',
  apiUrl: '/api',
  secretSalt: '[NS]',
  langList: [
    { value: 'th', text: 'Thai' },
    { value: 'en', text: 'English' },
  ],
  langDefault: 'en',
  langFallback: 'en',
  yearFormatList: [
    { value: 'be', text: 'B.E.' },
    { value: 'ce', text: 'C.E.' },
  ],
  yearFormatDefault: 'be',
  mqtt: {
    url: 'ws://13.67.73.166:8083/mqtt',
    options: {
      username: 'demo',
      password: '123456',
    },
  },
}
