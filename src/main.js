/* eslint-disable */
import '@babel/polyfill'

import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'

import directives from '@/directive'

import './router/permission' // permission control

// 全局组件库
import './components/iview'
import './components/vant'
import './components/index'

import dataBase from './global'
// 字体图标
import './assets/font/iconfont'

import * as filters from './filters'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: import 'mock'
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
    require('@/mock')
}

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

/**
 * 注册指令
 */
directives(Vue)

/**
 * 多语言国际化
 */
import VueTranslate from './utils/lang.js'
Vue.use(VueTranslate)
const lang = (localStorage.lang || 'zh-cn')
Vue.lang(lang)

dataBase.debug && (() => {
    var script = document.createElement('script'); 
    script.src = "plugins/vconsole.min.js"; 
    document.body.appendChild(script); 
    script.onload = () => { 
        try { 
            var vConsole = new VConsole();
        }catch(e) {
            throw new Error(e)
        };  
    } 
})(); 

// 传统方式
// new Vue({
//     router,
//     store,
//     created() {
//         dataBase.init(this)
//     },
//     render: h => h(App)
// }).$mount('#app')

// 获取服务端动态配置地址方式
function getServerConfig() {
    return new Promise((resolve, reject) => {
        axios.get('./serverConfig.json').then((result) => {
            let config = result.data
            axios.defaults.baseURL = config.VUE_APP_API   
            console.log('baseURL', axios.defaults.baseURL)  // 验证是否已经把属性挂在了Vue上
            resolve()
        }).catch((error) => {
            axios.defaults.baseURL = process.env.VUE_APP_API 
            console.log(error)  
            reject()
        })
    })
}

async function init() {
    await getServerConfig();
    new Vue({
        router,
        store,
        created() {
            dataBase.init(this)
        },
        render: h => h(App)
    }).$mount('#app')
}
  
init()


