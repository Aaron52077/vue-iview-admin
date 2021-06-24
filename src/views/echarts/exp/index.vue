<template>
  <div class="gc-panel">
    <div class="gc-panel__title">Echart 图表</div>
    <sDivider></sDivider>
    <div class="gc-container">
      <!-- 用法1 -->
      <div class="gc-container__title">基础用法</div>
      <sDivider></sDivider>
      <div class="gc-container__h1">
        通用说明：以下图例会根据归类好的分类配置展示不同实例，具体参考：<linkDiy
          to="https://github.com/Aaron52077/vue-wuli-ui/tree/master/src/components/Base/Echart/configs"
          >传送门</linkDiy
        >
      </div>
      <div class="gc-container__h1">
        在使用 echarts 生成图表时，经常需要做繁琐的数据类型转化、修改复杂的配置项，v-charts
        的出现正是为了解决这个痛点。基于 Vue2.0 和 echarts 封装的 v-charts
        图表组件，只需要统一提供一种对前后端都友好的数据格式设置简单的配置项，便可轻松生成常见的图表，这里我推荐<linkDiy
          to="https://v-charts.js.org/#/"
          >v-charts传送门</linkDiy
        >
      </div>
      <sRow :gutter="16">
        <sCol :xs="24" :sm="24" :lg="12">
          <div class="echart-block">
            <mEchart v-if="chartObj" :optionObj="chartObj.demo1"></mEchart>
          </div>
        </sCol>
        <sCol :xs="24" :sm="24" :lg="12">
          <div class="echart-block">
            <mEchart v-if="chartObj" :optionObj="chartObj.demo3"></mEchart>
          </div>
        </sCol>
      </sRow>
      <sRow :gutter="16">
        <sCol :xs="24" :sm="24" :lg="12">
          <div class="echart-block">
            <mEchart v-if="chartObj" :optionObj="chartObj.demo2"></mEchart>
          </div>
        </sCol>
        <sCol :xs="24" :sm="24" :lg="12">
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
// require('echarts/extension/bmap/bmap');
import { EchartsLine } from '@base/Echart/configs/line';
import linkDiy from '@base/Link';
import { demo1, demo2, demo3 } from './config';

export default {
  data() {
    return {
      chartsType: [
        'bar',
        'boxplot',
        'funnel',
        'gauge',
        'line',
        'map',
        'pie',
        'radar',
        'scatter',
        'treemap'
      ],
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
        xAxis: [
          '00：00',
          '02：00',
          '04：00',
          '06：00',
          '08：00',
          '10：00',
          '12：00',
          '14：00',
          '16：00',
          '18：00',
          '20：00',
          '22：00',
          '24：00'
        ],
        series: [
          { name: '理科', data: [20, 18, 19, 13, 15, 12, 10, 12, 14, 12, 16, 13, 23] },
          { name: '文科', data: [12, 10, 12, 15, 16, 18, 9, 12, 17, 19, 13, 15, 29] }
        ]
      },
      pieData: {
        title: '月均消费分布',
        legend: [],
        xAxis: [],
        series: [
          { value: 10, name: '0' },
          { value: 5, name: '1-200' },
          { value: 15, name: '201-300' },
          { value: 25, name: '301-400' },
          { value: 20, name: '401-500' },
          { value: 35, name: '501-600' },
          { value: 30, name: '600以上' }
        ]
      }
    };
  },
  created() {
    const coloums = [
      { key: '理科', unit: '元' },
      { key: '文科', unit: '个' }
    ];
    this.lineObj = EchartsLine(this.lineData, coloums);
  },
  components: { linkDiy }
};
</script>
