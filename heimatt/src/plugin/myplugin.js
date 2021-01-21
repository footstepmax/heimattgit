// 封装一个全局的登录验证方法
// 导入store,router
import store from '../store'
import router from '../router'


// 1.创建一个插件对象
let MyPlugin = {}
    // 2.给对象添加一个install方法
MyPlugin.install = function(Vue) {
    // 3.给vue添加一个实例方法，并且把vue作为第一个参数
    Vue.prototype.$login = function() {
        // 得到用户信息
        let user = store.state.user
            // 判断
        if (!user.token) {
            // 跳转到登录页面
            router.push('/checkLogin')
            return false // 后续代码不执行
        }
        return true // 用户已经登录过，继续执行后续的代码
    }
}

// 4.导出
export default MyPlugin