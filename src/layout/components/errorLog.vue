<template>
  <div class="gc-error" v-if="errorLogs && errorLogs.length > 0">
    <sTooltip content="错误日志" placement="bottom">
      <sButton type="text" @click="visible = true">
        <sIcon type="ios-bug" :size="23" />
      </sButton>
    </sTooltip>
    <sModal
      class="gc-dia-main"
      width="1000"
      v-model="visible"
      transfer
      no-data-text="无错误日志"
      :mask-closable="false"
      footer-hide
    >
      <div slot="header" class="gc-dia-title">
        错误日志<sButton style="margin-left: 15px;" type="primary" icon="md-trash" @click.native="onClick"
          >错误演示</sButton
        ><sButton style="margin-left: 15px;" type="primary" icon="md-trash" @click="clearAll">清空全部</sButton>
      </div>
      <div class="gc-dia-body gc-table gc-table-mini">
        <sTable :columns="columns" :data="errorLogs" highlight-row border>
          <template slot-scope="{ row }" slot="tag">
            <div class="error-list">
              <span class="message-title">Msg:</span>
              <sTag color="error">{{ row.err.message }}</sTag>
            </div>
            <div class="error-list">
              <span class="message-title">Info:</span>
              <sTag color="warning">{{ row.err.message }}</sTag>
            </div>
            <div class="error-list">
              <span class="message-title">Url:</span>
              <sTag color="success">{{ row.err.message }}</sTag>
            </div>
          </template>
          <template slot-scope="{ row }" slot="logs">
            {{ row.err.stack }}
          </template>
        </sTable>
      </div>
    </sModal>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";

export default {
  name: "ErrorLog",
  data() {
    return {
      visible: false,
      columns: [
        {
          key: "preview",
          align: "center",
          slot: "tag",
          title: "未知",
          width: 250
        },
        {
          title: "信息",
          slot: "logs",
          align: "center"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["errorLogs"])
  },
  methods: {
    onClick() {
      this.testB = testB;
    },
    clearAll() {
      this.visible = false;
      this.$store.dispatch("errorLog/clearErrorLog");
    }
  }
};
</script>

<style lang="less">
.gc-error {
  .ivu-btn-text {
    padding: 0 10px;
  }
  .ivu-tooltip-rel {
    height: 60px;
    line-height: 60px;
    i {
      cursor: pointer;
    }
  }
}
.error-list {
  margin: 10px;
  .message-title {
    font-size: @--size-base + 4;
    color: @--color-info;
    font-weight: bold;
    padding-right: 8px;
  }
}
</style>
