import { createStore } from 'vuex'

export default createStore({
  state: {
    darkmode: false
  },
  mutations: {
    switchDarkmode: state => (state.darkmode = !state.darkmode)
  },
  getters: {
    getDarkmode: state => state.darkmode
  },
  actions: {},
  modules: {}
})
