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
import { echartBarAPI, echartBaseAPI } from '@/api/echarts'
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
                columns: [],
                rows: []
            }
        }
    },
    created() {
        echartBaseAPI().then(res => {
            this.chartData = {...res.data}
        });
        echartBarAPI().then(res => {
            this.barObj1 = EchartsBar(res.data);
            this.barObj2 = EchartsBarOpt1(res.data);
        });
    }
}
</script>