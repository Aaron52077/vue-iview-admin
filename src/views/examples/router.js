/* eslint-disable */
export default {
    path: '/',
    meta: {
        module: 'docs',
        title: '首页'
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
            },
        },
        {
            path: 'avatar',
            component: r => require.ensure([], () => r(require('./avatar/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '头像'
            },
        },
        {
            path: 'noneTip',
            component: r => require.ensure([], () => r(require('./noneTip/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '无记录'
            },
        },
        {
            path: 'timePicker',
            component: r => require.ensure([], () => r(require('./timePicker/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '时间控件'
            },
        },
        {
            path: 'treeSelect',
            component: r => require.ensure([], () => r(require('./treeSelect/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '树状下拉选择器'
            },
        },
        {
            path: 'dragList',
            component: r => require.ensure([], () => r(require('./dragList/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '拖拽列表'
            },
        },
        {
            path: 'dragDrawer',
            component: r => require.ensure([], () => r(require('./dragDrawer/index.vue')), 'docs'),
            meta: {
                module: 'docs',
                title: '拖拽抽屉'
            },
        },
    ],
}
