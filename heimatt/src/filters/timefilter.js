// 封装一个处理时间的全局过滤器

import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' //  导入插件
import 'dayjs/locale/zh-cn' //  导入语言包

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

// 定义全局过滤器,str为要处理的时间数据
Vue.filter('timefilter', function(str) {
    return dayjs().to(dayjs(str))
})