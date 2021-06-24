<template>
  <div class="gc-panel">
    <div class="gc-panel__title">Echart funnel 图表</div>
    <sDivider></sDivider>
    <div class="gc-container">
      <div class="gc-container__title">
        <sButtonGroup>
          <sButton type="primary" to="https://v-charts.js.org/#/funnel" target="_blank"
            >v-charts funnel</sButton
          >
          <sButton to="https://v-charts.js.org/#/funnel" target="_blank">更多示例和文档</sButton>
        </sButtonGroup>
      </div>
      <sDivider></sDivider>
      <sRow :gutter="16">
        <sCol :xs="24" :sm="24" :lg="12">
          <div class="echart-block">
            <ve-funnel :data="chartData" v-bind="pubSetting"></ve-funnel>
          </div>
        </sCol>
        <sCol :xs="24" :sm="24" :lg="12">
          <div class="echart-block">
            <ve-funnel :data="chartData" :settings="chartSettings" v-bind="pubSetting"></ve-funnel>
          </div>
        </sCol>
      </sRow>
      <sDivider></sDivider>
      <div class="gc-container__title">内置自定义组件 funnel</div>
      <sDivider></sDivider>
      <sRow :gutter="16">
        <sCol :xs="24" :sm="24" :lg="12">
          <div class="echart-block">
            <mEchart v-if="funnelObj1.data" :optionObj="funnelObj1.option"></mEchart>
          </div>
        </sCol>
        <sCol :xs="24" :sm="24" :lg="12"></sCol>
      </sRow>
    </div>
  </div>
</template>

<script>
import vCharts from '@/components/mixins/v-charts.js';
import { echartFunnelAPI } from '@/api/echarts';
import { EchartsFunnel } from '@base/Echart/configs/funnel';

export default {
  mixins: [vCharts],
  data() {
    return {
      funnelObj1: {
        data: false,
        option: {}
      },
      chartSettings: {
        sequence: ['订单', '点击', '访问', '展示']
      },
      chartData: {
        columns: ['状态', '数值'],
        rows: [
          { 状态: '展示', 数值: 900 },
          { 状态: '访问', 数值: 600 },
          { 状态: '点击', 数值: 300 },
          { 状态: '订单', 数值: 100 }
        ]
      }
    };
  },
  created() {
    echartFunnelAPI().then(res => {
      this.funnelObj1 = EchartsFunnel(res.data);
    });
  }
};
</script>
