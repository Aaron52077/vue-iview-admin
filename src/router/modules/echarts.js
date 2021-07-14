/* eslint-disable */
export default {
  path: "/echarts",
  meta: {
    module: "echarts",
    title: "可视化 BI"
  },
  redirect: "/echarts/exp",
  component: () => import("@/layout/index.vue"),
  children: [
    {
      path: "exp",
      name: "echarts-exp",
      component: () => import("@/views/echarts/exp/index.vue"),
      meta: {
        module: "echarts",
        title: "图表"
      }
    },
    {
      path: "bar",
      name: "echarts-bar",
      component: () => import("@/views/echarts/bar/index.vue"),
      meta: {
        module: "echarts",
        title: "柱状图"
      }
    },
    {
      path: "line",
      name: "echarts-line",
      component: () => import("@/views/echarts/line/index.vue"),
      meta: {
        module: "echarts",
        title: "线性图"
      }
    },
    {
      path: "radar",
      name: "echarts-radar",
      component: () => import("@/views/echarts/radar/index.vue"),
      meta: {
        module: "echarts",
        title: "雷达图"
      }
    },
    {
      path: "pie",
      name: "echarts-pie",
      component: () => import("@/views/echarts/pie/index.vue"),
      meta: {
        module: "echarts",
        title: "饼图"
      }
    },
    {
      path: "funnel",
      name: "echarts-funnel",
      component: () => import("@/views/echarts/funnel/index.vue"),
      meta: {
        module: "echarts",
        title: "漏斗图"
      }
    },
    {
      path: "map",
      name: "echarts-map",
      component: () => import("@/views/echarts/map/index.vue"),
      meta: {
        module: "echarts",
        title: "地理坐标系"
      }
    },
    {
      path: "gauge",
      name: "echarts-gauge",
      component: () => import("@/views/echarts/gauge/index.vue"),
      meta: {
        module: "echarts",
        title: "仪表盘"
      }
    },
    {
      path: "treemap",
      name: "echarts-treemap",
      component: () => import("@/views/echarts/treemap/index.vue"),
      meta: {
        module: "echarts",
        title: "面积图"
      }
    },
    {
      path: "boxplot",
      name: "echarts-boxplot",
      component: () => import("@/views/echarts/boxplot/index.vue"),
      meta: {
        module: "echarts",
        title: "灯箱图"
      }
    },
    {
      path: "scatter",
      name: "echarts-scatter",
      component: () => import("@/views/echarts/scatter/index.vue"),
      meta: {
        module: "echarts",
        title: "气泡图"
      }
    }
  ]
};
