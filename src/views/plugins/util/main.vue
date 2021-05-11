<template>
  <div class="container">
    <div class="gc-container gc-table">
      <div class="gc-container__h1">Table 自定义表头筛选、合并单元格实例</div>
      <sDivider></sDivider>
      <sTable max-height="300" border :columns="columns1" :data="data1" :span-method="handleSpan" />
      <sDivider></sDivider>
      <div class="gc-container__h1">Table 跨分页全选/多选</div>
      <div class="gc-container__title">tips: 年龄列列为自定义实例，地址列为官方实例</div>
      <sTable
        size="default"
        ref="selection"
        :columns="columns2"
        :data="data2"
        highlight-row
        @on-select-all-cancel="handleCancelSelectAll"
        @on-select-all="handleSelectAll"
        @on-select="handleSelect"
        @on-select-cancel="handleCancel"
      />
      <div class="gc-pages" style="margin-top: 10px;">
        <sPage :total="20" :current="1" size="small" show-elevator show-total @on-change="changePage"></sPage>
      </div>
      <sDivider></sDivider>
      <sRow :gutter="16">
        <sCol span="6" class="gc-tree">
          <div class="gc-container__h1">系统级后台权限id获取</div>
          <sTree ref="permissionTree" :data="treeData" show-checkbox multiple></sTree>
          <div class="tree">
            <sButton type="primary" class="tree-inline" @click="getNodeId">获取节点id</sButton
            ><sButton type="primary" class="tree-inline" @click="getNodePid">获取节点所有父级id</sButton>
          </div>
          <div class="gc-container__title">勾选节点id：{{ id }}</div>
          <div class="gc-container__title">勾选节点id、当前节点父级id集合：{{ parentIds }}</div>
        </sCol>
        <sCol span="12">
          <div class="gc-container__h1">指令-复制</div>
          <sInput v-model="inputVal" style="width: 60%; z-index: 0;">
            <sButton slot="append" v-clipboard="clipOptions">复制</sButton>
          </sInput>
          <div class="gc-container__h1" style="margin-top: 10px;">指令-水波纹</div>
          <sButton v-waves @click.native="clickHandle">Default</sButton>
          <sButton type="primary" v-waves class="inline" @click.native="clickHandle">Primary</sButton>
          <sButton type="dashed" v-waves class="inline" @click.native="clickHandle">Dashed</sButton>
          <sButton type="text" v-waves class="inline" @click.native="clickHandle">Text</sButton>
          <br /><br />
          <sButton type="info" v-waves class="inline" @click.native="clickHandle">Info</sButton>
          <sButton type="success" v-waves class="inline" @click.native="clickHandle">Success</sButton>
          <sButton type="warning" v-waves class="inline" @click.native="clickHandle">Warning</sButton>
          <sButton type="error" v-waves class="inline" @click.native="clickHandle">Error</sButton>
        </sCol>
      </sRow>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { remove, uniqBy, differenceBy } from "lodash";
import mBreadcrumb from "@base/Breadcrumb";
import { mockTable, getTreeCustomData } from "@/api";
import { uniqueSimple } from "@/utils";
import { tableTemp } from "./table.js";

const headCustom = () => import(/* webpackChunkName: "layout" */ "./filter_custom.vue");

