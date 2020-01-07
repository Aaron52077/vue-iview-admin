<template>
    <div class="gc-panel">
        <div class="gc-panel__title">Echart bar 图表</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <div class="gc-container__title">
                <sButtonGroup>
                    <sButton type="primary" to="https://v-charts.js.org/#/histogram" target="_blank">v-charts bar</sButton>
                    <sButton to="https://v-charts.js.org/#/histogram" target="_blank">更多示例和文档</sButton>
                </sButtonGroup> 
            </div>
            <sDivider></sDivider>
            <sRow :gutter="16">
                <sCol :xs="24" :sm="24" :lg="12">
                    <div class="echart-block">
                        <ve-histogram :data="chartData" v-bind="pubSetting"></ve-histogram>
                    </div>
                </sCol>
                <sCol :xs="24" :sm="24" :lg="12">
                    <div class="echart-block">
                        <ve-histogram :data="chartData" :settings="chartSettings" v-bind="pubSetting"></ve-histogram>
                    </div>
                </sCol>
            </sRow>
            <sDivider></sDivider>
            <div class="gc-container__title">内置自定义组件 bar</div>
            <sDivider></sDivider>
            <sRow :gutter="16">
                <sCol :xs="24" :sm="24" :lg="12">
                    <div class="echart-block">
                        <mEchart v-if="barObj1.data" :optionObj="barObj1.option"></mEchart>
                    </div>
                </sCol>
                <sCol :xs="24" :sm="24" :lg="12">
                    <div class="echart-block">
                        <mEchart v-if="barObj2.data" :optionObj="barObj2.option"></mEchart>
                    </div>
                </sCol>
            </sRow>
        </div>
    </div>
</template>

<script>
import vCharts from '@/components/mixins/v-charts.js'
import { echartBarAPI } from '@/api/echarts'
import { EchartsBar, EchartsBarOpt1 } from '@base/Echart/configs/bar'

export default {
    mixins: [vCharts],
    data () {
        return {
            barObj1: {
                data: false,
                option: {}
            }, 
            barObj2: {
                data: false,
                option: {}
            },
            chartSettings: {
                showLine: ['下单用户']
            },
            chartData: {
                columns: ['日期', '访问用户', '下单用户', '下单率'],
                rows: [
                    { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
                    { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
                    { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
                    { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
                    { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
                    { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
                ]
            }
        }
    },
    created() {
        echartBarAPI().then(res => {
            this.barObj1 = EchartsBar(res.data);
            this.barObj2 = EchartsBarOpt1(res.data);
        });
    }
}
</script>