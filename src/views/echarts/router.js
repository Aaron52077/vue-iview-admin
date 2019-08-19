/* eslint-disable */
export default {
    path: '/echarts',
    meta: {
        module: 'echarts',
        title: '首页'
    },
    redirect: '/echarts/exp',
    component: r => require.ensure([], () => r(require('./main.vue')), 'echarts'),
    children: [
        {
            path: 'exp',
            component: r => require.ensure([], () => r(require('./exp/index.vue')), 'echarts'),
            meta: {
                module: 'echarts',
                title: '图表'
            }
        },
        {
            path: 'bar',
            component: r => require.ensure([], () => r(require('./bar/index.vue')), 'echarts'),
            meta: {
                module: 'echarts',
                title: '柱状图'
            }
        },
        {
            path: 'line',
            component: r => require.ensure([], () => r(require('./line/index.vue')), 'echarts'),
            meta: {
                module: 'echarts',
                title: '线性图'
            }
        },
        {
            path: 'radar',
            component: r => require.ensure([], () => r(require('./radar/index.vue')), 'echarts'),
            meta: {
                module: 'echarts',
                title: '雷达图'
            }
        },
        {
            path: 'pie',
            component: r => require.ensure([], () => r(require('./pie/index.vue')), 'echarts'),
            meta: {
                module: 'echarts',
                title: '饼图'
            }
        },
        {
            path: 'funnel',
            component: r => require.ensure([], () => r(require('./funnel/index.vue')), 'echarts'),
            meta: {
                module: 'echarts',
                title: '漏斗图'
            }
        },
        {
            path: 'map',
            component: r => require.ensure([], () => r(require('./map/index.vue')), 'echarts'),
            meta: {
                module: 'echarts',
                title: '地理坐标系'
            }
        },
        {
            path: 'gauge',
            component: r => require.ensure([], () => r(require('./gauge/index.vue')), 'echarts'),
            meta: {
                module: 'echarts',
                title: '仪表盘'
            }
        },
        {
            path: 'treemap',
            component: r => require.ensure([], () => r(require('./treemap/index.vue')), 'echarts'),
            meta: {
                module: 'echarts',
                title: '面积图'
            }
        },
        {
            path: 'boxplot',
            component: r => require.ensure([], () => r(require('./boxplot/index.vue')), 'echarts'),
            meta: {
                module: 'echarts',
                title: '灯箱图'
            }
        },
        {
            path: 'scatter',
            component: r => require.ensure([], () => r(require('./scatter/index.vue')), 'echarts'),
            meta: {
                module: 'echarts',
                title: '气泡图'
            }
        }
    ],
}
