import { fetch } from '@/utils/fetch'

// bar
export function echartBarAPI() {
    let res = fetch('/echart/bar')
    return res
}

// line
export function echartLineAPI() {
    let res = fetch('/echart/line')
    return res
}

// Radar
export function echartRadarAPI() {
    let res = fetch('/echart/radar')
    return res
}

// Pie
export function echartPieAPI() {
    let res = fetch('/echart/pie')
    return res
}

// Map
export function echartMapAPI() {
    let res = fetch('/echart/map')
    return res
}

// Funnel
export function echartFunnelAPI() {
    let res = fetch('/echart/funnel')
    return res
}

// Gauge
export function echartGaugeAPI() {
    let res = fetch('/echart/gauge')
    return res
}

// Treemap
export function echartTreemapAPI() {
    let res = fetch('/echart/treemap')
    return res
}
