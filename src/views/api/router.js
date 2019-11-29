/* eslint-disable */
export default {
    path: '/api',
    meta: {
        module: 'api',
        title: 'API'
    },
    redirect: '/api/page',
    component: r => require.ensure([], () => r(require('../../layout/index.vue')), 'api'),
    children: [
        {
            path: 'page',
            name: 'api-page',
            component: r => require.ensure([], () => r(require('./page/main.vue')), 'api'),
            meta: {
                module: 'api',
                title: '工具合集',
                affix: true
            },
            children: [
                {
                    path: 'children1',
                    name: 'api-page1',
                    component: r => require.ensure([], () => r(require('./page/children1.vue')), 'api'),
                    meta: {
                        module: 'api',
                        title: '子页面1'
                    },
                },
                {
                    path: 'children2',
                    name: 'api-page2',
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
            name: 'api-editor',
            component: r => require.ensure([], () => r(require('./editor/main.vue')), 'api'),
            meta: {
                module: 'api',
                title: '富文本'
            },
        },
        {
            path: 'cropper',
            name: 'api-cropper',
            component: r => require.ensure([], () => r(require('./cropper/main.vue')), 'api'),
            meta: {
                module: 'api',
                title: '图片裁剪'
            },
        }
    ]
}
