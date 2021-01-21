// 用来管理所有与搜索相关的网络请求
import http from '../utils/http.js'

// 联想的方法
function apiThink(q) {
    return http({
        url: `/suggestion?q=${q}`,
    })
}
// 根据搜索关键字得到文章数据
function apiGetSearchResult({ page, perpage, q }) {
    return http({
        url: `/search?page=${page}&per_page=${perpage}&q=${q}`
    })
}

export {
    apiThink,
    apiGetSearchResult
}