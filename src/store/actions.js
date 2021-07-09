export default {
  async fetchLang({ commit }) {
    let { data } = await this.$axios.get('/api/lang')
    commit('lang', data.lang)
  },
}
