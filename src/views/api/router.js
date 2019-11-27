/* eslint-disable */
export default {
    path: '/api',
    meta: {
        module: 'api',
        title: 'API'
    },
    redirect: '/api/page',
    component: r => require.ensure([], () => r(require('../layout/index.vue')), 'api'),
    children: [
        {
            path: 'page',
            component: r => require.ensure([], () => r(require('./page/main.vue')), 'api'),
            meta: {
                module: 'api',
                title: '工具合集'
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
        },
        {
            path: 'editor',
            component: r => require.ensure([], () => r(require('./editor/main.vue')), 'api'),
            meta: {
                module: 'api',
                title: '富文本'
            },
        },
        {
            path: 'cropper',
            component: r => require.ensure([], () => r(require('./cropper/main.vue')), 'api'),
            meta: {
                module: 'api',
                title: '图片裁剪'
            },
        }
    ]
}
