import http from '../utils/http.js'

function apiGetChannels() {
    return http({
        url: '/channels',
        params: {}
    })
}
export {
    apiGetChannels
}