import Vue from 'vue'
import Vuex from 'vuex'

import account from "@/store/account"
import equipment from "@/store/equipment"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    account: account,
    equipment: equipment
  }
})
