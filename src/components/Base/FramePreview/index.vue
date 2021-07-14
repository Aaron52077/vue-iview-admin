<template>
  <div class="view-content__wrap" :class="{ 'view-content__pc': isPC }">
    <iframe v-if="src" width="100%" height="100%" :src="src"></iframe>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ""
    }
  },
  computed: {
    isPC() {
      // 'ELectron桌面应用' : 'web应用'
      return navigator.userAgent.indexOf("Electron") > -1;
    }
  }
};
</script>

<style lang="less" scoped>
.view-content__wrap {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 10px;
  width: 100%;
  z-index: 9;
  iframe {
    border: 0;
  }
  &.view-content__pc {
    top: 50px;
  }
}
</style>
