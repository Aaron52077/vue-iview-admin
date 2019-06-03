/* eslint-disable */
export default {
    path: '/api',
    meta: {
        module: 'api',
        title: 'API'
    },
    redirect: '/api/page',
    component: r => require.ensure([], () => r(require('./main.vue')), 'home'),
    children: [
        {
            path: 'page',
            component: r => require.ensure([], () => r(require('./page/main.vue')), 'api'),
            meta: {
                module: 'api',
                title: '页面'
            },
            children: [
                {
                    path: 'children1',
                    component: r => require.ensure([], () => r(require('./page/children1.vue')), 'api'),
                    meta: {
                        module: 'api',
                        title: '子页面1'
                    },
                },
                {
                    path: 'children2',
                    component: r => require.ensure([], () => r(require('./page/children2.vue')), 'api'),
                    meta: {
                        module: 'api',
                        title: '子页面2'
                    },
                }
            ]
        }
    ]
}
