import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import UseVant from '../views/usevant/index.vue'
// 导入login组件
const Login = () =>
    import ('../views/login')
    // 导入home组件
const Home = () =>
    import ('../views/home')
    // 导入layout组件
const Layout = () =>
    import ('../views/layout')
const Search = () =>
    import ('../views/search')
const SearchResult = () =>
    import ('../views/searchResult')
    // 导入文章详情页面
const Detail = () =>
    import ('../views/detail')
const My = () =>
    import ('../views/my')
const UserInfo = () =>
    import ('../views/userinfo')

const Robot = () =>
    import ('../views/robot')

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/home'
    }, {
        path: '/usevant',
        component: UseVant
    },
    // 第一次登录的路由
    {
        path: '/login',
        component: Login
    },
    // 登录验证返回的路由
    {
        path: '/checkLogin',
        component: Login
    },
    // 添加一个layout路由
    {
        path: '/layout',
        component: Layout,
        children: [
            // 添加首页路由
            {
                path: '/home',
                component: Home
            },
            // 添加我的路由
            {
                path: '/my',
                component: My
            },
            // 添加搜索路由
            {
                path: '/search',
                component: Search
            }
        ]
    },
    // 添加一个搜索结果页面
    {
        path: '/searchResult/:mykey', //动态路由，给当前searchResult路由添加一个动态参数：参数的键为key
        component: SearchResult
    },
    // 添加一个文章详情内容的动态路由
    {
        path: '/detail/:artid',
        component: Detail
    },
    // 添加一个用户个人信息页面
    {
        path: '/userinfo',
        component: UserInfo
    },
    // 添加一个机器人
    {
        path: '/robot',
        component: Robot
    }
]

const router = new VueRouter({
    routes
})

export default router