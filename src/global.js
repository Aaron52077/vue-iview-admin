/* eslint-disable */
import Vue from 'vue'
import store from '@/store'
import cache from '@/utils/cache'
import { cloneDeep, size } from 'lodash'
import { dateToStr, unixToStr, toFixed } from '@/filters'
import common from '@/common'

// 流加载
import './utils/ljs'

let global = new Vue({
    template: '<div></div>',
    data: {
        ENV: process.env.NODE_ENV,
        apihost: process.env.VUE_APP_API,
        debug: (process.env.NODE_ENV || '').indexOf('development') > -1 || window.localStorage && window.localStorage.devOnline == 1,
        token: cache.getLocal('token') || '',
        lang: cache.getLocal('lang') || 'zh-cn',
        dh: document.body.clientHeight,
        dw: document.body.clientWidth,
        ljs: window.ljs,
        data: {},
        common: common
    },
    computed: {
        getData() {
            return store.state.datas;
        },
        setToken: {
            get() {
                return this.token;
            },
            set(val) {
                this.token = val;
                cache.setLocal('token', val);
                if(val == '') cache.removeLocal('token');
            }
        },
        setLang: {
            get() {
                return this.lang
            },
            set(val) {
                let value = val || 'zh-cn'
                this.$translate.setLang(value)
                this.lang = value
                cache.setLocal('lang', value)
            }
        },
        h5() {
            return this.dw < 800
        }
    },
    methods: {
        //写入共享数据
        setData(key, val) {
            // 方法一
            let storeData = Object.assign({}, this.data);
            // 方法二
            // let storeData = cloneDeep(this.data);
            storeData[key] = val;
            this.data = storeData;
            store.dispatch('setData', storeData);
            return val
        },
        setApi(val) {
            let name = val && val.$options ? val.$options.name : '';
            if(!name) {
                console.warn('setApi error, 请定义 name ');
            }
            if(!global[`api_${name}`]) {
                global[`api_${name}`] = val;
            }
        },
        cloneDeep: cloneDeep,
        size: size,
        uuid(len = 5) {
            // 生成随机字符串 提供echart类动态id绘制图表类攻能
            return Number(Math.random().toString().substr(3, len) + Date.now()).toString(36)
        },
        log(...arg) {
            this.debug && console.log(...arg);
        },
        init(vm) {
            window.DevVue = vm;
            this.$translate.setLang(this.lang);
            // 动态获取视窗宽高
            window.onresize = () => {
                this.dw = document.body.clientWidth;
                this.dh = document.body.clientHeight;
            };
            if(!this.$t) {
                Vue.prototype.$t = vm.t;
            }
        },
        load(...arg) {
            let plugins = [];
            /**
             * @returns {*} 根据项目进行定制化引入
             * 'superslide': ['plugins/superslide/jquery.SuperSlide.js']
             * 'quill': ['plugins/quill/quill.min.js','plugins/quill/quill.snow.css','plugins/quill/image-resize.min.js','plugins/quill/image-drop.min.js']
             * 'umeditor': ['plugins/editor/themes/default/css/umeditor.css','plugins/editor/third-party/template.min.js','plugins/editor/umeditor.config.js','plugins/editor/umeditor.js','plugins/editor/lang/zh-cn/zh-CN.js']
             * 'viewer': ['plugins/viewer/viewer.min.css','plugins/viewer/viewer.min.js'],
             */
            const config = {
                'jquery': ['plugins/jquery.js'],
                'video': ['plugins/videojs/video.min.js','plugins/videojs/videojs.min.css','plugins/videojs/zh-CN.js']
            }
            arg.map(item => {
                let pluginName = (typeof item == 'string') ? item.toLocaleLowerCase() : item;
                if(config[pluginName]) {
                    plugins.push(...config[pluginName]);
                } else {
                    plugins.push(pluginName);
                }
            });
            this.ljs.load(...plugins);
        },
        setValue: cache.setLocal,
        getValue: cache.getLocal,
        delValue: cache.removeLocal,
        dateToStr: dateToStr,
        unixToStr: unixToStr,
        toFixed: toFixed,
        fileDownload(data, fileName) {
            // 后端接口文件流下载
            const blob = new Blob([data], {
                type: 'application/vnd.ms-excel;charset=utf-8'
            })
            const filename = fileName || 'excel.xlsx'
            if (typeof window.navigator.msSaveBlob !== 'undefined') {
                window.navigator.msSaveBlob(blob, filename)
            } else {
                var blobURL = window.URL.createObjectURL(blob)
                var tempLink = document.createElement('a')
                tempLink.style.display = 'none'
                tempLink.href = blobURL
                tempLink.setAttribute('download', filename)
                if (typeof tempLink.download === 'undefined') {
                    tempLink.setAttribute('target', '_blank')
                }
                document.body.appendChild(tempLink)
                tempLink.click()
                document.body.removeChild(tempLink)
                window.URL.revokeObjectURL(blobURL)
            }
        },
        print(obj){
            this.load('jquery', 'plugins/jqery.print.js', () => {
                if($(obj) && $(obj).length) {
                    $(obj).printArea();
                }else {
                    this.$Notice.error({
                        title: '打印失败'
                    });
                }
            });
        }
    }
})
Vue.global = global
// Vue 原型链挂载
Vue.prototype.dataBase = global

export default global
