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
        },
        action: {
            type: Boolean,
            default: false
        },
        path: String,       // 前提action动作为true, path: 路由地址
        params: String      // 前提action动作为true, params: 取字段名
    },
    data() {
        return {
            myChart: null
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
        });
    },
    methods: {
        drawChart() {
            let option = this.dataBase.cloneDeep(this.optionObj);
            this.myChart = this.echartInit(this.chartId);
            this.myChart.setOption(option, true);
            let path = this.dataBase.cloneDeep(this.path);
            let payload = this.dataBase.cloneDeep(this.params);
            if(this.action && this.path) {
                this.myChart.on('click', params => {
                    this.$router.push({path: `${this.path}`, query: { obj: payload ? params[`${payload}`] : ''} })
                });
            };
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
