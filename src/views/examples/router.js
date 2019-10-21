/* eslint-disable */
export default {
    path: '/',
    meta: {
        module: 'docs',
        title: '首页',
        menuHide: true
    },
    redirect: '/icons',
    component: r => require.ensure([], () => r(require('./main.vue')), 'docs'),
    children: [
        {
            path: 'icons',
            component: r => require.ensure([], () => r(require('./icon/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '图标'
            }
        },
        {
            path: 'avatar',
            component: r => require.ensure([], () => r(require('./avatar/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '头像'
            }
        },
        {
            path: 'loading',
            component: r => require.ensure([], () => r(require('./loading/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '加载中'
            }
        },
        {
            path: 'noneTip',
            component: r => require.ensure([], () => r(require('./noneTip/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '无记录'
            }
        },
        {
            path: 'timePicker',
            component: r => require.ensure([], () => r(require('./timePicker/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '时间控件'
            }
        },
        {
            path: 'treeSelect',
            component: r => require.ensure([], () => r(require('./treeSelect/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '树状下拉选择器'
            }
        },
        {
            path: 'dragList',
            component: r => require.ensure([], () => r(require('./dragList/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '拖拽列表'
            }
        },
        {
            path: 'dragDrawer',
            component: r => require.ensure([], () => r(require('./dragDrawer/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '拖拽抽屉'
            }
        },
        {
            path: 'skeleton',
            component: r => require.ensure([], () => r(require('./skeleton/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '骨架屏'
            }
        },
        {
            path: 'vlist',
            component: r => require.ensure([], () => r(require('./vlist/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '虚拟列表'
            }
        },
        {
            path: 'docPreview',
            component: r => require.ensure([], () => r(require('./docPreview/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '文件预览'
            }
        },
        {
            path: 'videoPreview',
            component: r => require.ensure([], () => r(require('./video/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '视频预览'
            }
        },
        {
            path: 'map',
            component: r => require.ensure([], () => r(require('./map/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '地图检索'
            }
        },
    ],
}
