import Vue from 'vue'

import Icon from './Base/Icon'
import Loading from './Base/Loading'
import Scrollbar from './Base/Scrollbar'
import InfiniteScroll from './Base/InfiniteScroll'
import Echart from './Base/Echart'
import Avatar from './Base/Avatar'
import NoneTip from './Base/NoneTip'
import TimePicker from './Base/TimePicker'

// 全局注册自定义组件
const components = {
    'mIcon': Icon,
    'mLoading': Loading,
    'mScrollbar': Scrollbar,
    'mInfiniteScroll': InfiniteScroll,
    'mAvatar': Avatar,
    'mNoneTip': NoneTip,
    'mEchart': Echart,
    'mTimePicker': TimePicker
}

// 全局注册 公用组件
Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
})
