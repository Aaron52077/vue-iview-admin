<template>
    <div class="gc-panel">
        <div class="gc-panel__title">Echart gauge 图表</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <div class="gc-container__title">
                <sButtonGroup>
                    <sButton type="primary" to="https://v-charts.js.org/#/gauge" target="_blank">v-charts gauge</sButton>
                    <sButton to="https://v-charts.js.org/#/gauge" target="_blank">更多示例和文档</sButton>
                </sButtonGroup> 
            </div>
            <sDivider></sDivider>
            <sRow :gutter="16">
                <sCol :xs="24" :sm="24" :lg="12">
                    <div class="echart-block">
                        <ve-gauge :data="chartData" :settings="chartSettings" v-bind="pubSetting"></ve-gauge>
                    </div>
                </sCol>
                <sCol :xs="24" :sm="24" :lg="12">
                    <div class="echart-block">
                        <mEchart v-if="gaugeObj1.data" :optionObj="gaugeObj1.option"></mEchart>
                    </div>
                </sCol>
            </sRow>
            <sDivider></sDivider>
            <div class="gc-container__title">内置自定义组件 gauge</div>
            <sDivider></sDivider>
            <sRow :gutter="16">
                <sCol :xs="24" :sm="24" :lg="24">
                    <div class="echart-block">
                        <mEchart v-if="gaugeObj2.data" :optionObj="gaugeObj2.option"></mEchart>
                        <div class="echart-block__inner">
                            <div class="inner-number">{{gaugeValue}}%</div>
                            <div class="inner-desc">生活规律性</div>
                        </div>
                    </div>
                </sCol>
            </sRow>
        </div>
    </div>
</template>

<script>
import vCharts from '@/components/mixins/v-charts.js'
import { echartGaugeAPI } from '@/api/echarts';
import { EchartsGauge, EchartsGaugeOpt1 } from '@base/Echart/configs/gauge';

export default {
    mixins: [vCharts],
    data () {
        return {
            gaugeObj1: {
                data: false,
                option: {}
            },
            gaugeObj2: {
                data: false,
                option: {}
            },
            gaugeValue: '',
            spinShow: true,
            chartSettings: {
                dataType: {
                    '占比': 'percent'
                },
                seriesMap: {
                    '占比': {
                        min: 0,
                        max: 1
                    }
                }
            },
            chartData: {
                columns: ['type', 'value'],
                rows: [
                    { type: '占比', value: 0.8 }
                ]
            }
        }
    },
    created() {
        echartGaugeAPI().then(res => {
            this.gaugeObj1 = EchartsGauge(res.data);
            this.gaugeObj2 = EchartsGaugeOpt1(res.data);
            this.gaugeValue = res.data.series[0].value;
        });
    }
}
</script>

<style lang="less" scoped>
.echart-block {
    position: relative;
    &__inner {
        position: absolute;
        top: 65%;
        left: 0;
        right: 0;
        text-align: center;
        z-index: 1;
        .inner-number {
            font-size: 18px;
            color: #03b7c9;
        }
        .inner-desc {
            font-size: 14px;
            color: #141414;
        }
    }
}
</style>