import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
    isShowFooter: true,
},
mutations: {
    
    isShowFooterNav(state, val) {
        state.isShowFooter = val;
    },
},
actions: {},
getters: {
  
},
modules: {},
})
