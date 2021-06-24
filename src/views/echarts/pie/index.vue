<template>
  <div class="gc-panel">
    <div class="gc-panel__title">Echart pie 图表</div>
    <sDivider></sDivider>
    <div class="gc-container">
      <div class="gc-container__title">
        <sButtonGroup>
          <sButton type="primary" to="https://v-charts.js.org/#/pie" target="_blank"
            >v-charts pie</sButton
          >
          <sButton to="https://v-charts.js.org/#/pie" target="_blank">更多示例和文档</sButton>
        </sButtonGroup>
      </div>
      <sDivider></sDivider>
      <sRow :gutter="16">
        <sCol :xs="24" :sm="24" :lg="12">
          <div class="echart-block">
            <ve-pie :data="chartData" v-bind="pubSetting"></ve-pie>
          </div>
        </sCol>
        <sCol :xs="24" :sm="24" :lg="12">
          <div class="echart-block">
            <ve-pie :data="chartData" :settings="chartSettings" v-bind="pubSetting"></ve-pie>
          </div>
        </sCol>
      </sRow>
      <sDivider></sDivider>
      <div class="gc-container__title">内置自定义组件 pie</div>
      <sDivider></sDivider>
      <sRow :gutter="16">
        <sCol :xs="24" :sm="24" :lg="12">
          <div class="echart-block">
            <mEchart v-if="pieObj1.data" :optionObj="pieObj1.option"></mEchart>
          </div>
        </sCol>
        <sCol :xs="24" :sm="24" :lg="12">
          <div class="echart-block">
            <mEchart v-if="pieObj2.data" :optionObj="pieObj2.option"></mEchart>
          </div>
        </sCol>
      </sRow>
    </div>
  </div>
</template>

<script>
import vCharts from '@/components/mixins/v-charts.js';
import { echartPieAPI } from '@/api/echarts';
import { EchartsPie, EchartsPieOpt1 } from '@base/Echart/configs/pie';

export default {
  mixins: [vCharts],
  data() {
    return {
      pieObj1: {
        data: false,
        option: {}
      },
      pieObj2: {
        data: false,
        option: {}
      },
      chartSettings: {
        roseType: 'radius'
      },
      chartData: {
        columns: ['日期', '访问用户'],
        rows: [
          { 日期: '1/1', 访问用户: 1393 },
          { 日期: '1/2', 访问用户: 3530 },
          { 日期: '1/3', 访问用户: 2923 },
          { 日期: '1/4', 访问用户: 1723 },
          { 日期: '1/5', 访问用户: 3792 },
          { 日期: '1/6', 访问用户: 4593 }
        ]
      }
    };
  },
  created() {
    echartPieAPI().then(res => {
      this.pieObj1 = EchartsPie(res.data);
      this.pieObj2 = EchartsPieOpt1(res.data);
    });
  }
};
</script>
