<template>
    <div class="container">
        <mBreadcrumb separator=">"></mBreadcrumb>
        <div class="gc-container">
            <div class="gc-container__title">适用于处理同级页面类导航面包屑</div>
            <div>子页面2</div>
            <sDivider></sDivider>
            <sButton type="primary" style="margin-right: 5px;" @click="setCookie">设置auth_token</sButton>
            <sButton type="primary" style="margin-right: 5px;" :disabled="!disabled" @click="getCookie">获取auth_token</sButton>
            <sButton type="primary" style="margin-right: 5px;" :disabled="!disabled" @click="delCookie">删除auth_token</sButton>
            <div>{{authToken}}</div>
            <sDivider></sDivider>
            <mIframe></mIframe>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import mBreadcrumb from '@base/Breadcrumb'
import cache from '@/utils/cache'
import { mockToken } from '@/utils'
import mIframe from '@/views/examples/iframe/main.vue'

export default {
    data () {
        return {
            authToken: '',
            disabled: false
        }
    },
    methods: {
        setCookie() {
            this.disabled = true
            cache.setCookie('auth_token', mockToken(), 1)
        },
        getCookie() {
            this.authToken = cache.getCookie('auth_token')
        },
        delCookie() {
            this.authToken = cache.delCookie('auth_token')
        }
    },
    components: { mBreadcrumb, mIframe }
}
</script>