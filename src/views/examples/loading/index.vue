<template>
  <div class="gc-panel">
    <div class="gc-panel__title">Loading 加载中</div>
    <sDivider></sDivider>
    <div class="gc-container">
      <div class="gc-container__title">状态请求</div>
      <sDivider></sDivider>
      <sButton type="info" @click="getData">请求接口</sButton>
      <sButton type="success" @click="handleLoading('loading')">加载中</sButton>
      <sButton type="error" @click="handleLoading('error')">服务端异常、网络超时异常</sButton>
      <mLoading :visible="loading" :reload="getData" />
    </div>
    <sDivider></sDivider>
    <div class="gc-container">
      <div class="gc-container__title">tree结构树hover方式更多操作,数据为mock模拟</div>
      <div class="gc-container__h1">
        是否切换为点击处理,默认为hover
        <sSwitch size="large" v-model="switch1" @on-change="onChange">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </sSwitch>
      </div>
      <sDivider></sDivider>
      <el-scrollbar wrap-class="gc-panel__scroll" view-class="gc-panel__list">
        <div ref="treeWrapper" class="gc-container__wrapper gc-tree">
          <sTree :data="treeData" :render="nodeRender"></sTree>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { getTreeCustomData } from '@/api';
import ElScrollbar from '@base/Scrollbar/main';
const customComp = () => import(/* webpackChunkName: "layout" */ './custom.vue');

export default {
  data() {
    return {
      loading: '',
      switch1: false,
      treeData: []
    };
  },
  created() {
    getTreeCustomData().then(res => {
      let treeMap = res.data.data.map((ele, index) => {
        if (index === 0) {
          ele.expand = true;
        }
        return ele;
      });
      this.treeData = treeMap;
    });
  },
  methods: {
    handleLoading(type) {
      this.loading = type;
    },
    getData() {
      this.loading = 'loading';
      this.$Message.success('请求成功');
      setTimeout(() => {
        this.loading = 'error';
      }, 1000);
    },
    nodeRender(h, { root, node, data }) {
      const _this = this;
      return h('span', [
        h(
          'span',
          {
            style: {
              marginRight: '5px'
            }
          },
          data.title
        ),
        h(
          customComp,
          {
            props: {
              trigger: _this.switch1 ? 'click' : 'hover',
              id: data.id
            },
            on: {
              onClick(val) {
                _this.$Message.info(`当前操作节点id为：${val}`);
              }
            }
          },
          ''
        )
      ]);
    },
    onChange(status) {
      this.$Message.info('开关状态：' + status);
    }
  },
  components: { customComp, ElScrollbar }
};
</script>

<style lang="less">
.gc-block {
  display: inline-block;
  & + .gc-block {
    margin-left: 15px;
  }
}
.ivu-btn {
  margin-right: 5px;
}
.gc-panel {
  &__scroll {
    height: 150px;
  }
}
</style>
