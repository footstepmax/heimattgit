// 关于用户的网络请求全部放在这里
import http from '../utils/http.js'

// 封装登录方法
function apiLogin({ mobile, code }) {
    return http({
        url: '/authorizations',
        method: 'post',
        data: {
            mobile,
            code
        }
    })
}
// 关注用户
function apiFollowed(autId) {
    return http({
        url: '/user/followings',
        method: 'POST',
        data: {
            target: autId
        }
    })
}

// 取关用户
function apiUnFollowed(autId) {
    return http({
        url: `/user/followings/${autId}`,
        method: 'DELETE',
    })
}

// 获取用户自己信息
function apiGetUser() {
    return http({
        url: '/user'
    })
}
// 获取用户个人资料
function apiGetSelf() {
    return http({
        url: '/user/profile'
    })
}

// 修改用户个人信息
function apiSetUser({ name, intro, gender, birthday }) {
    return http({
        url: '/user/profile',
        method: 'PATCH',
        data: {
            name: name,
            intro: intro,
            gender: gender,
            birthday: birthday
        }
    })
}
// 修改用户的头像
function apiSetPhoto(photo) {
    // console.log(photo);
    // photo：是一个图片对象
    // 因为axios的底层是基于XMLHttpReauest的，
    // 不支持传递文件对象，可以选择用FormData提交参数
    let fd = new FormData()
        // 提交参数
    fd.append('photo', photo)
    return http({
        url: '/user/photo',
        method: 'PATCH',
        data: fd
    })
}

// 暴露出去
export {
    apiLogin,
    apiFollowed,
    apiUnFollowed,
    apiGetUser,
    apiGetSelf,
    apiSetUser,
    apiSetPhoto
}