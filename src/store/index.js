import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages: null
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  getters: {
    messages: state => state.messages
  }
})
