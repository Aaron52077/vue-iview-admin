import { fetch } from '@/utils/fetch'

// Tip：
// 1、instance方法适用于需要做特殊处理的请求，如：自定义Header、其他的http方法等
// 2、使用解构参数，方便阅读和管理。

// 登录
export function userLogin(url, info) {
    let res = fetch(`/${url}`, 'post', info)
    return res
}
