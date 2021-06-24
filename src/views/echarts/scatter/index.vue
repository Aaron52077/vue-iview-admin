<template>
  <div class="gc-panel">
    <div class="gc-panel__title">Echart scatter 图表</div>
    <sDivider></sDivider>
    <div class="gc-container">
      <div class="gc-container__title">
        <sButtonGroup>
          <sButton type="primary" to="https://v-charts.js.org/#/scatter" target="_blank"
            >v-charts scatter</sButton
          >
          <sButton to="https://v-charts.js.org/#/scatter" target="_blank">更多示例和文档</sButton>
        </sButtonGroup>
      </div>
      <sDivider></sDivider>
      <sRow :gutter="16">
        <sCol :xs="24" :sm="24" :lg="12">
          <div class="echart-block">
            <ve-scatter
              :data="chartData"
              :settings="chartSettings"
              v-bind="pubSetting"
            ></ve-scatter>
          </div>
        </sCol>
        <sCol :xs="24" :sm="24" :lg="12">
          <div class="echart-block">
            <mEchart v-if="scatterObj1.data" :optionObj="scatterObj1.option"></mEchart>
          </div>
        </sCol>
      </sRow>
    </div>
  </div>
</template>

<script>
import vCharts from '@/components/mixins/v-charts.js';
import { echartScatterAPI } from '@/api/echarts';
import { EchartsScatter } from '@base/Echart/configs/scatter';

export default {
  mixins: [vCharts],
  data() {
    return {
      scatterObj1: {
        data: false,
        option: {}
      },
      chartSettings: {
        showLine: ['下单用户']
      },
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '年龄'],
        rows: {
          上海: [
            { 日期: '1/1', 访问用户: 123, 年龄: 3, 下单用户: 1244 },
            { 日期: '1/2', 访问用户: 1223, 年龄: 6, 下单用户: 2344 },
            { 日期: '1/3', 访问用户: 7123, 年龄: 9, 下单用户: 3245 },
            { 日期: '1/4', 访问用户: 4123, 年龄: 12, 下单用户: 4355 },
            { 日期: '1/5', 访问用户: 3123, 年龄: 15, 下单用户: 4564 },
            { 日期: '1/6', 访问用户: 2323, 年龄: 20, 下单用户: 6537 }
          ],
          北京: [
            { 日期: '1/1', 访问用户: 123, 年龄: 3, 下单用户: 1244 },
            { 日期: '1/2', 访问用户: 1273, 年龄: 6, 下单用户: 2344 },
            { 日期: '1/3', 访问用户: 3123, 年龄: 15, 下单用户: 4564 },
            { 日期: '1/4', 访问用户: 2123, 年龄: 9, 下单用户: 3245 },
            { 日期: '1/5', 访问用户: 4103, 年龄: 12, 下单用户: 4355 },
            { 日期: '1/6', 访问用户: 7123, 年龄: 10, 下单用户: 3567 }
          ],
          广州: [
            { 日期: '1/1', 访问用户: 123, 年龄: 3, 下单用户: 1244 },
            { 日期: '1/2', 访问用户: 1223, 年龄: 6, 下单用户: 2344 },
            { 日期: '1/3', 访问用户: 2123, 年龄: 30, 下单用户: 3245 },
            { 日期: '1/5', 访问用户: 4123, 年龄: 12, 下单用户: 4355 },
            { 日期: '1/4', 访问用户: 5123, 年龄: 18, 下单用户: 4564 },
            { 日期: '1/6', 访问用户: 3843, 年龄: 30, 下单用户: 4850 }
          ]
        }
      }
    };
  },
  created() {
    echartScatterAPI().then(res => {
      this.scatterObj1 = EchartsScatter(res.data, '间');
    });
  }
};
</script>
