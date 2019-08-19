<template>
    <div class="gc-panel">
        <div class="gc-panel__title">Echart gauge 图表</div>
        <sDivider></sDivider>
        <sSpin size="large" fix v-if="spinShow"></sSpin>
        <div class="gc-container" v-show="!spinShow">
            <div class="gc-container__title">通过Easy Mock接口方式用法</div>
            <sDivider></sDivider>
            <sRow :gutter="16">
                <sCol span="12">
                    <div class="echart-block">
                        <mEchart v-if="gaugeObj1.data" :optionObj="gaugeObj1.option"></mEchart>
                    </div>
                </sCol>
                <sCol span="12">
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
import { echartGaugeAPI } from '@/api/echarts';
import { EchartsGauge, EchartsGaugeOpt1 } from '@base/Echart/configs/gauge';

export default {
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
            spinShow: true
        }
    },
    created() {
        echartGaugeAPI().then(res => {
            this.spinShow = false;
            this.gaugeObj1 = EchartsGauge(res.data);
            this.gaugeObj2 = EchartsGaugeOpt1(res.data);
            this.gaugeValue = res.data.series[0].value;
        });
    }
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/common/_mixins.less';
.echart-block {
    position: relative;
    width: 100%;
    height: 450px;
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