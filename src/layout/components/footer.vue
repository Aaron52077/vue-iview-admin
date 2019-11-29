<template>
    <van-tabbar
        class="gc-tabbar"
        active-color="#3E6DE3"
        inactive-color="#000" 
        safe-area-inset-bottom
        route>
        <van-tabbar-item 
            v-for="(item,index) in navList"
            :key="index" 
            replace 
            :to="item.path" 
            :name="item.name">
            <span>{{item.name}}</span>
            <sIcon slot="icon" :type="item.icon" />
        </van-tabbar-item>
    </van-tabbar>
</template>
<script>
/* eslint-disable */
import { navList } from '../config'

export default {
    name: 'layout-main-footer',
    data() {
        return {
            navList
        }
    }
}
</script>
<style lang="less">
.gc-h5 {
    .ivu-menu-vertical .ivu-menu-item-group-title {
        padding-left: 0;
        text-align: center;
    }
    .ivu-menu-item-group > ul {
        text-align: center;
    }
}
</style>