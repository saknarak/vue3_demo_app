export default {
  setNav(state, newNav) {
    state.nav = newNav
  },
  openNav(state) {
    state.nav = true
  },
  closeNav(state) {
    state.nav = false
  },
  toggleNav(state) {
    state.nav = !state.nav
  },
  async setLang(state, lang) {
    // state.nav = false
    state.lang = lang
  },
  setProductList(state, list) {
    state.productList = list
  },
}
