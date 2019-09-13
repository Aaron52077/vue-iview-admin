import Vue from 'vue'

import Icon from './Base/Icon'
import Loading from './Base/Loading'
import Scrollbar from './Base/Scrollbar'
import InfiniteScroll from './Base/InfiniteScroll'
import Echart from './Base/Echart'
import Avatar from './Base/Avatar'
import NoneTip from './Base/NoneTip'
import TimePicker from './Base/TimePicker'
import Skeleton from './Base/Skeleton'
import VList from './Base/VList'
import DocPreview from './Base/DocPreview'
import Video from './Base/Video'

// 全局注册自定义组件
const components = {
    'mIcon': Icon,
    'mLoading': Loading,
    'mScrollbar': Scrollbar,
    'mInfiniteScroll': InfiniteScroll,
    'mAvatar': Avatar,
    'mNoneTip': NoneTip,
    'mEchart': Echart,
    'mTimePicker': TimePicker,
    'mSkeleton': Skeleton,
    'mVlist': VList,
    'mDocPreview': DocPreview,
    'mVideo': Video
}

// 全局注册 公用组件 异步加载方式
Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
})
