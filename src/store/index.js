import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocalStorage = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: {
    token:'',
    hasUnfinishedRoute: false,
    unfinishedRoute: {},
    permission:{}
  },
  mutations: {
    saveUnfinishedRoute(state, payload) {
      state.hasUnfinishedRoute = true
      state.unfinishedRoute = payload
    },
    clearUnfinishedRoute(state) {
      state.hasUnfinishedRoute = false
    },
    token(state, payload) {
      state.token = payload
    },
  },
  actions: {
  },
  modules: {
  }
})
