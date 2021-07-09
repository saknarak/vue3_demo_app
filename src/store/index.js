import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

import ui from './ui'

export default {
  strict: false,
  state,
  mutations,
  getters,
  actions,
  modules: {
    ui,
  },
}
