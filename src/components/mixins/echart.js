/* eslint-disable */
import { debounce, on, off } from '@/utils'

export default {
    data() {
        return {
            $_sidebarElm: null
        }
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
        
        on(window, 'resize', this._resizeHandler)
    
        this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0]
        this.$_sidebarElm && on(this.$_sidebarElm, 'transitionend', this.$_sidebarResizeHandler)
    },
    beforeDestroy() {
        off(window, 'resize', this._resizeHandler)
        this.$_sidebarElm && off(this.$_sidebarElm, 'transitionend', this.$_sidebarResizeHandler)
    },
    methods: {
        /**
         * 实例对象
         * @param {any} args
         * @returns
         */
        echartInit(id) {
            const oDiv = document.getElementById(id)
            const myChart = this.$echarts.init(oDiv)
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
