// 用来处理所有与频道相关的网络请求
import http from '../utils/http'

function apiGetChannel() {
    return http({
        url: 'user/channels',
    })
}

function apiGetAllChannel() {
    return http({
        url: '/channels',
    })
}

function apiResetChannel(channels) {
    return http({
        url: '/user/channels ',
        method: 'PUT',
        data: {
            channels: channels
        }
    })
}
export {
    apiGetChannel,
    apiGetAllChannel,
    apiResetChannel
}