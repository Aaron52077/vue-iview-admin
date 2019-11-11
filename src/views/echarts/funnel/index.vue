<template>
    <div class="gc-panel">
        <div class="gc-panel__title">Echart funnel 图表</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <div class="gc-container__title">通过Mock接口方式用法</div>
            <sDivider></sDivider>
            <sRow :gutter="16">
                <sCol span="12">
                    <div class="echart-block">
                        <mEchart v-if="funnelObj1.data" :optionObj="funnelObj1.option"></mEchart>
                    </div>
                </sCol>
                <sCol span="12">
                    <div class="echart-block">

                    </div>
                </sCol>
            </sRow>
        </div>
    </div>
</template>

<script>
import { echartFunnelAPI } from '@/api/echarts';
import { EchartsFunnel } from '@base/Echart/configs/funnel';

export default {
    data () {
        return {
            funnelObj1: {
                data: false,
                option: {}
            }
        }
    },
    created() {
        echartFunnelAPI().then(res => {
            this.funnelObj1 = EchartsFunnel(res.data);
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
