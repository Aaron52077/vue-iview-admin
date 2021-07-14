/* eslint-disable */
export default {
  path: "",
  meta: {
    module: "docs",
    title: "组件栏",
    menuHide: true
  },
  redirect: "dashboard",
  component: () => import("@/layout/index.vue"),
  children: [
    {
      path: "dashboard",
      name: "dashboard",
      component: () => import("@/views/component/dashboard/index.vue"),
      meta: {
        module: "docs",
        title: "主页",
        affix: true
      }
    },
    {
      path: "icons",
      name: "compicons",
      component: () => import("@/views/component/icon/index.vue"),
      meta: {
        module: "docs",
        title: "图标"
      }
    },
    {
      path: "avatar",
      name: "compavatar",
      component: () => import("@/views/component/avatar/index.vue"),
      meta: {
        module: "docs",
        title: "头像"
      }
    },
    {
      path: "loading",
      name: "comploading",
      component: () => import("@/views/component/loading/index.vue"),
      meta: {
        module: "docs",
        title: "加载中"
      }
    },
    {
      path: "noneTip",
      name: "compnoneTip",
      component: () => import("@/views/component/noneTip/index.vue"),
      meta: {
        module: "docs",
        title: "无记录"
      }
    },
    {
      path: "timePicker",
      name: "comptimePicker",
      component: () => import("@/views/component/timePicker/index.vue"),
      meta: {
        module: "docs",
        title: "时间控件"
      }
    },
    {
      path: "treeSelect",
      name: "comptreeSelect",
      component: () => import("@/views/component/treeSelect/index.vue"),
      meta: {
        module: "docs",
        title: "树状下拉选择器"
      }
    },
    {
      path: "dragList",
      name: "compdragList",
      component: () => import("@/views/component/dragList/index.vue"),
      meta: {
        module: "docs",
        title: "拖拽列表"
      }
    },
    {
      path: "dragDrawer",
      name: "compdragDrawer",
      component: () => import("@/views/component/dragDrawer/index.vue"),
      meta: {
        module: "docs",
        title: "拖拽抽屉"
      }
    },
    {
      path: "skeleton",
      name: "compskeleton",
      component: () => import("@/views/component/skeleton/index.vue"),
      meta: {
        module: "docs",
        title: "骨架屏"
      }
    },
    {
      path: "vlist",
      name: "compvlist",
      component: () => import("@/views/component/vlist/index.vue"),
      meta: {
        module: "docs",
        title: "虚拟列表"
      }
    },
    {
      path: "docPreview",
      name: "compdocPreview",
      component: () => import("@/views/component/docPreview/index.vue"),
      meta: {
        module: "docs",
        title: "文件预览"
      }
    },
    {
      path: "videoPreview",
      name: "compvideoPreview",
      component: () => import("@/views/component/video/index.vue"),
      meta: {
        module: "docs",
        title: "视频预览"
      }
    },
    {
      path: "map",
      name: "compmap",
      component: () => import("@/views/component/map/index.vue"),
      meta: {
        module: "docs",
        title: "地图坐标拾取器"
      }
    },
    {
      path: "countTo",
      name: "comcountTo",
      component: () => import("@/views/component/countTo/index.vue"),
      meta: {
        module: "docs",
        title: "动态赋值"
      }
    },
    {
      path: "seamless",
      name: "comseamless",
      component: () => import("@/views/component/seamless/index.vue"),
      meta: {
        module: "docs",
        title: "无缝滚动"
      }
    }
  ]
};
