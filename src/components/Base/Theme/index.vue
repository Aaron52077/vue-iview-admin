<template>
  <div class="gc-theme">
    <sTooltip content="主题" placement="bottom">
      <sButton type="text" @click="dialogVisible = true">
        <sIcon type="md-shirt" :size="23" />
      </sButton>
    </sTooltip>
    <sModal
      width="600px"
      class="gc-dia-main"
      v-model="dialogVisible"
      transfer
      footer-hide
      :mask-closable="false"
    >
      <div slot="header" class="gc-dia-title">主题</div>
      <div class="gc-dia-body gc-table">
        <sTable
          size="large"
          :columns="columns"
          :data="list"
          :show-header="false"
          highlight-row
          border
        >
          <template slot-scope="{ row }" slot="image">
            <div class="theme-preview" :style="{ backgroundImage: `url(${row.preview})` }" />
          </template>
          <template slot-scope="{ row }" slot="action">
            <sButton v-if="activeName === row.name" type="info" icon="md-checkmark">已激活</sButton>
            <sButton v-else @click="handleSelectTheme(row.name)">使用</sButton>
          </template>
        </sTable>
      </div>
    </sModal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      dialogVisible: false,
      columns: [
        {
          key: "title",
          align: "center"
        },
        {
          key: "preview",
          align: "center",
          slot: "image"
        },
        {
          slot: "action",
          align: "center"
        }
      ]
    };
  },
  computed: {
    ...mapState("theme", ["list", "activeName"])
  },
  methods: {
    ...mapActions("theme", ["setTheme"]),
    handleSelectTheme(name) {
      this.setTheme(name);
    }
  }
};
</script>

<style lang="less">
.gc-theme {
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
.theme-preview {
  height: 55px;
  width: 100px;
  border-radius: 4px;
  background-size: cover;
  border: 1px solid @--color-border;
}
</style>
