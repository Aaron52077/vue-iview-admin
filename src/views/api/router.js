/* eslint-disable */
export default {
    path: '/api',
    meta: {
        module: 'api',
        title: 'API'
    },
    redirect: '/api/page',
    component: r => require.ensure([], () => r(require('./main.vue')), 'api'),
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
        },
        {
            path: 'umEditor',
            component: r => require.ensure([], () => r(require('./umEditor/main.vue')), 'api'),
            meta: {
                module: 'api'
            },
        },
        {
            path: 'quillEditor',
            component: r => require.ensure([], () => r(require('./quillEditor/main.vue')), 'api'),
            meta: {
                module: 'api'
            },
        },
        {
            path: 'tinymce',
            component: r => require.ensure([], () => r(require('./tinymce/main.vue')), 'api'),
            meta: {
                module: 'api'
            },
        },
        {
            path: 'cropper',
            component: r => require.ensure([], () => r(require('./cropper/main.vue')), 'api'),
            meta: {
                module: 'api'
            },
        },
    ]
}
