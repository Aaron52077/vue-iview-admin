<template>
    <div class="gc-panel">
        <div class="gc-panel__title">Echart map 图表</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <div class="gc-container__title">通过Mock接口方式用法</div>
            <sDivider></sDivider>
            <sRow :gutter="16">
                <sCol span="12">
                    <div class="echart-block">
                        <mEchart v-if="mapObj1.data" :optionObj="mapObj1.option"></mEchart>
                    </div>
                </sCol>
                <sCol span="12">
                    <div class="echart-block">
                        <mEchart v-if="mapObj2.data" :optionObj="mapObj2.option"></mEchart>
                    </div>
                </sCol>
            </sRow>
        </div>
    </div>
</template>

<script>
import { echartMapAPI } from '@/api/echarts';
import { EchartsMap, EchartsMapOpt1 } from '@base/Echart/configs/map';

export default {
    data () {
        return {
            mapObj1: {
                data: false,
                option: {}
            },
            mapObj2: {
                data: false,
                option: {}
            }
        }
    },
    created() {
        echartMapAPI().then(res => {
            this.mapObj1 = EchartsMap(res.data, '人');
            this.mapObj2 = EchartsMapOpt1(res.data, '人');
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