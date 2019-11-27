import routerObj from '@/router'
import { LoadingBar } from 'view-design'
import dataBase from '@/global'
import cache from '@/utils/cache'
import { setTitle } from '@/utils'

const whiteList = ['/account', '/auth'] // no redirect whitelist

// 全局路由登录验证，权限验证路由拦截
routerObj.beforeEach((to, from, next) => {
    // start progress bar
    LoadingBar.start()
    // 免登录或已登录
    const hasToken = cache.getLocal('token')
    // const hasTicket = cache.getSession('ticket')
    if (hasToken) {
        if (to.path === '/account') {
            // if is logged in, redirect to the home page
            next({ path: '/' })
        } else {
            try {
                next()
            } catch (error) {
                // remove token and go to login page to re-login
                dataBase.common.quit()
                next(`/account?redirect=${to.path}`)
                LoadingBar.finish()
            }
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/account?redirect=${to.path}`)
            LoadingBar.finish()
        }
    }
})

routerObj.afterEach(to => {
    // set title
    setTitle(to, routerObj.app)
    // finish progress bar
    LoadingBar.finish()
})