/* eslint-disable */
export default {
    path: '/',
    meta: {
        module: 'docs',
        title: '首页'
    },
    redirect: '/icons',
    component: r => require.ensure([], () => r(require('./main.vue')), 'docs'),
    children: [
        {
            path: 'icons',
            component: r => require.ensure([], () => r(require('./icon/index.vue')), 'docs'),
            meta: {
                module: 'docs'
            },
        },
        {
            path: 'avatar',
            component: r => require.ensure([], () => r(require('./avatar/index.vue')), 'docs'),
            meta: {
                module: 'docs'
            },
        },
        {
            path: 'noneTip',
            component: r => require.ensure([], () => r(require('./noneTip/index.vue')), 'docs'),
            meta: {
                module: 'docs'
            },
        },
        {
            path: 'timePicker',
            component: r => require.ensure([], () => r(require('./timePicker/index.vue')), 'docs'),
            meta: {
                module: 'docs'
            },
        }
    ],
}
