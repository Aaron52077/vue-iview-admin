import Vue from 'vue'

import Icon from './Base/Icon'
import Loading from './Base/Loading'
import Scrollbar from './Base/Scrollbar'
import CalcHeight from './Base/CalcHeight'
import Avatar from './Base/Avatar'
import NoneTip from './Base/NoneTip'

// 全局注册自定义组件
const components = {
    'mIcon': Icon,
    'mLoading': Loading,
    'mScrollbar': Scrollbar,
    'mCalcHeight': CalcHeight,
    'mAvatar': Avatar,
    'mNoneTip': NoneTip
}

// 全局注册 公用组件
Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
})
