<template>
    <div class="gc-panel">
        <div class="gc-panel__title">Loading 加载中</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <div class="gc-container__title">状态请求</div>
            <sDivider></sDivider>
            <sButton type="info" @click="getData">请求接口</sButton>
            <sButton type="success" @click="handleLoading('loading')">加载中</sButton>
            <sButton type="error" @click="handleLoading('error')">服务端异常、网络超时异常</sButton>
            <mLoading :visible="loading" :reload="getData" />
        </div>
    </div>
</template>

<script>
import { setTimeout } from 'timers';
/* eslint-disable */
export default {
    data () {
        return {
            loading: ''
        }
    },
    methods: {
        handleLoading(type) {
            this.loading = type
        },
        getData() {
            this.loading = 'loading';
            this.$Message.success('请求成功');
            setTimeout(() => {
                this.loading = 'error';
            }, 1000);
        }
    }
}
</script>

<style lang="less" scoped>
.gc-block {
    display: inline-block;
    & + .gc-block {
        margin-left: 15px;
    }
}
.ivu-btn {
    margin-right: 5px;
}
</style>