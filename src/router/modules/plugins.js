/* eslint-disable */
export default {
  path: "/api",
  meta: {
    module: "api",
    title: "API"
  },
  redirect: "/api/util",
  component: () => import("@/layout/index.vue"),
  children: [
    {
      path: "util",
      name: "api-util",
      component: () => import("@/views/plugins/util/main.vue"),
      meta: {
        module: "api",
        title: "工具合集"
      }
    },
    {
      path: "editor",
      name: "api-editor",
      component: () => import("@/views/plugins/editor/main.vue"),
      meta: {
        module: "api",
        title: "富文本"
      }
    },
    {
      path: "cropper",
      name: "api-cropper",
      component: () => import("@/views/plugins/cropper/main.vue"),
      meta: {
        module: "api",
        title: "图片裁剪"
      }
    },
    {
      path: "grid",
      name: "api-grid",
      component: () => import("@/views/plugins/grid/main.vue"),
      meta: {
        module: "api",
        title: "拖拽式布局"
      }
    },
    {
      path: "calculator",
      name: "api-calculator",
      component: () => import("@/views/plugins/calculator/main.vue"),
      meta: {
        module: "api",
        title: "贷款计算器"
      }
    },
    {
      path: "jsonview",
      name: "api-jsonview",
      component: () => import("@/views/plugins/elementDesign/jsonview.vue"),
      meta: {
        module: "api",
        title: "json-view 面板"
      }
    },
    {
      path: "mockproxy",
      name: "api-mockproxy",
      component: () => import("@/views/plugins/elementDesign/mockProxy.vue"),
      meta: {
        module: "api",
        title: "第三方接口代理"
      }
    },
    {
      path: "animatedbook",
      name: "api-animatedbook",
      component: () => import("@/views/plugins/elementDesign/animatedBook.vue"),
      meta: {
        module: "api",
        title: "图书集"
      }
    }
  ]
};
