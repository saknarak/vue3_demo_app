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
  setLang(state, newLang) {
    state.lang = newLang
  },
  setProductList(state, list) {
    state.productList = list
  }
}
