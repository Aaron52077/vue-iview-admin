<template>
    <div class="gc-panel">
        <div class="gc-panel__title">Echart 图表</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <!-- 样式1 -->
            <div class="gc-container__title">基础用法</div>
            <sDivider></sDivider>
            <sRow :gutter="16">
                <sCol span="12">
                    <div class="echart-block">
                        <mEchart v-if="chartObj" :optionObj="chartObj.demo1"></mEchart>
                    </div>
                </sCol>
                <sCol span="12">
                    <div class="echart-block">
                        <mEchart v-if="chartObj" :optionObj="chartObj.demo3"></mEchart>
                    </div>
                </sCol>
            </sRow>
            <sRow :gutter="16">
                <sCol span="12">
                    <div class="echart-block">
                        <mEchart v-if="chartObj" :optionObj="chartObj.demo4"></mEchart>
                    </div>
                </sCol>
                <sCol span="12">
                    <div class="echart-block">
                        <mEchart v-if="chartObj" :optionObj="chartObj.demo2"></mEchart>
                    </div>
                </sCol>
            </sRow>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
require('echarts/extension/bmap/bmap');
import {demo1, demo2, demo3, demo4} from './config';

export default {
    data () {
        return {
            chartObj: {
                demo1,
                demo2,
                demo3,
                demo4
            }
        }
    },
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/common/_mixins.less';
.echart-block {
    width: 100%;
    height: 450px;
}
</style>
