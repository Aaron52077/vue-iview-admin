/* eslint-disable */
export default {
    path: '/api',
    meta: {
        module: 'api',
        title: 'API'
    },
    redirect: '/api/util',
    component: r => require.ensure([], () => r(require('../../layout/index.vue')), 'api'),
    children: [
        {
            path: 'util',
            name: 'api-util',
            component: r => require.ensure([], () => r(require('./util/main.vue')), 'api'),
            meta: {
                module: 'api',
                title: '工具合集'
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
        },
        {
            path: 'grid',
            name: 'api-grid',
            component: r => require.ensure([], () => r(require('./grid/main.vue')), 'api'),
            meta: {
                module: 'api',
                title: '拖拽式布局'
            }
        },
    ]
}
