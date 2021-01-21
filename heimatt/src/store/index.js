import Vue from 'vue'
import Vuex from 'vuex'
// 导入操作localstorage的方法
import { setItem, getItem } from '../utils/mylocal.js'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 定义一个变量用来保护用户信息
        // 每次打开页面时，需要从localstorage中获取用户信息（token）
        user: getItem('userInfo') || {}
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
                // 将token保存在localstorage中
            setItem('userInfo', payload)
        }

    },
    actions: {},
    modules: {}
})