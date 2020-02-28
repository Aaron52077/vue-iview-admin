import { fetch } from '@/utils/fetch'

// base
export function echartBaseAPI() {
    let res = fetch('/comp/charts')
    return res
}

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

// MapArea
export function echartMapAreaAPI() {
    let res = fetch('/echart/area')
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

// Boxplot
export function echartBoxplotAPI() {
    let res = fetch('/echart/boxplot')
    return res
}

// Scatter
export function echartScatterAPI() {
    let res = fetch('/echart/scatter')
    return res
}
