import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate';

import http from "@/config/axios"


Vue.use(Vuex)

const getDefaultState = () => {
    return {
      analytics: {}
    };
};

export default new Vuex.Store({
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
      getAnalytics: (state) => {
        return state.analytics
      }
    },
    mutations: {
      SET_ANALYTICS: (state, data) => {
        state.analytics = data;
    },
    },
    actions: {
      getAnalytics({commit}){
        http().get("/analytics")
        .then((res)=>{
          commit("SET_ANALYTICS", res.data.users)
          console.log(res.data.users);
        })
        .catch((err)=>{
          console.log(err);
        })
      }
    },
    modules: {

    },
})