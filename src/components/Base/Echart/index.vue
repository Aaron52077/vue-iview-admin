<template>
    <div class="echart-dom">
        <div class="echart-dom" :id="chartId"></div>
    </div>
</template>

<script>
/* eslint-disable */
import echart from '@/components/mixins/echart'
/**
 * m-charts  echart基础组件
 * @module components/Echarts
 * @desc 顶部导航
 * @param {Object} [optionObj] - echart 配置 option 
 * @example
 */
export default {
    mixins: [echart],
    props: {
        optionObj: {
            type: Object,
            required: true,
            default: () => {
                return {}
            }
        }
    },
    computed: {
        chartId() {
            const t = this.dataBase;
            return t.uuid()
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.drawChart()
        })
    },
    methods: {
        drawChart() {
            let option = this.dataBase.cloneDeep(this.optionObj);
            let myChart = this.echartInit(this.chartId);
            myChart.setOption(option, true)
            this.$nextTick(() => {
                window.addEventListener('resize', () => { myChart.resize() })
            })
        }
    },
    watch: {
        optionObj: {
            handler(val, oldVal) {
                this.drawChart()
            },
            deep: true
        }
    }
}
</script>
