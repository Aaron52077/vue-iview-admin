<template>
    <div class="gc-panel">
        <div class="gc-panel__title">map 高德地图控件</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <div class="gc-container__title">地理位置获取 示例1 <sButton type="primary" @click="map1.open = true">戳一下试试</sButton></div>
            <sDivider></sDivider>
            <div class="gc-container__h1">数据：{{map1}}</div>
            <sDivider></sDivider>
            <div class="gc-container__title">地理位置获取 示例2 <sButton type="info" @click="map2.open = true">戳一下试试</sButton></div>
            <sDivider></sDivider>
            <div class="gc-container__h1">数据：{{map2}}</div>
        </div>
        <mMap v-model="map1" />
        <mMap v-model="map2" title="默认地址" />
    </div>
</template>

<script>
import mMap from '@base/Map'

export default {
    data () {
        return {
            map1: { open: false },
            map2: { open: false, point: [104.160107, 30.831634], address: "四川省成都市新都区新都镇宝光街81号宝光寺" }
        }
    },
    components:{ mMap }
}
</script>