/**
 * demo: 仅做移动端工程项目vant实例
 * babel.config.js 按需加载样式
 * import '~vant/lib/index.css'
 */
import Vue from 'vue'
import {
    DatetimePicker, 
    Dialog,
    Toast,
    Notify,
    Tabbar, 
    TabbarItem,
    Popup 
} from 'vant'

// 全局注册组件
const components = {
    'vanTabbar': Tabbar,
    'vanTabbarItem': TabbarItem,
    'vanDatetimePicker': DatetimePicker,
    'vanDialog': Dialog,
    'vanToast': Toast,
    'vanNotify': Notify,
    'vanPopup': Popup
}

// 全局注册按需iview组件
Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
})

Vue.prototype.$Dialog = Dialog;
Vue.prototype.$Toast = Toast;
Vue.prototype.$Notify = Notify;