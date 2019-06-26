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
            },
        },
        {
            path: 'bar',
            component: r => require.ensure([], () => r(require('./bar/index.vue')), 'echarts'),
            meta: {
                module: 'echarts'
            },
        }
    ],
}
