<template>
    <div class="gc-panel">
        <div class="gc-panel__title">Echart radar 图表</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <div class="gc-container__title">通过Easy Mock接口方式用法</div>
            <sDivider></sDivider>
            <sRow :gutter="16">
                <sCol span="12">
                    <div class="echart-block">
                        <mEchart v-if="radarObj1.data" :optionObj="radarObj1.option"></mEchart>
                    </div>
                </sCol>
                <sCol span="12">
                    <div class="echart-block">
                        <mEchart v-if="radarObj2.data" :optionObj="radarObj2.option"></mEchart>
                    </div>
                </sCol>
            </sRow>
        </div>
    </div>
</template>

<script>
import { echartRadarAPI } from '@/api/echarts';
import { EchartsRadar, EchartsRadarOpt1 } from '@base/Echart/configs/radar';

export default {
    data () {
        return {
            radarObj1: {
                data: false,
                option: {}
            }, 
            radarObj2: {
                data: false,
                option: {}
            },
        }
    },
    created() {
        echartRadarAPI().then(res => {
            this.radarObj1 = EchartsRadar(res.data);
            this.radarObj2 = EchartsRadarOpt1(res.data);
        });
    }
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/common/_mixins.less';
.echart-block {
    width: 100%;
    height: 450px;
}
</style>