/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// 全局组件库
import './components/iview'
import './components/index'

import dataBase from './global'
// 字体图标
import './assets/font/iconfont.js'

// 自定义过滤
import * as filters from './utils/filters' // global filters

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.prototype.$axios = axios

dataBase.debug && (() => {
    var script = document.createElement('script'); 
    script.src = "plugins/vconsole.min.js"; 
    document.body.appendChild(script); 
    script.onload = () => { 
        try { 
            var vConsole = new VConsole();
        }catch(e) {
            
        };  
    } 
})(); 

new Vue({
    router,
    store,
    created() {
        dataBase.init(this)
    },
    render: h => h(App)
}).$mount('#app')

