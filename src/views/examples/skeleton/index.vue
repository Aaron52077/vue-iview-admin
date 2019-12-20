<template>
    <div class="gc-panel">
        <div class="gc-panel__title">Skeleton 骨架屏</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <!-- 样式1 -->
            <div class="gc-container__title">基本用法</div>
            <sDivider></sDivider>
            <mSkeleton title :row="3"></mSkeleton>
            <sDivider></sDivider>
            <div class="gc-container__title">显示头像</div>
            <sDivider></sDivider>
            <mSkeleton title avatar :avatarSize="40" :row="3" />
            <sDivider></sDivider>
            <div class="gc-container__title">显示子组件</div>
            <sSwitch v-model="show" style="margin-top: 10px;">
                <span slot="open">开</span>
                <span slot="close">关</span>
            </sSwitch>
            <sDivider></sDivider>
            <mSkeleton title avatar :row="3" :rowWidth="['70%', '80%', '100%']" :loading="!show">
                <div class="gc-container__title">
                    <img src="~@/assets/img/logo.png">
                    <div class="demo-content">
                        <h3>关于 wuli ui</h3>
                        <p>wuli ui 是一套轻量的 Vue 组件库，提供了丰富的基础组件和业务组件，帮助开发者快速搭建中后台应用。</p>
                    </div>
                </div>
            </mSkeleton>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    data () {
        return {
            show: false
        }
    },
    methods: {

    }
}
</script>