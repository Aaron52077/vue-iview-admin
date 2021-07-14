<template>
  <div ref="wrap">
    <div :style="leftSwitch" v-if="navigation" :class="leftSwitchClass" @click="leftSwitchClick">
      <slot name="left-switch"></slot>
    </div>
    <div :style="rightSwitch" v-if="navigation" :class="rightSwitchClass" @click="rightSwitchClick">
      <slot name="right-switch"></slot>
    </div>
    <div
      ref="realBox"
      :style="pos"
      @mouseenter="enterHandle"
      @mouseleave="leaveHandle"
      @touchstart="touchStartHandle"
      @touchmove="touchMoveHandle"
      @touchend="touchEndHandle"
    >
      <div ref="slotList" :style="float">
        <slot></slot>
      </div>
      <div v-html="copyHtml" :style="float"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { requestAnimationFrame, cancelAnimationFrame } from "@/utils/RAFrame";
import { arrayEqual } from "@/utils/helper";

export default {
  name: "seamless-scroll",
  data() {
    return {
      xPos: 0,
      yPos: 0,
      delay: 0,
      copyHtml: "",
      height: 0,
      width: 0, // 外容器宽度
      realBoxWidth: 0, // 内容实际宽度
      reqFrame: null, // move动画的animationFrame定时器
      singleWaitTime: null, // single 单步滚动的定时器
      isHover: false
    };
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    step: {
      type: Number,
      default: 1 // 步长
    },
    limitMoveNum: {
      type: Number,
      default: 10 // 启动无缝滚动最小数据数
    },
    hoverStop: {
      type: Boolean,
      default: true // 是否启用鼠标hover控制
    },
    direction: {
      type: Number,
      default: 1 // 0 往下 1 往上 2向左 3向右
    },
    openTouch: {
      type: Boolean,
      default: true // 开启移动端touch
    },
    singleHeight: {
      type: Number,
      default: 0 // 单条数据高度有值hoverStop关闭
    },
    singleWidth: {
      type: Number,
      default: 0 // 单条数据宽度有值hoverStop关闭
    },
    waitTime: {
      type: Number,
      default: 1000 // 单步停止等待时间
    },
    switchOffset: {
      type: Number,
      default: 30
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    navigation: {
      type: Boolean,
      default: false
    },
    switchSingleStep: {
      type: Number,
      default: 134
    },
    switchDelay: {
      type: Number,
      default: 400
    },
    isSingleRemUnit: {
      type: Boolean,
      default: false // singleWidth/singleHeight 是否开启rem度量
    },
    switchDisabledClass: {
      type: String,
      default: "disabled"
    }
  },
  computed: {
    leftSwitchState() {
      return this.xPos < 0;
    },
    rightSwitchState() {
      return Math.abs(this.xPos) < this.realBoxWidth - this.width;
    },
    leftSwitchClass() {
      return this.leftSwitchState ? "" : this.switchDisabledClass;
    },
    rightSwitchClass() {
      return this.rightSwitchState ? "" : this.switchDisabledClass;
    },
    leftSwitch() {
      return {
        position: "absolute",
        margin: `${this.height / 2}px 0 0 -${this.switchOffset}px`,
        transform: "translate(-100%, -50%)"
      };
    },
    rightSwitch() {
      return {
        position: "absolute",
        margin: `${this.height / 2}px 0 0 ${this.width + this.switchOffset}px`,
        transform: "translateY(-50%)"
      };
    },
    float() {
      return this.isHorizontal ? { float: "left", overflow: "hidden" } : { overflow: "hidden" };
    },
    pos() {
      return {
        transform: `translate(${this.xPos}px,${this.yPos}px)`,
        transition: `all ${this.ease || "ease-in"} ${this.delay}ms`,
        overflow: "hidden"
      };
    },
    isAutoPlay() {
      if (this.navigation) return false;
      return this.autoPlay;
    },
    scrollSwitch() {
      return this.data.length >= this.limitMoveNum;
    },
    hoverStopSwitch() {
      return this.hoverStop && this.isAutoPlay && this.scrollSwitch;
    },
    canTouchScroll() {
      return this.openTouch;
    },
    isHorizontal() {
      return this.direction > 1;
    },
    baseFontSize() {
      return this.isSingleRemUnit
        ? parseInt(window.getComputedStyle(document.documentElement, null).fontSize)
        : 1;
    },
    realSingleStopWidth() {
      return this.singleWidth * this.baseFontSize;
    },
    realSingleStopHeight() {
      return this.singleHeight * this.baseFontSize;
    },
    steps() {
      let singleStep;
      let step = this.step;
      if (this.isHorizontal) {
        singleStep = this.realSingleStopWidth;
      } else {
        singleStep = this.realSingleStopHeight;
      }
      if (singleStep > 0 && singleStep % step > 0) {
        console.error(
          "如果设置了单步滚动,step需是单步大小的约数,否则无法保证单步滚动结束的位置是否准确。~~~~~"
        );
      }
      return step;
    }
  },
  methods: {
    leftSwitchClick() {
      if (!this.leftSwitchState) return;
      // 小于单步距离
      if (Math.abs(this.xPos) < this.switchSingleStep) {
        this.xPos = 0;
        return;
      }
      this.xPos += this.switchSingleStep;
    },
    rightSwitchClick() {
      if (!this.rightSwitchState) return;
      // 小于单步距离
      if (this.realBoxWidth - this.width + this.xPos < this.switchSingleStep) {
        this.xPos = this.width - this.realBoxWidth;
        return;
      }
      this.xPos -= this.switchSingleStep;
    },
    cancleHandle() {
      cancelAnimationFrame(this.reqFrame || "");
    },
    touchStartHandle(e) {
      if (!this.canTouchScroll) return;
      let timer;
      const touch = e.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
      const { waitTime, singleHeight, singleWidth } = this;
      this.startPos = {
        x: touch.pageX,
        y: touch.pageY
      }; //取第一个touch的坐标值
      this.startPosY = this.yPos; //记录touchStartHandle时候的posY
      this.startPosX = this.xPos; //记录touchStartHandle时候的posX
      if (!!singleHeight && !!singleWidth) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          this.cancleHandle();
        }, waitTime + 20);
      } else {
        this.cancleHandle();
      }
    },
    touchMoveHandle(e) {
      //当屏幕有多个touch或者页面被缩放过，就不执行move操作
      if (!this.canTouchScroll || e.targetTouches.length > 1 || (e.scale && e.scale !== 1)) return;
      const touch = e.targetTouches[0];
      const direction = this.direction;
      this.endPos = {
        x: touch.pageX - this.startPos.x,
        y: touch.pageY - this.startPos.y
      };
      event.preventDefault(); // 阻止触摸事件的默认行为，即阻止滚屏
      const dir = Math.abs(this.endPos.x) < Math.abs(this.endPos.y) ? 1 : 0; // dir，1表示纵向滑动，0为横向滑动
      if (dir === 1 && direction < 2) {
        // 表示纵向滑动 && 运动方向为上下
        this.yPos = this.startPosY + this.endPos.y;
      } else if (dir === 0 && direction > 1) {
        // 为横向滑动 && 运动方向为左右
        this.xPos = this.startPosX + this.endPos.x;
      }
    },
    touchEndHandle() {
      if (!this.canTouchScroll) return;
      let timer;
      const direction = this.direction;
      this.delay = 50;
      if (direction === 1) {
        if (this.yPos > 0) this.yPos = 0;
      } else if (direction === 0) {
        let h = (this.realBoxHeight / 2) * -1;
        if (this.yPos < h) this.yPos = h;
      } else if (direction === 2) {
        if (this.xPos > 0) this.xPos = 0;
      } else if (direction === 3) {
        let w = this.realBoxWidth * -1;
        if (this.xPos < w) this.xPos = w;
      }
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        this.delay = 0;
        this.moveHandle();
      }, this.delay);
    },
    enterHandle() {
      if (this.hoverStopSwitch) {
        this.isHover = true; //关闭moveHandle
        // 防止频频hover进出单步滚动,导致定时器乱掉
        if (this.singleWaitTime) clearTimeout(this.singleWaitTime);
        this.cancleHandle();
      }
    },
    leaveHandle() {
      if (this.hoverStopSwitch) {
        this.isHover = false; //开启moveHandle
        this.moveHandle();
      }
    },
    moveHandle() {
      // 鼠标移入时拦截moveHandle()
      if (this.isHover) return;
      this.cancleHandle(); //进入move立即先清除动画 防止频繁touchMoveHandle导致多动画同时进行
      this.reqFrame = requestAnimationFrame(() => {
        const h = this.realBoxHeight / 2; // 实际高度
        const w = this.realBoxWidth / 2; // 宽度
        let { steps, direction, waitTime } = this;
        if (direction === 1) {
          // 上
          if (Math.abs(this.yPos) >= h) {
            this.$emit("ScrollEnd");
            this.yPos = 0;
          }
          this.yPos -= steps;
        } else if (direction === 0) {
          // 下
          if (this.yPos >= 0) {
            this.$emit("ScrollEnd");
            this.yPos = h * -1;
          }
          this.yPos += steps;
        } else if (direction === 2) {
          // 左
          if (Math.abs(this.xPos) >= w) {
            this.$emit("ScrollEnd");
            this.xPos = 0;
          }
          this.xPos -= steps;
        } else if (direction === 3) {
          // 右
          if (this.xPos >= 0) {
            this.$emit("ScrollEnd");
            this.xPos = w * -1;
          }
          this.xPos += steps;
        }
        if (this.singleWaitTime) clearTimeout(this.singleWaitTime);
        if (!!this.realSingleStopHeight) {
          //是否启动了单行暂停配置
          if (Math.abs(this.yPos) % this.realSingleStopHeight < steps) {
            // 符合条件暂停waitTime
            this.singleWaitTime = setTimeout(() => {
              this.moveHandle();
            }, waitTime);
          } else {
            this.moveHandle();
          }
        } else if (!!this.realSingleStopWidth) {
          if (Math.abs(this.xPos) % this.realSingleStopWidth < steps) {
            // 符合条件暂停waitTime
            this.singleWaitTime = setTimeout(() => {
              this.moveHandle();
            }, waitTime);
          } else {
            this.moveHandle();
          }
        } else {
          this.moveHandle();
        }
      });
    },
    initMove() {
      this.$nextTick(() => {
        this.copyHtml = ""; //清空copy
        this.height = this.$refs.wrap.offsetHeight;
        this.width = this.$refs.wrap.offsetWidth;
        let slotListWidth = this.$refs.slotList.offsetWidth;
        let { switchDelay } = this;
        const { isAutoPlay, isHorizontal } = this;
        // 水平滚动设置warp width
        if (isHorizontal && isAutoPlay) {
          // 修正offsetWidth四舍五入
          slotListWidth = slotListWidth * 2 + 1;
        }
        this.$refs.realBox.style.width = slotListWidth + "px";
        this.realBoxWidth = slotListWidth;
        if (!isAutoPlay) {
          this.ease = "linear";
          this.delay = switchDelay;
          return;
        }
        // 是否可以滚动判断
        if (this.scrollSwitch) {
          let timer;
          if (timer) clearTimeout(timer);
          this.copyHtml = this.$refs.slotList.innerHTML;
          setTimeout(() => {
            this.realBoxHeight = this.$refs.realBox.offsetHeight;
            this.moveHandle();
          }, 0);
        } else {
          this.cancleHandle();
          this.yPos = this.xPos = 0;
        }
      });
    }
  },
  mounted() {
    this.initMove();
  },
  beforeDestroy() {
    this.cancleHandle();
  },
  watch: {
    data(val, oldVal) {
      // 监听data是否有变更
      if (!arrayEqual(val, oldVal)) {
        this.cancleHandle();
        this.initMove();
      }
    }
  }
};
</script>
