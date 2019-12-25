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
            }
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
