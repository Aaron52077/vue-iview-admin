import { request } from '@/utils/request'

// bar
export function echartBarAPI() {
    let res = request('/echart/bar')
    return res
}

// line
export function echartLineAPI() {
    let res = request('/echart/line')
    return res
}

// Radar
export function echartRadarAPI() {
    let res = request('/echart/radar')
    return res
}

// Pie
export function echartPieAPI() {
    let res = request('/echart/pie')
    return res
}

// Map
export function echartMapAPI() {
    let res = request('/echart/map')
    return res
}