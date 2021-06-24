<template>
  <div class="gc-filter__custom">
    <sPoptip v-model="currentValue" placement="bottom" width="300" transfer wordWrap>
      <sIcon type="ios-funnel" size="small" color="#c5c8ce" style="cursor: pointer" />
      <template v-slot:content>
        <sCard title="自定义筛选" icon="ios-options" :padding="0" shadow>
          <mScrollbar class="gc-filter__custom--bd" hide>
            <sCellGroup>
              <sCell
                v-for="(item, index) in tree"
                :id="item.id"
                :key="index"
                :title="item.name"
                @click.native="onClick(item.name)"
                extra="可关闭"
              ></sCell>
              <sCell title="Only show titles" />
              <sCell title="Display label content" label="label content" />
              <sCell title="Display right content" extra="details" />
              <sCell title="富文本链接" extra="查看" to="/api/editor" target="_blank" />
              <sCell title="Disabled" disabled />
              <sCell title="Selected" selected />
              <sCell title="With Badge">
                <sBadge :count="10" slot="extra" />
              </sCell>
              <sCell title="With Switch">
                <sSwitch v-model="switchValue" slot="extra" />
              </sCell>
            </sCellGroup>
          </mScrollbar>
        </sCard>
      </template>
    </sPoptip>
  </div>
</template>

<script>
export default {
  props: {
    tree: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentValue: false,
      switchValue: true
    };
  },
  methods: {
    onClick(name) {
      this.currentValue = false;
      this.$emit('onClick', name);
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
