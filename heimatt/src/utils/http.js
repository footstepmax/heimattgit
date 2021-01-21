// 导入axios
import axios from 'axios'
import store from '../store/index'
// 导入 jsonbigint
import jsonbig from 'json-bigint'
// 创建axios实例
const instance = axios.create({
        baseURL: 'http://ttapi.research.itcast.cn/app/v1_0',
        // 得到服务器响应的原始数据
        transformResponse: [function(data) {
            try {
                // JSON.parse 其实是 axios 内部的默认处理方式
                return jsonbig.parse(data)
            } catch (error) {
                return JSON.parse(data)
            }
        }]
    })
    // 再创建一个 axios 实例：用来在 instance 中的响应拦截器中发送请求
const instance2 = axios.create({
    // 设置基地址
    baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/'
})


// 添加请求拦截器
instance.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    // 判断用户是否登录：
    // 获取用户信息
    // 判断用户是否有token
    let user = store.state.user
    if (user.token) {
        // 在请求头中添加 token
        config.headers.Authorizations = `Bearer ${user.token}`
    }
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    return response;
}, async function(error) {
    // 对响应错误做点什么
    // console.log('-----------响应拦截器-----------------')
    //     // 判断状态是否为 401:说明 token 过期
    // if (error.response.status === 401) {
    //     // 得到 refresh_token
    //     let user = store.state.user
    //     let refreshtoken = user.refresh_token
    //         // 将参数提交到服务器得到新的 token
    //         // 请求服务器
    //     let res = await instance2({
    //             url: '/authorizations',
    //             method: 'PUT',
    //             headers: {
    //                 Authorization: `Bearer ${refreshtoken}`
    //             }
    //         })
    //         // 将 token 保存起来
    //     let newToken = res.data.data.token
    //         // 更新 token
    //     user.token = newToken
    //         // 将 user 重新保存到 vuex 中
    //     store.commit('setUser', user)
    //         // token 就已经更新了，继续请求未完成的请求
    //         // return 的意思是将新的请求的结果交给响应拦截器
    //     return instance(error.config) // 未完成的请求的参数
    // }
    // console.log('-----------响应拦截器-----------------')
    return Promise.reject(error);
});
// 暴露出去
export default instance