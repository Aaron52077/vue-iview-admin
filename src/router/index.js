/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/** 动态路由配置
 *  获取各个模块router.js配置上下文
 */
const routersContext = require.context('@/views', true, /router\.js$/)
// 自动引入modules目录下的所有模块
let routersArray = routersContext.keys().map(key => routersContext(key).default)
/** 404路由
 *  最终无法匹配到相应路由，重定向到404
 *  异步加载路由时，在生成完异步路由准备挂载时，需要将重定向404的匹配规则定义在最后面，否则刷新会出错
 */
routersArray.push({ 
    path: '*',  
    redirect: '/icons',
    hidden: true,
    meta: {
        title: '404'
    } 
})

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: routersArray
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
