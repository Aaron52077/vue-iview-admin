<template>
  <div class="gc-panel">
    <div class="gc-panel__title">TimePicker 时间段控件</div>
    <sDivider></sDivider>
    <div class="gc-container">
      <div class="gc-container__title">常用用法(年、月、日)</div>
      <!-- 年份 -->
      <mTimePicker
        type="year"
        format="yyyy"
        formater="yyyy"
        placeholder="选择年份"
        innerText="获取年份"
        @on-click="handle"
      ></mTimePicker>
      <!-- 月份 -->
      <mTimePicker
        type="month"
        format="yyyy-MM"
        formater="yyyy-MM-dd"
        placeholder="选择月份"
        innerText="获取月份"
        @on-click="handle"
      ></mTimePicker>
      <!-- 日期 -->
      <mTimePicker
        type="date"
        format="yyyy-MM-dd"
        formater="yyyy-MM-dd"
        placeholder="选择日期"
        innerText="获取日期"
        @on-click="handle"
      ></mTimePicker>
    </div>
    <div class="gc-container">
      <sDivider></sDivider>
      <div class="gc-container__title">其他用法</div>
      <!-- 月份 -->
      <mTimePicker
        type="month"
        format="yyyy-MM"
        formater="yyyy-MM"
        placeholder="选择月份"
        innerText="默认时间"
        :config="confData"
        @on-click="handle"
      ></mTimePicker>
      <mTimePicker
        type="datetime"
        format="yyyy-MM-dd HH:mm"
        formater="yyyy-MM-dd hh:mm"
        :hasLabel="true"
        innerText="搜索"
        @on-click="handle"
      >
        <template v-slot:innerLeft>
          <span>开始时间：</span>
        </template>
        <template v-slot:innerRight>
          <span style="padding-left: 10px;">结束时间：</span>
        </template>
      </mTimePicker>
    </div>
    <div class="gc-container">
      <sDivider></sDivider>
      <div class="gc-container__title">设置开始时间和结束时间限制</div>
      <div style="margin-top: 10px;">
        <sDatePicker
          type="date"
          :options="startTimeOptions"
          placeholder="开始时间"
          style="margin-right: 15px"
          v-model="starttime"
          transfer
        ></sDatePicker>
        <sDatePicker
          type="date"
          :options="endTimeOptions"
          placeholder="结束时间"
          v-model="endtime"
          transfer
        ></sDatePicker>
      </div>
    </div>
    <div>{{ '102423232' | readFileSize }}</div>
  </div>
</template>

<script>
/* eslint-disable */
import { readFileSize } from '@/filters';

export default {
  data() {
    return {
      startTimeOptions: {
        disabledDate: date => {
          if (this.endtime) {
            return date.valueOf() > new Date(this.endtime).valueOf();
          }
        }
      }, // 开始日期设置
      endTimeOptions: {
        disabledDate: date => {
          if (this.starttime) {
            return date.valueOf() < new Date(this.starttime).valueOf();
          }
        }
      }, // 结束日期设置
      starttime: '', // 开始日期
      endtime: '' // 结束日期
    };
  },
  methods: {
    handle(data) {
      const parmas = {
        start: data.start,
        end: data.end
      };
      this.$Message.info(`开始时间：${parmas.start}，结束时间：${parmas.end}`);
    }
  },
  computed: {
    confData() {
      const t = this.dataBase;
      let beginTime = new Date().getFullYear();
      let nowTime = t.dateToStr(new Date(), 'yyyy-MM');
      const date = {
        start: `${beginTime}-01-01`,
        end: `${nowTime}-01`
      };
      return date;
    }
  },
  filters: { readFileSize }
};
</script>

<style lang="less" scoped>
.gc-block {
  display: inline-block;
  & + .gc-block {
    margin-left: 15px;
  }
}
</style>
