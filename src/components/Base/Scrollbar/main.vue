<template>
  <div class="gc-scrollbar">
    <template v-if="!native">
      <div
        ref="wrap"
        :style="handleStyle"
        :class="[
          wrapClass,
          'gc-scrollbar__wrap',
          scrollbarWidth() ? '' : 'gc-scrollbar__wrap--hidden-default'
        ]"
        @scroll="handleScroll"
      >
        <div :class="['gc-scrollbar__view', viewClass]" :style="viewStyle" ref="resize">
          <slot></slot>
        </div>
      </div>
      <Bar :move="moveX" :size="sizeWidth"></Bar>
      <Bar vertical :move="moveY" :size="sizeHeight"></Bar>
    </template>
    <template v-else>
      <div ref="wrap" :style="handleStyle" :class="[wrapClass, 'gc-scrollbar__wrap']">
        <div :class="['gc-scrollbar__view', viewClass]" :style="viewStyle" ref="resize">
          <slot></slot>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { addResizeListener, removeResizeListener, toObject } from "./libs";
import Bar from "./bar.vue";

/* istanbul ignore next */
export default {
  name: "mScrollbar",
  components: { Bar },
  props: {
    native: Boolean,
    wrapStyle: {},
    wrapClass: {},
    viewClass: {},
    viewStyle: {},
    noresize: Boolean // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
  },
  data() {
    return {
      sizeWidth: "0",
      sizeHeight: "0",
      moveX: 0,
      moveY: 0
    };
  },
  computed: {
    wrap() {
      return this.$refs.wrap;
    }
  },
  methods: {
    handleScroll() {
      const wrap = this.wrap;

      this.moveY = (wrap.scrollTop * 100) / wrap.clientHeight;
      this.moveX = (wrap.scrollLeft * 100) / wrap.clientWidth;
    },
    update() {
      let heightPercentage, widthPercentage;
      const wrap = this.wrap;
      if (!wrap) return;

      heightPercentage = (wrap.clientHeight * 100) / wrap.scrollHeight;
      widthPercentage = (wrap.clientWidth * 100) / wrap.scrollWidth;

      this.sizeHeight = heightPercentage < 100 ? heightPercentage + "%" : "";
      this.sizeWidth = widthPercentage < 100 ? widthPercentage + "%" : "";
    },
    scrollbarWidth() {
      let scrollBarWidth;
      if (scrollBarWidth !== undefined) return scrollBarWidth;

      const outer = document.createElement("div");
      outer.className = "gc-scrollbar__wrap";
      outer.style.visibility = "hidden";
      outer.style.width = "100px";
      outer.style.position = "absolute";
      outer.style.top = "-9999px";
      document.body.appendChild(outer);

      const widthNoScroll = outer.offsetWidth;
      outer.style.overflow = "scroll";

      const inner = document.createElement("div");
      inner.style.width = "100%";
      outer.appendChild(inner);

      const widthWithScroll = inner.offsetWidth;
      outer.parentNode.removeChild(outer);
      scrollBarWidth = widthNoScroll - widthWithScroll;

      return scrollBarWidth;
    },
    handleStyle() {
      let gutter = this.scrollbarWidth();
      let style = this.wrapStyle;

      if (gutter) {
        const gutterWith = `-${gutter}px`;
        const gutterStyle = `margin-bottom: ${gutterWith}; margin-right: ${gutterWith};`;

        if (Array.isArray(this.wrapStyle)) {
          style = toObject(this.wrapStyle);
          style.marginRight = style.marginBottom = gutterWith;
        } else if (typeof this.wrapStyle === "string") {
          style += gutterStyle;
        } else {
          style = gutterStyle;
        }
      }
      return style;
    }
  },
  mounted() {
    if (this.native) return;
    this.$nextTick(this.update);
    !this.noresize && addResizeListener(this.$refs.resize, this.update);
  },
  beforeDestroy() {
    if (this.native) return;
    !this.noresize && removeResizeListener(this.$refs.resize, this.update);
  }
};
</script>

<style lang="less">
/* Scrollbar
 -------------------------- */
.gc-scrollbar {
  overflow: hidden;
  position: relative;
  &__wrap {
    overflow: scroll;
    height: 100%;
    &--hidden-default {
      scrollbar-width: none;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    }
  }
  &__bar {
    position: absolute;
    right: 2px;
    bottom: 2px;
    z-index: 1;
    border-radius: 4px;
    opacity: 0;
    transition: opacity 0.12s ease-out;
    &.is-horizontal {
      height: 6px;
      left: 2px;
      > div {
        height: 100%;
      }
    }
    &.is-vertical {
      width: 6px;
      top: 2px;
      > div {
        width: 100%;
      }
    }
  }
  &__thumb {
    position: relative;
    display: block;
    width: 0;
    height: 0;
    cursor: pointer;
    border-radius: inherit;
    background-color: rgba(144, 147, 153, 0.3);
    transition: background-color 0.3s;
  }
  &::-webkit-scrollbar {
    z-index: 99;
    width: 8px;
    &:horizontal {
      height: 8px;
    }
    &-thumb {
      border-radius: 5px;
      width: 8px;
      background: #b4bccc;
    }
    &-corner {
      background: @--color-white;
    }
    &-track {
      background: @--color-white;

      &-piece {
        background: @--color-white;
        width: 8px;
      }
    }
  }
  &:hover,
  &:active,
  &:focus {
    > .gc-scrollbar__bar {
      opacity: 1;
      transition: opacity 340ms ease-out;
    }
  }
}
</style>
