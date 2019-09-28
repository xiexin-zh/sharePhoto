// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {},
    path:[],
    nickName:"",
  },
  mutations: {

    getUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    getPath(state,path){
      state.path =[...state.path,...path]
    },
    sendNickName(state,nickName){
      state.nickName = nickName;
    }


  }
})

export default store
