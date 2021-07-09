export default {
  langName(state) {
    let langName = { th: 'Thai', en: 'English' }
    return langName[state.lang]
  },
}
