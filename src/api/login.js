import { request } from '@/utils/request'

// Tip：
// 1、request方法适用于普遍的GET、POST方法
// 2、instance方法适用于需要做特殊处理的请求，如：自定义Header、其他的http方法等
// 3、使用解构参数，方便阅读和管理。

// 登录
export function userLogin(url, info) {
    let res = request(`/${url}`, 'post', info)
    return res
}
