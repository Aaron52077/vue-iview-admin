
<template>
    <div class="container">
        <div class="gc-panel__title">Cropper 图片裁剪组件</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <sButton type="primary" size="large" @click="visible = true">头像上传</sButton>
            <sDivider></sDivider>
            <div class="gc-panel" v-show="imgUrl"><img :src="imgUrl" /></div>
            <mCropper v-model="visible" @on-cancel="cancelHandle" @on-ok="okHandle"></mCropper>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import mCropper from '@base/Cropper'
export default {
    data () {
        return {
            visible: false,
            imgUrl: ''
        }
    },
    methods: {
        cancelHandle(data) {
            this.imgUrl = data.url
        },
        okHandle(data) {
            this.imgUrl = data.url
        }  
    },
    components: { mCropper }
}
</script>