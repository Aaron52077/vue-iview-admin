<template>
    <div class="gc-panel">
        <div class="gc-panel__title">Echart boxplot 图表</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <div class="gc-container__title">通过Mock接口方式用法</div>
            <sDivider></sDivider>
            <sRow :gutter="16">
                <sCol span="12">
                    <div class="echart-block">
                        <mEchart v-if="boxplotObj1.data" :optionObj="boxplotObj1.option"></mEchart>
                    </div>
                </sCol>
            </sRow>
        </div>
    </div>
</template>

<script>
import { echartBoxplotAPI } from '@/api/echarts';
import { EchartsBoxplot } from '@base/Echart/configs/boxplot';

export default {
    data () {
        return {
            boxplotObj1: {
                data: false,
                option: {}
            }
        }
    },
    created() {
        echartBoxplotAPI().then(res => {
            this.boxplotObj1 = EchartsBoxplot(res.data, '分', 100);
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
