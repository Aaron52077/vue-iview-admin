/* eslint-disable */
export default {
    path: '',
    meta: {
        module: 'docs',
        title: '组件栏',
        menuHide: true
    },
    redirect: 'dashboard',
    component: r => require.ensure([], () => r(require('../../layout/index.vue')), 'docs'),
    children: [
        {
            path: 'dashboard',
            name: 'dashboard',
            component: r => require.ensure([], () => r(require('./dashboard/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '主页',
                affix: true
            }
        },
        {
            path: 'icons',
            name: 'compicons',
            component: r => require.ensure([], () => r(require('./icon/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '图标'
            }
        },
        {
            path: 'avatar',
            name: 'compavatar',
            component: r => require.ensure([], () => r(require('./avatar/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '头像'
            }
        },
        {
            path: 'loading',
            name: 'comploading',
            component: r => require.ensure([], () => r(require('./loading/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '加载中'
            }
        },
        {
            path: 'noneTip',
            name: 'compnoneTip',
            component: r => require.ensure([], () => r(require('./noneTip/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '无记录'
            }
        },
        {
            path: 'timePicker',
            name: 'comptimePicker',
            component: r => require.ensure([], () => r(require('./timePicker/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '时间控件'
            }
        },
        {
            path: 'treeSelect',
            name: 'comptreeSelect',
            component: r => require.ensure([], () => r(require('./treeSelect/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '树状下拉选择器'
            }
        },
        {
            path: 'dragList',
            name: 'compdragList',
            component: r => require.ensure([], () => r(require('./dragList/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '拖拽列表'
            }
        },
        {
            path: 'dragDrawer',
            name: 'compdragDrawer',
            component: r => require.ensure([], () => r(require('./dragDrawer/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '拖拽抽屉'
            }
        },
        {
            path: 'skeleton',
            name: 'compskeleton',
            component: r => require.ensure([], () => r(require('./skeleton/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '骨架屏'
            }
        },
        {
            path: 'vlist',
            name: 'compvlist',
            component: r => require.ensure([], () => r(require('./vlist/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '虚拟列表'
            }
        },
        {
            path: 'docPreview',
            name: 'compdocPreview',
            component: r => require.ensure([], () => r(require('./docPreview/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '文件预览'
            }
        },
        {
            path: 'videoPreview',
            name: 'compvideoPreview',
            component: r => require.ensure([], () => r(require('./video/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '视频预览'
            }
        },
        {
            path: 'map',
            name: 'compmap',
            component: r => require.ensure([], () => r(require('./map/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '地图检索'
            }
        },
    ],
}
