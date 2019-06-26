<template>
    <div class="gc-panel">
        <div class="gc-panel__title">NoneTip 无提示</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <!-- 样式1 -->
            <div class="gc-container__title">样式1</div>
            <sDivider></sDivider>
            <mNoneTip :type="1" :offset-top="40">无记录</mNoneTip>
            <!-- 样式2 -->
            <div class="gc-container__title">样式2</div>
            <sDivider></sDivider>
            <mNoneTip :type="2" :offset-top="40">无记录</mNoneTip>
            <!-- <div>{{regxVar(str, value)}}</div> -->
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { regxVar } from '@/utils/validate';
export default {
    data () {
        return {
            str: '距离退休月份<=${value}月, ${value2}日',
            value: '3'
        }
    },
    methods: {
        regxVar,
    }
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/common/_mixins.less';
.gc-block {
    display: inline-block;
    & + .gc-block {
        margin-left: 15px;
    }
}
</style>
