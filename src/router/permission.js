import routerObj from '@/router'
import store from '@/store'
import { LoadingBar } from 'view-design'
import cache from '@/utils/cache'
import { setTitle } from '@/utils'

const whiteList = ['/account', '/auth'] // no redirect whitelist

// 全局路由登录验证，权限验证路由拦截
routerObj.beforeEach(async (to, from, next) => {
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
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                next()
            } else {
                try {
                    // get user info
                    // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
                    const { roles } = await store.dispatch('user/accountIn')
            
                    // generate accessible routes map based on roles
                    store.dispatch('permission/generateRoutes', roles)
                    // const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
            
                    // dynamically add accessible routes
                    // routerObj.addRoutes(accessRoutes)
            
                    // hack method to ensure that addRoutes is complete
                    // set the replace: true, so the navigation will not leave a history record
                    next({ ...to, replace: true })
                } catch (error) {
                    // remove token and go to login page to re-login
                    next(`/account?redirect=${to.path}`)
                    LoadingBar.finish()
                }
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