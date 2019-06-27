<template>
    <div class="gc-panel">
        <div class="gc-panel__title">Echart pie 图表</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <div class="gc-container__title">通过Easy Mock接口方式用法</div>
            <sDivider></sDivider>
            <sRow :gutter="16">
                <sCol span="12">
                    <div class="echart-block">
                        <mEchart v-if="pieObj1.data" :optionObj="pieObj1.option"></mEchart>
                    </div>
                </sCol>
                <sCol span="12">
                    <div class="echart-block">
                        <mEchart v-if="pieObj2.data" :optionObj="pieObj2.option"></mEchart>
                    </div>
                </sCol>
            </sRow>
        </div>
    </div>
</template>

<script>
import { echartPieAPI } from '@/api/echarts';
import { EchartsPie, EchartsPieOpt1 } from '@base/Echart/configs/pie';

export default {
    data () {
        return {
            pieObj1: {
                data: false,
                option: {}
            }, 
            pieObj2: {
                data: false,
                option: {}
            },
        }
    },
    created() {
        echartPieAPI().then(res => {
            this.pieObj1 = EchartsPie(res.data);
            this.pieObj2 = EchartsPieOpt1(res.data);
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