/* eslint-disable */
import { debounce, onEvent, offEvent } from "@/utils";
// ps: 注销监听方式
// this.$on('hook:beforeDestroy', () => {
//     off(window, 'resize', this._resizeHandler)
//     this.$_sidebarElm && off(this.$_sidebarElm, 'transitionend', this.$_sidebarResizeHandler)
// });
export default {
  data() {
    return {
      $_sidebarElm: null
    };
  },
  /**
   * 图表自适应处理
   */
  mounted() {
    this._resizeHandler = debounce(() => {
      if (this.myChart) {
        this.myChart.resize();
      }
    }, 100);

    onEvent(window, "resize", this._resizeHandler);

    this.$_sidebarElm = document.getElementsByClassName("sidebar-container")[0];
    this.$_sidebarElm && onEvent(this.$_sidebarElm, "transitionend", this.$_sidebarResizeHandler);

    this.$on("hook:beforeDestroy", () => {
      offEvent(window, "resize", this._resizeHandler);
      this.$_sidebarElm && offEvent(this.$_sidebarElm, "transitionend", this.$_sidebarResizeHandler);
    });
    // ps: 等价于在生命周期beforeDestroy中的实现
    // beforeDestroy() {
    //     offEvent(window, 'resize', this._resizeHandler)
    //     this.$_sidebarElm && offEvent(this.$_sidebarElm, 'transitionend', this.$_sidebarResizeHandler)
    // },
  },
  methods: {
    /**
     * 实例对象
     * @param {any} args
     * @returns
     */
    echartInit(id) {
      const oDiv = document.getElementById(id);
      const myChart = this.$echarts.init(oDiv);
      return myChart;
    },
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_sidebarResizeHandler(e) {
      if (e.propertyName === "width") {
        this._resizeHandler();
      }
    }
  }
};
