import routerObj from '@/router'
import { LoadingBar } from 'view-design'
import { setTitle } from '@/utils'

// 全局路由登录验证，权限验证路由拦截
routerObj.beforeEach((to, from, next) => {
    // start progress bar
    LoadingBar.start()
    // 免登录或已登录
    if(to.matched.some(record => record.meta.noAuth)) {
        next()
        LoadingBar.finish()
    }else {
        next()
        LoadingBar.finish()
        // next({ path:'/account', replace: true })
    }
})

routerObj.afterEach(to => {
    // set title
    setTitle(to, routerObj.app)
    // finish progress bar
    LoadingBar.finish()
})

