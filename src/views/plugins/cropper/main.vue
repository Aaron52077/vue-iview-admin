<template>
  <div class="gc-panel">
    <div class="gc-panel__title">Cropper 图片裁剪组件</div>
    <sDivider></sDivider>
    <div class="gc-container" id="container">
      <sButton type="primary" size="large" @click="visible = true">头像上传</sButton>
      <sDivider></sDivider>
      <div class="gc-panel" v-show="imgUrl"><img :src="imgUrl" /></div>
      <mCropper v-model="visible" @on-cancel="cancelHandle" @on-ok="okHandle"></mCropper>
      <template v-if="!$route.meta.menuHide && dataBase.h5">
        <div class="gc-panel__h1">Dialog 弹出层</div>
        <sButton type="primary" size="large" @click="asyncHandle">异步关闭</sButton>
        <sButton type="info" size="large" @click="dialogVisible = true">组件调用</sButton>
      </template>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import mCropper from '@base/Cropper';
import { uploadFile } from '@/api';

export default {
  data() {
    return {
      visible: false,
      imgUrl: '',
      records: ''
    };
  },
  methods: {
    cancelHandle(data) {
      this.imgUrl = data.url;
    },
    okHandle(data) {
      this.imgUrl = data.url;
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传.xls,.xlsx文件。'
      });
    },
    handleSuccess(res, file) {
      if (res.errcode === 0) {
        this.dialoLead = false;
        this.$Message.success('数据导入成功！');
        this.$refs.upload.clearFiles();
      }
    }
  },
  components: { mCropper }
};
</script>
