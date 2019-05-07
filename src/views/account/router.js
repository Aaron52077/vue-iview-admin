export default {
    path: '/account',
    name: 'account',
    meta: {
        title: '登录',
        noAuth: true,
        menuHide: true,
        module: 'account'
    },
    component: r => require.ensure([], () => r(require('./main.vue')), 'login')
}