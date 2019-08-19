/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
// import cache from '@/utils/cache'
import { LoadingBar } from 'iview'
import { setTitle } from '@/utils'

Vue.use(Router)

// 动态路由
const routersContext = require.context('@/views', true, /router\.js$/)
var routersArray = routersContext.keys().map(key => routersContext(key).default)
routersArray.push({ path: '**',  redirect: '/' })
const routerObj = new Router({
    routes: routersArray
})

// 全局路由登录验证，权限验证路由拦截
routerObj.beforeEach((to, from, next) => {
    // 免登录或已登录
    if(to.matched.some(record => record.meta.noAuth)) {
        LoadingBar.start()
        next()
    }else {
        LoadingBar.start()
        next()
        // next({ path:'/account', replace: true })
    }
})

routerObj.afterEach(to => {
    setTitle(to, routerObj.app)
    LoadingBar.finish()
})

export default routerObj
