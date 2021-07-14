<template>
  <div :class="['gc-scrollbar__bar', 'is-' + bar.key]" @mousedown="clickTrackHandler">
    <div
      ref="thumb"
      class="gc-scrollbar__thumb"
      @mousedown="this.clickThumbHandler"
      :style="renderThumbStyle({ size, move, bar })"
    ></div>
  </div>
</template>

<script>
import { onEvent, offEvent } from "@/utils";
const BAR_MAP = {
  vertical: {
    offset: "offsetHeight",
    scroll: "scrollTop",
    scrollSize: "scrollHeight",
    size: "height",
    key: "vertical",
    axis: "Y",
    client: "clientY",
    direction: "top"
  },
  horizontal: {
    offset: "offsetWidth",
    scroll: "scrollLeft",
    scrollSize: "scrollWidth",
    size: "width",
    key: "horizontal",
    axis: "X",
    client: "clientX",
    direction: "left"
  }
};

/* eslint-disable */
export default {
  name: "Bar",
  props: {
    vertical: Boolean,
    size: String,
    move: Number
  },
  computed: {
    bar() {
      return BAR_MAP[this.vertical ? "vertical" : "horizontal"];
    },
    wrap() {
      return this.$parent.wrap;
    }
  },
  methods: {
    clickThumbHandler(e) {
      // prevent click event of right button
      if (e.ctrlKey || e.button === 2) {
        return;
      }
      this.startDrag(e);
      this[this.bar.axis] =
        e.currentTarget[this.bar.offset] -
        (e[this.bar.client] - e.currentTarget.getBoundingClientRect()[this.bar.direction]);
    },
    clickTrackHandler(e) {
      const offset = Math.abs(
        e.target.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]
      );
      const thumbHalf = this.$refs.thumb[this.bar.offset] / 2;
      const thumbPositionPercentage = ((offset - thumbHalf) * 100) / this.$el[this.bar.offset];

      this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize]) / 100;
    },
    startDrag(e) {
      e.stopImmediatePropagation();
      this.cursorDown = true;

      onEvent(document, "mousemove", this.mouseMoveDocumentHandler);
      onEvent(document, "mouseup", this.mouseUpDocumentHandler);
      document.onselectstart = () => false;
    },
    mouseMoveDocumentHandler(e) {
      if (this.cursorDown === false) return;
      const prevPage = this[this.bar.axis];

      if (!prevPage) return;

      const offset =
        (this.$el.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]) * -1;
      const thumbClickPosition = this.$refs.thumb[this.bar.offset] - prevPage;
      const thumbPositionPercentage =
        ((offset - thumbClickPosition) * 100) / this.$el[this.bar.offset];

      this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize]) / 100;
    },
    mouseUpDocumentHandler(e) {
      this.cursorDown = false;
      this[this.bar.axis] = 0;
      offEvent(document, "mousemove", this.mouseMoveDocumentHandler);
      document.onselectstart = null;
    },
    renderThumbStyle({ move, size, bar }) {
      const style = {};
      const translate = `translate${bar.axis}(${move}%)`;
      style[bar.size] = size;
      style.transform = translate;
      style.msTransform = translate;
      style.webkitTransform = translate;
      return style;
    }
  },
  destroyed() {
    offEvent(document, "mouseup", this.mouseUpDocumentHandler);
  }
};
</script>
