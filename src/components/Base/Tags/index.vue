<template>
  <div
    class="gc-tag"
    :class="[
      type ? 'gc-tag__' + type : '',
      border ? 'gc-tag__border--' + border : '',
      size ? 'gc-tag__size--' + size : '',
      {
        'is-round': round,
        'is-edit': closable
      }
    ]"
  >
    <div class="gc-tag__bd">
      <slot></slot>
    </div>
    <sIcon type="ios-close-circle-outline" class="gc-tag__icon" v-if="closable" @click="click" />
    <slot name="right">
      <div class="gc-tag__icon" @click="handle"></div>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    round: Boolean,
    border: String,
    closable: Boolean,
    size: String
  },
  methods: {
    click(e) {
      this.$emit("click", e);
    },
    handle(e) {
      this.$emit("click", e);
    }
  }
};
</script>

<style lang="less" scoped>
// Colors -------------------------- */
@--color-white: #fff;
@--color-black: #000;
@--color-primary: #409eff;
@--color-danger: #f56c6c;
@--color-success: #67c23a;
@--color-warning: #e6a23c;
@--color-info: #565656;

.gc-tag {
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  height: 26px;
  line-height: 24px;
  margin: 0 6px 5px 0;
  padding: 0 6px;
  border-radius: 3px;
  color: @--color-info;
  background: #eee;
  font-size: 13px;
  opacity: 1;
  border: 1px solid #a0a0a0;
  &__bd {
    display: inline-block;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &.is-edit {
    padding: 0 0 0 6px;
    &:hover {
      color: @--color-primary;
      -webkit-filter: saturate(200%); /* Chrome, Safari, Opera */
      filter: saturate(200%);
    }
  }
  &__success {
    color: @--color-white;
    border: none;
    background-color: @--color-success;
    .gc-tag__icon {
      color: @--color-white;
    }
  }
  &__info {
    color: @--color-white;
    border: none;
    background-color: @--color-info;
  }
  &__warning {
    color: @--color-white;
    border: none;
    background-color: @--color-warning;
    .gc-tag__icon {
      color: @--color-white;
    }
  }
  &__danger {
    color: @--color-white;
    border: none;
    background-color: @--color-danger;
    .gc-tag__icon {
      color: @--color-white;
    }
  }
  &__primary {
    color: @--color-white;
    border: none;
    background-color: @--color-primary;
    .gc-tag__icon {
      color: @--color-white;
    }
  }
  &__border {
    &--danger {
      color: @--color-danger;
      border-color: rgba(245, 108, 108, 0.3);
      background-color: rgba(245, 108, 108, 0.1);
      .gc-tag__icon {
        color: @--color-danger;
      }
    }
    &--primary {
      color: @--color-primary;
      border-color: rgba(64, 158, 255, 0.3);
      background-color: rgba(64, 158, 255, 0.1);
      .gc-tag__icon {
        color: @--color-primary;
      }
    }
    &--success {
      color: @--color-success;
      border-color: rgba(103, 194, 58, 0.3);
      background-color: rgba(103, 194, 58, 0.1);
      .gc-tag__icon {
        color: @--color-success;
      }
    }
    &--info {
      color: @--color-info;
      border-color: rgba(153, 153, 153, 0.3);
      background-color: rgba(153, 153, 153, 0.1);
      .gc-tag__icon {
        color: @--color-info;
      }
    }
    &--warning {
      color: @--color-warning;
      border-color: rgba(230, 162, 60, 0.3);
      background-color: rgba(230, 162, 60, 0.1);
      .gc-tag__icon {
        color: @--color-warning;
      }
    }
  }
  &__icon {
    display: inline;
    margin-left: 3px;
    color: @--color-info;
    font-size: 15px;
    vertical-align: 4px;
    cursor: pointer;
  }
  &__size {
    &--medium {
      height: 36px;
      line-height: 36px;
    }
    &--small {
      height: 24px;
      line-height: 24px;
      font-size: 12px;
    }
  }
}

.is-primary {
  color: @--color-white;
  border: none;
}
.is-round {
  border-radius: 15px;
}
</style>
