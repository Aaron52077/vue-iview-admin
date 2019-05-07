
/* eslint-disable */
export default {
    /**
     * 创建缓存
     */
    created () {
        this._cacheEchartstanceArr = []
    },
    /**
     * 集中销毁实例
     */
    destroyed () {
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
        }
    }
}
