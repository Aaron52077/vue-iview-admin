<template>
    <div class="gc-panel">
        <div class="gc-panel__title">Echart line 图表</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <div class="gc-container__title">
                <sButtonGroup>
                    <sButton type="primary" to="https://v-charts.js.org/#/line" target="_blank">v-charts line</sButton>
                    <sButton to="https://v-charts.js.org/#/line" target="_blank">更多示例和文档</sButton>
                </sButtonGroup> 
            </div>
            <sDivider></sDivider>
            <sRow :gutter="16">
                <sCol :xs="24" :sm="24" :lg="12">
                    <div class="echart-block">
                        <ve-line :data="chartData" v-bind="pubSetting"></ve-line>
                    </div>
                </sCol>
                <sCol :xs="24" :sm="24" :lg="12">
                    <div class="echart-block">
                        <ve-line :data="chartData" :settings="chartSettings" v-bind="pubSetting"></ve-line>
                    </div>
                </sCol>
            </sRow>
            <sDivider></sDivider>
            <div class="gc-container__title">内置自定义组件 line</div>
            <sDivider></sDivider>
            <sRow :gutter="16">
                <sCol :xs="24" :sm="24" :lg="12">
                    <div class="echart-block">
                        <mEchart v-if="lineObj1.data" :optionObj="lineObj1.option"></mEchart>
                    </div>
                </sCol>
                <sCol :xs="24" :sm="24" :lg="12">
                    <div class="echart-block">
                        <mEchart v-if="lineObj2.data" :optionObj="lineObj2.option"></mEchart>
                    </div>
                </sCol>
            </sRow>
        </div>
    </div>
</template>

<script>
import vCharts from '@/components/mixins/v-charts.js'
import { echartLineAPI, echartBaseAPI } from '@/api/echarts';
import { EchartsLine, EchartsLineOpt1 } from '@base/Echart/configs/line';

export default {
    mixins: [vCharts],
    data () {
        return {
            lineObj1: {
                data: false,
                option: {}
            }, 
            lineObj2: {
                data: false,
                option: {}
            },
            chartSettings: {
                stack: { '用户': ['访问用户', '下单用户'] },
                area: true
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
        echartLineAPI().then(res => {
            const coloums = [
                { key: '理科', unit: '人' },
                { key: '文科', unit: '人' }
            ];
            this.lineObj1 = EchartsLine(res.data, coloums);
            this.lineObj2 = EchartsLineOpt1(res.data);
        });
    }
}
</script>
