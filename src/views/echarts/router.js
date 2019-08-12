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
                module: 'echarts'
            }
        },
        {
            path: 'bar',
            component: r => require.ensure([], () => r(require('./bar/index.vue')), 'echarts'),
            meta: {
                module: 'echarts'
            }
        },
        {
            path: 'line',
            component: r => require.ensure([], () => r(require('./line/index.vue')), 'echarts'),
            meta: {
                module: 'echarts'
            }
        },
        {
            path: 'radar',
            component: r => require.ensure([], () => r(require('./radar/index.vue')), 'echarts'),
            meta: {
                module: 'echarts'
            }
        },
        {
            path: 'pie',
            component: r => require.ensure([], () => r(require('./pie/index.vue')), 'echarts'),
            meta: {
                module: 'echarts'
            }
        },
        {
            path: 'funnel',
            component: r => require.ensure([], () => r(require('./funnel/index.vue')), 'echarts'),
            meta: {
                module: 'echarts'
            }
        },
        {
            path: 'map',
            component: r => require.ensure([], () => r(require('./map/index.vue')), 'echarts'),
            meta: {
                module: 'echarts'
            }
        },
        {
            path: 'gauge',
            component: r => require.ensure([], () => r(require('./gauge/index.vue')), 'echarts'),
            meta: {
                module: 'echarts'
            }
        },
        {
            path: 'treemap',
            component: r => require.ensure([], () => r(require('./treemap/index.vue')), 'echarts'),
            meta: {
                module: 'echarts'
            }
        }
    ],
}
