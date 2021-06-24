<template>
  <div class="gc-panel">
    <div class="gc-panel__title">地图坐标拾取器(各平台经纬度有所差异)</div>
    <sDivider></sDivider>
    <sRow :gutter="16" class="gc-block__row">
      <sCol :xs="24" :sm="12" :lg="12">
        <div class="gc-panel__title">AMap 高德地图</div>
        <sDivider></sDivider>
        <div class="gc-container">
          <div class="gc-container__title">
            地理位置获取 示例1
            <sButton type="primary" @click="map1.open = true">戳一下试试</sButton>
          </div>
          <sDivider></sDivider>
          <div class="gc-container__h1">数据：{{ map1 }}</div>
          <sDivider></sDivider>
          <div class="gc-container__title">
            地理位置获取 示例2 <sButton type="info" @click="map2.open = true">戳一下试试</sButton>
          </div>
          <sDivider></sDivider>
          <div class="gc-container__h1">数据：{{ map2 }}</div>
        </div>
      </sCol>
      <sCol :xs="24" :sm="12" :lg="12">
        <div class="gc-panel__title">QQmap 腾讯地图</div>
        <sDivider></sDivider>
        <div class="gc-container">
          <div class="gc-container__title">
            地理位置获取 示例1
            <sButton type="primary" @click="map3.open = true">戳一下试试</sButton>
          </div>
          <sDivider></sDivider>
          <div class="gc-container__h1">数据：{{ map3 }}</div>
          <sDivider></sDivider>
          <div class="gc-container__title">
            地理位置获取 示例2 <sButton type="info" @click="map4.open = true">戳一下试试</sButton>
          </div>
          <sDivider></sDivider>
          <div class="gc-container__h1">数据：{{ map4 }}</div>
        </div>
      </sCol>
    </sRow>
    <sDivider></sDivider>
    <sRow :gutter="16" class="gc-block__row">
      <sCol :xs="24" :sm="24" :lg="24">
        <div class="gc-panel__title">BMap 百度地图</div>
        <sDivider></sDivider>
        <div class="gc-container">
          <div class="gc-container__title">
            地理位置获取 示例1
            <sButton type="primary" @click="map5.open = true">戳一下试试</sButton>
          </div>
          <sDivider></sDivider>
          <div class="gc-container__h1">数据：{{ map5 }}</div>
          <sDivider></sDivider>
          <div class="gc-container__title">
            地理位置获取 示例2 <sButton type="info" @click="map6.open = true">戳一下试试</sButton>
          </div>
          <sDivider></sDivider>
          <div class="gc-container__h1">数据：{{ map6 }}</div>
        </div>
      </sCol>
    </sRow>

    <AMap v-model="map1" />
    <AMap v-model="map2" title="默认地址" />
    <QQMap v-model="map3" />
    <QQMap v-model="map4" title="默认地址" />
    <BMap v-model="map5" />
    <BMap v-model="map6" title="默认地址" />
  </div>
</template>

<script>
import AMap from '@base/Map/AMap';
import QQMap from '@base/Map/QQMap';
import BMap from '@base/Map/BMap';

export default {
  data() {
    return {
      map1: { open: false },
      map2: {
        open: false,
        point: [104.160107, 30.831634],
        address: '四川省成都市新都区新都镇宝光街81号宝光寺'
      },
      map3: { open: false },
      map4: {
        open: false,
        point: [104.160107, 30.831634],
        address: '四川省成都市新都区新都镇宝光街81号宝光寺'
      },
      map5: { open: false },
      map6: {
        open: false,
        point: [104.160107, 30.831634],
        address: '四川省成都市新都区新都镇宝光街81号宝光寺'
      }
    };
  },
  components: { AMap, QQMap, BMap }
};
</script>
