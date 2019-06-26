import axios from 'axios'
import store from '@/store'
import { Message } from 'iview'
import cache from '@/utils/cache'

const tokenValue = 'Y2FtcHVzOmNhbXB1cw=='
// 创建axios实例
export const instance = axios.create({
    baseURL: process.env.VUE_APP_API,      // api的base_url
    timeout: 5 * 1000                   // 请求超时时间
})
// request拦截器
instance.interceptors.request.use(config => {
    // Do something before request is sent
    // 初始化默认post header
    config.headers = {   
        'Accept': "application/json, text/plain, */*",
        'isToken': false,
        'TENANT_ID': '1',
        'Authorization': `Basic ${tokenValue}`
    }
    if(store.getters.token || cache.getLocal('token')) {
        config.headers['Authorization'] = `Bearer ${store.getters.token || cache.getLocal('token')}` // 让每个请求携带token -- ['AUTH_TOKEN']为自定义key
        cache.setLocal('token', cache.getLocal('token'))
    }
    return config
}, error => {
    // Do something with request error
    Message.error(error || error.msg || '服务器繁忙，请稍后重试') // for debug
    Promise.reject(error)
})

// respone拦截器
instance.interceptors.response.use(response => {
    const res = response.data
    // 自定义报错规则
    if(response.status !== 200) {
        const status = Number(response.status)
        const { msg } = res
        if(status === 401) {
            store.commit("setToken", null)
            Message.error(msg || '无访问权限！')
            return Promise.resolve(msg || 'error')
        }else {
            Message.error(msg || '服务器繁忙，请稍后重试')
            return Promise.resolve(msg || 'error')
        }
    }else {
        if(response.config.responseType === "blob") {
            return Promise.resolve(response)  
        }else {
            return Promise.resolve(res)
        }
    }
}, error => {
    // 请求直接报错 for debug
    Message.error(error.msg || '服务器繁忙，请稍后重试')
    return Promise.reject(error.response || error)
})

/*
* request方法（统一axios请求方法的格式）
* url       请求URL
* type      请求类型 默认转为大写
* data      参数
* isForm    是否表单数据
* isDown    是否下载文件流
*/
export const request = async(url = '', type = 'GET', data = {}, isDown = false) => {
    let result
    type = type.toUpperCase()   
    let requestOptions = {
        method: type,
        url: url,
        responseType: isDown ? 'blob' : 'json'   
    }

    requestOptions['headers'] = {
        'Content-Type': isDown ? 'application/vnd.ms-excel' : 'application/json'
    }

    if (type === 'GET') {
        requestOptions['params'] = data
    } else {
        requestOptions['data'] = data
    }
    
    await instance(requestOptions).then(res => {
        result = res
    })
    
    return result
}
