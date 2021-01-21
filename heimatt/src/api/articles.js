// 操作所有与文章相关的http请求

import http from '../utils/http'

function apiGetArticleList({ channel_id, timestamp }) {
    return http({
        url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
        method: 'get',
        params: {
            channel_id: channel_id,
            timestamp: timestamp,
            with_top: 0
        }
    })
}
// 将文章设置为不喜欢
function apiDislike(artid) {
    return http({
        url: '/article/dislikes',
        method: 'POST',
        data: {
            target: artid
        }
    })
}
// 举报文章
function apiReport({ artid, type }) {
    return http({
        url: '/article/reports',
        method: 'POST',
        data: {
            target: artid,
            type: type,
            remark: ''
        }
    })
}
// 根据文章id获取文章详细内容
function apiGetDetail(artid) {
    return http({
        url: `/articles/${artid}`
    })
}

// 取消点赞
function apiNoLike(autId) {
    return http({
        url: `/article/likings/:${autId}`,
        method: 'DELETE',
    })
}

// 点赞
function apiLike(autId) {
    return http({
        url: '/article/likings',
        method: 'POST',
    })
}

//获取文章的评论
function apiGetComment({ artid, offset }) {
    return http({
        url: '/comments',
        method: 'GET',
        params: {
            type: 'a',
            source: artid,
            offset: offset,
            limit: 10
        }
    })
}
// 评论回复
function apiGetReply({ comid, offset }) {
    return http({
        url: '/comments',
        method: 'GET',
        params: {
            type: 'c',
            source: comid,
            offset: offset,
            limit: 10
        }
    })
}


// 添加评论
function apiAddComments({ artid, content }) {
    return http({
        url: '/comments',
        method: 'POST',
        data: {
            target: artid,
            content: content
        }
    })
}
// 添加评论的回复
function apiAddReply({ comid, content, artid }) {
    return http({
        url: '/comments',
        method: 'POST',
        data: {
            target: comid,
            content: content,
            art_id: artid
        }
    })
}


export {
    apiGetArticleList,
    apiDislike,
    apiReport,
    apiGetDetail,
    apiNoLike,
    apiLike,
    apiGetComment,
    apiAddComments,
    apiGetReply,
    apiAddReply
}