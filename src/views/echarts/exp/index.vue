<template>
    <div class="gc-panel">
        <div class="gc-panel__title">Echart 图表</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <!-- 用法1 -->
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
                        <mEchart v-if="chartObj" :optionObj="chartObj.demo2"></mEchart>
                    </div>
                </sCol>
                <sCol span="12">
                    <div class="echart-block">
                        <mEchart v-if="lineObj.data" :optionObj="lineObj.option"></mEchart>
                    </div>
                </sCol>
            </sRow>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
require('echarts/extension/bmap/bmap');
import { EchartsLine } from '@base/Echart/configs/line';
import {demo1, demo2, demo3} from './config';

export default {
    data () {
        return {
            chartObj: {
                demo1,
                demo2,
                demo3
            },
            lineObj: {
                data: false,
                option: {}
            }, 
            columnarObj: {
                data: false,
                option: {}
            },
            lineData: {
                title: '渐变折线图',
                legend: ['理科', '文科'],
                xAxis: ['00：00','02：00','04：00','06：00','08：00','10：00','12：00','14：00','16：00','18：00','20：00','22：00','24：00'],
                series: [
                    {name: '理科', data: [20, 18, 19, 13, 15, 12, 10, 12, 14, 12, 16, 13, 23]},
                    {name: '文科', data: [12, 10, 12, 15, 16, 18, 9, 12, 17, 19, 13, 15, 29]}
                ]
            },
            pieData: {
                title: '月均消费分布',
                legend: [],
                xAxis: [],
                series: [
                    { value:10, name:'0' },
                    { value:5, name:'1-200' },
                    { value:15, name:'201-300' },
                    { value:25, name:'301-400' },
                    { value:20, name:'401-500' },
                    { value:35, name:'501-600' },
                    { value:30, name:'600以上' }
                ]
            }
        }
    },
    created() {
        this.lineObj = EchartsLine(this.lineData)
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
