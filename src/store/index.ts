import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
import { USER } from '@/utils/constants'
import { ILoginInfo } from '@/services/types/common'

Vue.use(Vuex)

export default new Vuex.Store({
  // 容器的状态实现了数据共享，在组件里面访问方便，但是没有持久化的功能
  state: {
    user: getItem<ILoginInfo>(USER) // 当前登录用户状态
  },
  getters: {
  },
  mutations: {
    // 修改容器数据必须使用 mutation 函数
    setUser (state, payload) {
      state.user = JSON.parse(payload)

      // 为了防止页面刷新数据丢失，我们需要把 user 数据持久化
      // 注意：本地存储只能存字符串
      setItem(USER, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
