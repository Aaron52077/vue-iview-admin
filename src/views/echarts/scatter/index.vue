<template>
    <div class="gc-panel">
        <div class="gc-panel__title">Echart scatter 图表</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <div class="gc-container__title">通过Easy Mock接口方式用法</div>
            <sDivider></sDivider>
            <sRow :gutter="16">
                <sCol span="12">
                    <div class="echart-block">
                        <mEchart v-if="scatterObj1.data" :optionObj="scatterObj1.option"></mEchart>
                    </div>
                </sCol>
            </sRow>
        </div>
    </div>
</template>

<script>
import { echartScatterAPI } from '@/api/echarts';
import { EchartsScatter } from '@base/Echart/configs/scatter';

export default {
    data () {
        return {
            scatterObj1: {
                data: false,
                option: {}
            }
        }
    },
    created() {
        echartScatterAPI().then(res => {
            this.scatterObj1 = EchartsScatter(res.data, '间');
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