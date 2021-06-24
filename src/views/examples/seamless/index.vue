<template>
  <div class="gc-panel">
    <div class="gc-panel__title">SeamlessScroll 无缝滚动</div>
    <sDivider></sDivider>
    <div class="gc-container">
      <div class="gc-container__title">滚动实例</div>
      <sRow :gutter="16" class="gc-block__row">
        <sCol :xs="24" :sm="12" :lg="12">
          <mVlist :totalHeight="300" :defaultHeight="40">
            <mSeamlessScroll
              :data="listData"
              :direction="direction1"
              :step="step"
              :hoverStop="hoverStop"
              :singleHeight="singleHeight"
              :waitTime="waitTime"
            >
              <sCellGroup>
                <sCell
                  v-for="(item, index) in listData"
                  :key="index"
                  :title="item.title"
                  :extra="item.date"
                />
              </sCellGroup>
            </mSeamlessScroll>
          </mVlist>
        </sCol>
        <sCol :xs="24" :sm="12" :lg="12">
          <mSeamlessScroll
            :data="newsList"
            :direction="direction2"
            :limitMoveNum="2"
            class="seamless-warp"
          >
            <ul class="seamless-items">
              <li class="seamless-item" v-for="item in newsList" :key="item.title">
                {{ item.title }}
              </li>
            </ul>
          </mSeamlessScroll>
          <sRow :gutter="16" class="gc-block__row">
            <sCol :xs="24" :sm="8" :lg="8">
              <div class="gc-container__h1">上下方向</div>
              <sSwitch
                class="gc-block__switch"
                true-color="#13ce66"
                false-color="#ff4949"
                @on-change="onSwitch1($event)"
              >
                <span slot="open">上</span>
                <span slot="close">下</span>
              </sSwitch>
            </sCol>
            <sCol :xs="24" :sm="8" :lg="8">
              <div class="gc-container__h1">左右方向</div>
              <sSwitch
                class="gc-block__switch"
                true-color="#13ce66"
                false-color="#ff4949"
                @on-change="onSwitch2($event)"
              >
                <span slot="open">左</span>
                <span slot="close">右</span>
              </sSwitch>
            </sCol>
            <sCol :xs="24" :sm="8" :lg="8">
              <div class="gc-container__h1">速度(限制0~5)</div>
              <sInputNumber
                class="gc-block__input"
                :min="0"
                :max="5"
                v-model.trim="step"
              ></sInputNumber>
            </sCol>
          </sRow>
          <sRow :gutter="16" class="gc-block__row">
            <sCol :xs="24" :sm="8" :lg="8">
              <div class="gc-container__h1">鼠标悬停</div>
              <sCheckbox class="gc-block__switch" v-model="hoverStop" border>关闭</sCheckbox>
            </sCol>
            <sCol :xs="24" :sm="8" :lg="8">
              <div class="gc-container__h1">单行停顿(ps：38)</div>
              <sInputNumber
                class="gc-block__input"
                :min="0"
                v-model.trim="singleHeight"
              ></sInputNumber>
            </sCol>
            <sCol :xs="24" :sm="8" :lg="8">
              <div class="gc-container__h1">单行停顿时间(单位：ms)</div>
              <sInputNumber
                class="gc-block__input"
                :min="0"
                :disabled="singleHeight === 0"
                v-model.trim="waitTime"
              ></sInputNumber>
            </sCol>
          </sRow>
        </sCol>
      </sRow>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import seamlessScroll from '@base/Seamless';
import { getSeamlesData } from '@/api';

export default {
  data() {
    return {
      listData: [],
      newsList: [
        {
          title: 'A simple, seamless scrolling for Vue.js'
        },
        {
          title: 'A curated list of awesome things related to Vue.js'
        }
      ],
      direction1: 1,
      direction2: 2,
      step: 1,
      hoverStop: true,
      singleHeight: 0,
      waitTime: 1000
    };
  },
  created() {
    getSeamlesData().then(res => {
      this.listData = res.data;
    });
  },
  methods: {
    onSwitch1(data) {
      this.direction1 = data ? 0 : 1;
    },
    onSwitch2(data) {
      this.direction2 = data ? 3 : 2;
    }
  },
  components: {
    mSeamlessScroll: seamlessScroll
  }
};
</script>

<style lang="less" scoped>
.gc-block {
  display: inline-block;
  & + .gc-block {
    margin-left: 15px;
  }
  &__row {
    margin: 10px 0;
  }
  &__input {
    display: inline-block;
    width: 150px;
  }
  &__switch {
    display: inline-block;
  }
}
.seamless-warp {
  width: 100%;
  height: 20px;
  overflow: hidden;
}
.seamless-items {
  .clearfix();
}
.seamless-item {
  .fl();
}
</style>
