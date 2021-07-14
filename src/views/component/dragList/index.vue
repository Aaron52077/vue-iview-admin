<template>
  <div class="gc-panel">
    <div class="gc-panel__title">DragList 拖拽列表组件</div>
    <sDivider></sDivider>
    <div class="gc-container darg-list">
      <div class="gc-container__title">通过Mock接口方式用法</div>
      <sDivider></sDivider>
      <sRow :gutter="16">
        <sCol :xs="24" :sm="24" :lg="12">
          <div class="darg-list__inline">
            <!-- 切记设置list1和list2属性时，一定要添加.sync修饰符 -->
            <mDragList
              :list1.sync="list1"
              :list2.sync="list2"
              :dropConClass="dropConClass"
              @on-change="handleChange"
            >
              <template v-slot:leftTitle>
                <h3>待办事项</h3>
              </template>
              <sCard class="drag-item" slot="left" slot-scope="left">{{
                left.itemLeft.name
              }}</sCard>
              <template v-slot:rightTitle>
                <h3>完成事项</h3>
              </template>
              <sCard class="drag-item" slot="right" slot-scope="right">{{
                right.itemRight.name
              }}</sCard>
            </mDragList>
          </div>
        </sCol>
        <sCol :xs="24" :sm="24" :lg="12">
          <div class="darg-list__inline">
            <sRow :gutter="5">
              <sCol :xs="24" :sm="24" :lg="12">
                <mScrollbar class="darg-list__inline">
                  <pre>{{ list1 }}</pre>
                </mScrollbar>
              </sCol>
              <sCol :xs="24" :sm="24" :lg="12">
                <mScrollbar class="darg-list__inline">
                  <pre>{{ list2 }}</pre>
                </mScrollbar>
              </sCol>
            </sRow>
          </div>
        </sCol>
      </sRow>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import mDragList from '@base/DragList';
import { getDragListData } from '@/api/index';

export default {
  name: 'dragListPage',
  data() {
    return {
      list1: [],
      list2: [],
      dropConClass: {
        left: ['drop-box', 'left-drop-box'],
        right: ['drop-box', 'right-drop-box']
      },
      handleList: []
    };
  },
  created() {
    this.getDragList();
  },
  methods: {
    getDragList() {
      getDragListData().then(res => {
        const {
          data: { list1, list2 }
        } = res;
        this.list1 = list1;
        this.list2 = list2;
      });
    },
    handleChange({ src, target, oldIndex, newIndex }) {
      this.handleList.push(`${src} => ${target}, ${oldIndex} => ${newIndex}`);
    }
  },
  components: { mDragList }
};
</script>

<style lang="less">
.ivu-tree {
  padding: 0 10px;
}
.darg-list {
  &__inline {
    width: 100%;
    height: 450px;
    p {
      padding: 14px 0;
      margin: 0 14px;
      border-bottom: 1px dashed #eeeeee;
    }
  }
  .drag-item {
    margin: 10px;
  }
  h3 {
    padding: 10px 15px;
  }
  .drop-box {
    width: 100%;
    height: 450px;
    border: 1px solid #eeeeee;
    border-radius: 5px;
  }
}
</style>
