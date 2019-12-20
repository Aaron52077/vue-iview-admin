import Vue from 'vue'

/**
 * 传统写法：import Icon from './Base/Icon'
 * 方法一 es6写法： const Icon = () => import("../Base/Icon/index.vue")
 * 方法二 webpack写法： const Icon = resolve => require.ensure([], () => resolve( require(../Base/Icon/index.vue)),  'base_components')
 */

// 全局注册自定义组件
const components = {
    'mIcon': 'Icon',
    'mLoading': 'Loading',
    'mScrollbar': 'Scrollbar',
    'mInfiniteScroll': 'InfiniteScroll',
    'mAvatar': 'Avatar',
    'mNoneTip': 'NoneTip',
    'mTags': 'Tags',
    'mEchart': 'Echart',
    'mTimePicker': 'TimePicker',
    'mSkeleton': 'Skeleton',
    'mVlist': 'VList',
    'mDocPreview': 'DocPreview',
    'mVideo': 'Video',
    'mScreenfull': 'Screenfull'
}

// 全局注册 公用组件 异步加载方式
Object.keys(components).forEach(key => {
    Vue.component(key, () => import(/* webpackChunkName: "g-[request]" */ `./Base/${components[key]}`));
})