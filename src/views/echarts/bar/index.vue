<template>
    <div class="gc-panel">
        <div class="gc-panel__title">Echart bar 图表</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <div class="gc-container__title">通过Mock接口方式用法</div>
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
import { echartBarAPI } from '@/api/echarts';
import { EchartsBar, EchartsBarOpt1 } from '@base/Echart/configs/bar';

export default {
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

<style lang="less" scoped>
@import '~@/assets/css/common/_mixins.less';
.echart-block {
    width: 100%;
    height: 450px;
}
</style>
