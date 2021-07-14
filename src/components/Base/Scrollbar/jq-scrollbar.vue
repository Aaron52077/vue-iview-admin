<template>
  <div class="gc-scrollbar">
    <div class="scrollbar-inner" :class="{ 'hide-bar': hide }" ref="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    hide: Boolean,
    config: {
      type: [Object],
      default: () => {
        return {};
      }
    }
  },
  mounted() {
    var el = this.$refs.container,
      vm = this;
    vm.dataBase.load(
      "jquery",
      "./plugins/scrollbar/jquery.scrollbar.css",
      "./plugins/scrollbar/jquery.scrollbar.min.js",
      () => {
        var $el = $(el);
        // 销毁滚动事件
        $el.scrollbar(this.config).on("$destroy", function() {
          $el.scrollbar("destroy");
        });
      }
    );
  }
};
</script>

<style lang="less">
.gc-scrollbar {
  height: 100%;
}
.scrollbar-inner {
  height: 100%;
  width: 100%;
}
.scrollbar-inner.hide-bar .scroll-element.scroll-y.scroll-scrolly_visible,
.scrollbar-inner.hide-bar .scroll-element.scroll-x.scroll-scrollx_visible,
.scrollbar-inner.hide-bar:hover .scroll-element.scroll-y.scroll-scrolly_visible,
.scrollbar-inner.hide-bar:hover .scroll-element.scroll-x.scroll-scrollx_visible {
  opacity: 0;
}
.scrollbar-inner > .scroll-element.scroll-x.scroll-scrollx_visible,
.scrollbar-inner > .scroll-element.scroll-y.scroll-scrolly_visible {
  opacity: 0;
  transition: opacity 1s;
}
.scrollbar-inner:hover > .scroll-element.scroll-x.scroll-scrollx_visible,
.scrollbar-inner:hover > .scroll-element.scroll-y.scroll-scrolly_visible {
  opacity: 1;
}
</style>
