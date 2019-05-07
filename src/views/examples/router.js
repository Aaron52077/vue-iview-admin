/* eslint-disable */
export default {
    path: '/',
    meta: {
        module: 'docs',
        title: '首页'
    },
    redirect: '/docs',
    component: r => require.ensure([], () => r(require('./main.vue')), 'home'),
    children: [
        {
            path: 'docs',
            component: r => require.ensure([], () => r(require('./Icon/index.vue')), 'docs'),
            meta: {
                module: 'docs'
            },
        }
    ],
}
