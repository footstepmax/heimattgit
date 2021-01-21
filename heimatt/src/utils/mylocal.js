// 操作localStorage的方法
// 增
function setItem(key, value) {
    // 将获取的数据 以字符串的形式存到 localStorage中
    window.localStorage.setItem(key, JSON.stringify(value))
}
// 查
function getItem(key) {
    // 获取localstorage中的数据，并转为对象
    return JSON.parse(window.localStorage.getItem(key))
}
// 删
function removeItem(key) {
    window.localStorage.removeItem(key)
}
export {
    setItem,
    getItem,
    removeItem
}