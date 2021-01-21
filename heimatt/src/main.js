import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入vant,,    // 使用vant中的图片懒加载
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
// 导入iconfont
import './style/fonticon.css'
// 导入全局过滤器
import './filters/timefilter'
// 导入登录验证的插件
import MyPlugin from './plugin/myplugin'
// 使用vant
Vue.use(Vant)
Vue.use(Lazyload);
// 使用登录验证插件
Vue.use(MyPlugin)

// // 封装一个全局的登录验证方法
// Vue.prototype.$login = function() {
//     // 得到用户信息
//     let user = store.state.user
//         // 判断
//     if (!user.token) {
//         // 跳转到登录页面
//         router.push('/login')
//         return false // 后续代码不执行
//     }
//     return true // 用户已经登录过，继续执行后续的代码
// }



Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')