
<template>
    <div class="container">
        <mBreadcrumb separator=">"></mBreadcrumb>
        <div class="gc-container">
            <div class="gc-container__title">适用于处理同级页面类导航面包屑</div>
            <router-link to="/api/page/children1">页面1</router-link>
            <router-link to="/api/page/children2">页面2</router-link>
        </div>
        <router-view class="gc-loyout" :key="active"></router-view>
    </div>
</template>

<script>
/* eslint-disable */
import mBreadcrumb from '@base/Breadcrumb'
export default {
    data () {
        return {
            active: '1'
        }
    },
    components: { mBreadcrumb }
}
</script>