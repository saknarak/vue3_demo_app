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
    url: 'ws://10.0.2.226:8083/mqtt',
    options: {
      username: 'celims-ui',
      password: 'celims!@1234',
    },
  },
}
