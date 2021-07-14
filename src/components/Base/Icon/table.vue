<template>
  <div class="gc-tables">
    <div class="gc-tables__wrapper" ref="ElTable">
      <div class="gc-tables__title">座位</div>
      <!-- Y轴固定 -->
      <div class="gc-tables__lt">
        <div class="table-head" ref="YRowLayer" data-ref="YRowLayer">
          <table class="full-table" border="0">
            <thead>
              <tr v-for="header in dataSheet" :key="header.index">
                <th v-for="(col, idx) in header.seatArray" :key="idx" v-show="idx === 0">
                  {{ header.seatNo }}
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div class="gc-tables__rt" ref="ElTableBody">
        <!-- X轴固定 -->
        <div class="table-head" ref="XRowLayer" data-ref="XRowLayer">
          <table class="full-table" border="0">
            <thead>
              <tr>
                <th v-for="(header, index) in tableHeader" :key="index">
                  <div class="full-table__inner">{{ header }}</div>
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <!-- 正常表格内容(只有表格内容，没有表头和首列) -->
        <div
          class="gc-tables__bd"
          ref="ELTableContainer"
          @scroll.passive="handleTableScroll($event)"
        >
          <table class="content-table" border="0">
            <tbody ref="tbody">
              <tr v-for="(row, index) in dataSheet" :key="index">
                <td v-for="(p, idx) in row.seatArray" :key="idx">
                  <span>
                    <icon-checkbox
                      :value="p === 0 ? false : true"
                      :col="`${idx + 1}`"
                      :row="row.seatNo"
                      :status="p"
                      @change="handleChange($event)"
                    />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import iconCheckbox from "./main.vue";

export default {
  name: "hallTable",
  props: {
    headTool: {
      type: Array,
      default: () => []
    },
    sheetData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableHeader: this.headTool,
      dataSheet: [],
      selectList: []
    };
  },
  methods: {
    handleTableScroll(event) {
      const $target = this.$refs.ELTableContainer;
      // X固定
      this.$refs.XRowLayer.scrollLeft = $target.scrollLeft;
      // Y固定
      this.$refs.YRowLayer.scrollTop = $target.scrollTop;
    },
    handleChange(data) {
      this.$emit("on-click", data);
    }
  },
  components: { iconCheckbox },
  watch: {
    headTool(val) {
      this.tableHeader = val;
    },
    sheetData: {
      handler(val, oldVal) {
        this.dataSheet = val;
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
@tbody-height: 300px;
.gc-tables {
  position: relative;
  height: 100%;
  background: #eee;
  margin-bottom: 10px;
  overflow: hidden;
  table {
    border-spacing: 0;
  }
  th,
  td span {
    display: inline-block;
    vertical-align: middle;
  }
  &__title {
    position: absolute;
    left: 0;
    top: 2px;
    width: 50px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    text-align: center;
    z-index: 99;
  }
  &__wrapper {
    width: 100%;
    .clearfix();
  }
  &__lt {
    float: left;
    width: 50px;
    .table-body {
      overflow: hidden;
    }
    .table-head {
      width: 100%;
      height: @tbody-height;
      margin-top: 32px;
      overflow: hidden;
      th,
      td span {
        width: 50px;
      }
    }
    .full-table {
      overflow: scroll;
      tr th {
        height: 36px;
        line-height: 36px;
      }
    }
  }
  &__rt {
    float: left;
    width: calc(100% - 50px);
    .table-head {
      width: 100%;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      th {
        white-space: normal;
        padding-top: 6px;
        height: 32px !important;
      }
    }
    th,
    td span {
      width: 50px;
    }
  }
  &__bd {
    width: 100%;
    height: @tbody-height;
    overflow: scroll;
    th,
    td {
      width: 50px;
    }
  }
  .table-body {
    width: 100%;
    overflow: auto;
  }
  table::-webkit-scrollbar {
    display: none;
  }
  .content-table__icon {
    width: 32px;
    height: 32px;
  }
  .full-table__inner {
    line-height: 20px;
  }
  .content-table th,
  .full-table th {
    font-size: 14px;
    font-weight: 400;
    color: #176bed;
    height: 36px;
    line-height: 36px;
    text-align: center;
  }
  .content-table td,
  .full-table td {
    text-align: center;
    word-wrap: break-word;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }
  .content-table {
    display: block;
  }
}
</style>
