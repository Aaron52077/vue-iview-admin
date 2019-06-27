<template>
    <div class="gc-panel">
        <div class="gc-panel__title">Echart line 图表</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <div class="gc-container__title">通过Easy Mock接口方式用法</div>
            <sDivider></sDivider>
            <sRow :gutter="16">
                <sCol span="12">
                    <div class="echart-block">
                        <mEchart v-if="lineObj1.data" :optionObj="lineObj1.option"></mEchart>
                    </div>
                </sCol>
                <sCol span="12">
                    <div class="echart-block">
                        <mEchart v-if="lineObj2.data" :optionObj="lineObj2.option"></mEchart>
                    </div>
                </sCol>
            </sRow>
        </div>
    </div>
</template>

<script>
import { echartLineAPI } from '@/api/echarts';
import { EchartsLine, EchartsLineOpt1 } from '@base/Echart/configs/line';

export default {
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
        }
    },
    created() {
        echartLineAPI().then(res => {
            this.lineObj1 = EchartsLine(res.data);
            this.lineObj2 = EchartsLineOpt1(res.data);
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
