import { request } from '@/utils/request'

// bar
export function echartBarAPI() {
    let res = request('/echart/bar')
    return res
}
