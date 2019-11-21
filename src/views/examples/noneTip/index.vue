<template>
    <div class="gc-panel">
        <div class="gc-panel__title">NoneTip 无提示</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <mDropdownMenu :menu-list="menuList" @on-change="onChange">
                <template v-if="active == 0">
                    <div ref="wrap1" @click="onClick">内容1</div>
                </template>
                <template v-else-if="active == 1">
                    <div>内容2</div>
                </template>
                <template v-else-if="active == 2">
                    <div>内容3</div>
                </template>
                <template v-else>
                    <div>内容4</div>
                </template>
            </mDropdownMenu>
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
import mDropdownMenu from '@h5/DropdownMenu';

export default {
    data () {
        return {
            str: '距离退休月份<=${value}月, ${value2}日',
            active: null,
            menuList: [ 
                {
                    title: '区域',
                    value: 0 
                }, 
                {
                    title: '户型',
                    value: 1 
                },
                {
                    title: '面积',
                    value: 2
                }, 
                {
                    title: '智能排序',
                    value: 3
                }
            ]
        }
    },
    methods: {
        regxVar,
        onChange(data) {
            this.active = data
        },
        onClick() {
            // console.log(this.$parent.toggle())
            // this.$refs.wrap1.toggle();
        }
    },
    components: { mDropdownMenu }
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