export default {
  data() {
    return {
      selectList: [],
      treeData: [],
      parentIds: [],
      id: [],
      inputVal: "输入的内容",
      loadFalg: false,
      data2: tableTemp.data1,
      columns2: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Status",
          key: "status",
          render: (h, params) => {
            const row = params.row;
            const color = row.status === 1 ? "primary" : row.status === 2 ? "success" : "error";
            const text = row.status === 1 ? "Working" : row.status === 2 ? "Success" : "Fail";

            return h(
              "sTag",
              {
                props: {
                  type: "dot",
                  color: color
                }
              },
              text
            );
          }
        },
        {
          title: "Sampling Time",
          key: "time",
          render: (h, params) => {
            return h("span", "Almost" + params.row.time + "天");
          }
        },
        {
          title: "Updated Time",
          key: "update",
          render: (h, params) => {
            let date = this.dataBase.dateToStr(params.row.update, "yyyy-MM-dd");
            return h("span", date);
          }
        }
      ],
      columns1: [
        {
          title: "名字",
          key: "name"
        },
        {
          title: "年龄",
          key: "age",
          renderHeader: (h, params) => {
            const _this = this;
            //  style: { whiteSpace: 'normal', wordBreak: 'break-all' }
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "5px"
                  }
                },
                "年龄"
              ),
              h(
                headCustom,
                {
                  props: {
                    tree: [
                      {
                        id: "A",
                        name: "阿西吧"
                      },
                      {
                        id: "B",
                        name: "逼逼叨"
                      }
                    ]
                  },
                  on: {
                    onClick(val) {
                      _this.$Message.info(val);
                    }
                  }
                },
                ""
              )
            ]);
          },
          className: "table-custom1"
        },
        {
          title: "地址",
          key: "address",
          tooltip: true,
          filters: [
            {
              label: "大于18岁",
              value: 1
            },
            {
              label: "小于18岁",
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 1) {
              return row.age > 18;
            } else if (value === 2) {
              return row.age <= 18;
            }
          }
        }
      ],
      data1: []
    };
  },
  created() {
    this.getMockTable();
  },
  methods: {
    getMockTable() {
      mockTable().then((res) => {
        this.data1 = res.data;
      });
      getTreeCustomData().then((res) => {
        let treeMap = res.data.data.map((ele, index) => {
          if (index === 0) {
            ele.expand = true;
          }
          return ele;
        });
        this.treeData = treeMap;
      });
    },
    getNodeId() {
      const checkedNodes = this.$refs.permissionTree.getCheckedNodes();
      let tmpIds = [];
      checkedNodes.map((item) => {
        tmpIds = tmpIds.concat(item.id);
      });
      this.id = tmpIds;
    },
    getNodePid() {
      const checkedNodes = this.$refs.permissionTree.getCheckedNodes();
      /* 获取选中项的所有父级 */
      let tmpIds = [];
      checkedNodes.map((item) => {
        const parents = this.getParentIds(this.treeData, item.id);
        tmpIds = tmpIds.concat(parents);
      });

      checkedNodes.map((item) => {
        tmpIds.push(item.id);
      });

      /* 去重，checkNodeIds即为选中所有节点的id集合 */
      this.parentIds = uniqueSimple(tmpIds);
    },
    /**
     * 获取某节点的所有父节点
     */
    getParentIds(data, id) {
      let ids = [];
      function loop(json) {
        for (const obj of json) {
          if (obj.children && obj.children.length > 0) {
            if (JSON.stringify(obj).match(id)) {
              ids.push(obj.id);
            }
            if (obj.id !== id) {
              loop(obj.children);
            } else {
              break;
            }
          }
        }
      }
      loop(data);
      return ids;
    },
    clickHandle() {
      this.$Notice.info({
        title: "水波纹指令",
        desc: "触发水波纹"
      });
    },
    changePage(page) {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      if (page == 1) {
        this.data2 = tableTemp.data1;
      } else {
        this.data2 = tableTemp.data2;
      }
      this.updateChecked();
    },
    handleCancel(selection, row) {
      //从已选项中去除取消项
      remove(this.selectList, (n) => {
        return n.id === row.id;
      });
    },
    handleSelect(selection, row) {
      // 添加到已选项
      this.selectList.push(row);
    },
    handleSelectAll(selection) {
      // 数组合并，有可能用户先选择了某几项，已经被我们push进去，因此数组合并需要去重一下
      this.selectList = uniqBy(this.selectList.concat(selection), "id");
    },
    handleCancelSelectAll(selection) {
      // 从已选项中移除当页数据
      this.selectList = differenceBy(this.selectList, this.data2, "id");
    },
    updateChecked() {
      // 把源数据加上_checked字段，遍历已选项数据，更新选中状态
      const temp = this.dataBase.cloneDeep(this.data2);
      // 方式1 利用 reduce
      // let tempArr = temp.reduce((arr, val) => {
      //     let tempObj = {_checked: false, ...val};
      //     if (this.selectList.length > 0) {
      //         for (let key of this.selectList) {
      //             if (key.id == val.id) {
      //                 tempObj._checked = true;
      //             }
      //         }
      //     }
      //     arr.push(tempObj);
      //     return arr;
      // }, []);
      // 方式2 利用 includes
      const tempArr = temp.map((n) =>
        Object.assign({}, n, {
          _checked: this.selectList.map((item) => item.id).includes(n.id)
        })
      );
      this.data2 = tempArr;
    },
    initMerageTD(key) {
      // 处理合并单元格逻辑
      let colspanTd = [];
      let rowspanTd = 0;
      const tableData = this.dataBase.cloneDeep(this.data1);
      tableData.forEach((m, n) => {
        if (n === 0) {
          // 保证有数据源前提
          colspanTd.push(1);
          rowspanTd = 0;
        } else {
          if (tableData[n][key] === tableData[n - 1][key]) {
            colspanTd[rowspanTd] += 1;
            colspanTd.push(0);
          } else {
            colspanTd.push(1);
            rowspanTd = n;
          }
        }
      });
      return {
        colspanTd: colspanTd,
        rowspanTd: rowspanTd
      };
    },
    handleSpan({ row, column, rowIndex, columnIndex }) {
      // console.log('当前行', row, '当前列', column, '当前行索引', rowIndex, '当前列索引', columnIndex)
      if (columnIndex === 0) {
        // 合并单元格处理
        let merageTd = this.initMerageTD("name");
        const rowSpan = merageTd.colspanTd[rowIndex];
        const colSpan = rowSpan > 0 ? 1 : 0; // 如果被合并了rowSpan = 0 则它这个列需要取消
        return {
          rowspan: rowSpan,
          colspan: colSpan
        };
      }
    }
  },
  computed: {
    clipOptions() {
      return {
        value: this.inputVal,
        success: () => {
          this.$Message.success("复制成功");
        },
        error: () => {
          this.$Message.error("复制失败");
        }
      };
    }
  },
  components: { mBreadcrumb, headCustom }
};
</script>

<style lang="less" scoped>
.tree {
  padding: 20px 0;
  &-inline {
    margin-right: 10px;
  }
}
.inline {
  margin-left: 5px;
}

.gc-loadmore__wrapper {
  width: 100%;
  height: 300px;
}
.gc-page {
  margin: 10px;
  text-align: right;
}
</style>

<style>
.ivu-table td.table-custom1 {
  background-color: #2db7f5;
  color: #fff;
}
</style>
