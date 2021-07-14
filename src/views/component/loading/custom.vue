<template>
  <div class="gc-filter__custom">
    <sPoptip
      v-model="currentValue"
      :trigger="trigger"
      placement="right-start"
      width="150"
      transfer
      wordWrap
    >
      <sIcon type="md-checkbox-outline" size="18" color="#c5c8ce" style="cursor: pointer" />
      <template v-slot:content>
        <sCellGroup>
          <sCell
            v-for="item in menuList"
            :key="item.label"
            :title="item.label"
            @click.native="onClick(id)"
          />
        </sCellGroup>
      </template>
    </sPoptip>
  </div>
</template>

<script>
export default {
  props: {
    trigger: {
      type: String,
      default: 'hover' // ['hover', 'click']
    },
    id: [String, Number]
  },
  data() {
    return {
      currentValue: false,
      menuList: [
        {
          key: 'edit',
          label: '编辑部门'
        },
        {
          key: 'detail',
          label: '查看部门'
        },
        {
          key: 'new',
          label: '新增子部门'
        },
        {
          key: 'delete',
          label: '删除部门'
        }
      ]
    };
  },
  methods: {
    onClick(id) {
      this.currentValue = false;
      this.$emit('onClick', id);
    }
  }
};
</script>

<style lang="less">
.gc-filter__custom {
  position: relative;
  display: inline-block;
  &--bd {
    width: 100%;
    height: 200px;
  }
  .letter-list {
    width: 100%;
  }
}
.ivu-poptip-body-content-word-wrap {
  white-space: inherit;
}
</style>
