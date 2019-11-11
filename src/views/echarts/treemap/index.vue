<template>
    <div class="gc-panel">
        <div class="gc-panel__title">Echart treemap 图表</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <div class="gc-container__title">通过Mock接口方式用法</div>
            <sDivider></sDivider>
            <sRow :gutter="16">
                <sCol span="12">
                    <div class="echart-block">
                        <mEchart v-if="treemapObj1.data" :optionObj="treemapObj1.option"></mEchart>
                    </div>
                </sCol>
                <sCol span="12">
                    <div class="echart-block">
                        <mEchart v-if="treemapObj2.data" :optionObj="treemapObj2.option"></mEchart>
                    </div>
                </sCol>
            </sRow>
        </div>
    </div>
</template>

<script>
import { echartTreemapAPI } from '@/api/echarts';
import { EchartsTreemap, EchartsTreemapOpt1 } from '@base/Echart/configs/treemap';

export default {
    data () {
        return {
            treemapObj1: {
                data: false,
                option: {}
            },
            treemapObj2: {
                data: false,
                option: {}
            }
        }
    },
    created() {
        echartTreemapAPI().then(res => {
            this.treemapObj1 = EchartsTreemap(res.data);
            this.treemapObj2 = EchartsTreemapOpt1(res.data);
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