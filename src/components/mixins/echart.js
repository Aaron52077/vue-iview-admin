/* eslint-disable */
import { debounce, on, off } from '@/utils'

export default {
    data() {
        return {
            $_sidebarElm: null
        }
    },
    /**
     * 创建缓存
     */
    created () {
        this._cacheEchartstanceArr = []
    },
    /**
     * 图表自适应处理
     */
    mounted() {
        this._resizeHandler = debounce(() => {
            if (this.myChart) {
                this.myChart.resize()
            }
        }, 100)
        on(document, 'resize', this._resizeHandler)
        // window.addEventListener('resize', this._resizeHandler)
    
        this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0]
        // this.$_sidebarElm && this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler)
        this.$_sidebarElm && on(this.$_sidebarElm, 'transitionend', this.$_sidebarResizeHandler)
    },
    /**
     * 图表销毁之前的处理
     */
    beforeDestroy() {
        off(document, 'resize', this._resizeHandler)
        // window.removeEventListener('resize', this._resizeHandler)
    
        // this.$_sidebarElm && this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler)
        this.$_sidebarElm && off(this.$_sidebarElm, 'transitionend', this.$_sidebarResizeHandler)
    },
    /**
     * 集中销毁实例
     */
    destroyed() {
        this._cacheEchartstanceArr.forEach((v, i) => {
            if (v && v.dispose) {
                v.clear()
                v.dispose()
            }
        })
    },
    methods: {
        /**
         * 缓存实例对象
         * @param {any} args
         * @returns
         */
        echartInit (id) {
            const oDiv = document.getElementById(id)
            const myChart = this.$echarts.init(oDiv)
            this._cacheEchartstanceArr.push(myChart)
            return myChart
        },
        // use $_ for mixins properties
        // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
        $_sidebarResizeHandler(e) {
            if (e.propertyName === 'width') {
                this._resizeHandler()
            }
        }
    }
}
