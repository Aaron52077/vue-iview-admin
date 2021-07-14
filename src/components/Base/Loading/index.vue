<template>
  <div v-if="visible">
    <div class="gc-loading" :style="{ paddingTop: `${offsetTop}px` }">
      <template v-if="visible === 'loading'">
        <div class="gc-loading__spin">
          <div class="gc-loading__box--spinner">
            <i></i><i></i><i></i><i></i> <i></i><i></i><i></i><i></i> <i></i><i></i><i></i><i></i>
          </div>
        </div>
        <div class="gc-loading__tip">{{ loadingText }}</div>
      </template>
      <template v-else-if="visible === 'error'">
        <div class="gc-loading__box" @click="reload">
          <sIcon type="ios-sync" size="30" />
        </div>
        <div class="gc-loading__tip">{{ errorText }}</div>
      </template>
    </div>
  </div>
</template>

<script>
/**
 * m-loading   加载动画
 * @module components/loading
 * @desc 顶部导航
 * @param {String, Number} [size] - 图标大小
 * @param {string} [loadingText, errorText] - 自定义提示文字
 * @param {string} [offsetTop] - 距离顶部距离
 * @param {function} [reload] - 重加载回调
 * @example
 */
export default {
  props: {
    visible: String,
    loadingText: {
      type: String,
      default: "数据加载中..."
    },
    errorText: {
      type: String,
      default: "请求超时，点击重新加载"
    },
    reload: Function,
    offsetTop: {
      type: [Number, String],
      default: 150
    }
  }
};
</script>

<style lang="less" scoped>
.gc-loading {
  position: relative;
  width: 100%;
  text-align: center;
  vertical-align: middle;
  &__tip {
    padding-top: 10px;
    font-size: 12px;
  }
  &__spin {
    position: relative;
    display: inline-block;
    width: 30px;
    // compatible for 1.x, users may set width or height in root element
    max-width: 100%;
    height: 30px;
    max-height: 100%;
    vertical-align: middle;
    /*动画时间1s，线性变化，无限循环*/
    animation: wuli-rotate 1s linear infinite;
    animation-timing-function: steps(12);
    i {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: #1989fa;
      &::before {
        content: "";
        display: block;
        width: 2px;
        height: 25%;
        margin: 0 auto;
        background-color: currentColor;
        border-radius: 40%;
      }
    }
  }
  &__box {
    position: relative;
    display: inline-block;
    width: 30px;
    // compatible for 1.x, users may set width or height in root element
    max-width: 100%;
    height: 30px;
    max-height: 100%;
    vertical-align: middle;
  }
}

.generate-spinner(@n, @i: 1) when (@i =< @n) {
  .gc-loading__box--spinner i:nth-of-type(@{i}) {
    transform: rotate(@i * 30deg);
    opacity: 1 - (0.75 / 12) * (@i - 1);
  }
  .generate-spinner(@n, (@i + 1));
}
.generate-spinner(12);

@keyframes wuli-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
