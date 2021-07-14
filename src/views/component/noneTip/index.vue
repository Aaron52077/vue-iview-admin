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
      <sDivider></sDivider>
      <div class="gc-container__title">正则过滤处理特殊变量字符串</div>
      <div class="gc-container__h1">
        处理前：{{ str }}&nbsp;&nbsp;&nbsp;处理后：{{ regVar(str, '120') }}
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { regVar } from '@/utils/validate';

export default {
  data() {
    return {
      str: '距离退休天数<=${value}天'
    };
  },
  methods: {
    regVar
  }
};
</script>

<style lang="less" scoped>
.gc-block {
  display: inline-block;
  & + .gc-block {
    margin-left: 15px;
  }
}
</style>
