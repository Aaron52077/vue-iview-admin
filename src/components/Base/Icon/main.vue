<template>
  <div class="gc-check" @change="onChange(currentValue)">
    <div class="gc-check__item">
      <label class="gc-check__checkbox--label">
        <span class="gc-check__checkbox">
          <input
            class="gc-check__checkbox--input"
            type="checkbox"
            v-model="currentValue"
            :disabled="handleDisabled"
          />
          <span class="gc-check__checkbox--core" :class="{ 'is-real': status === 2 }"></span>
        </span>
      </label>
    </div>
  </div>
</template>

<script>
/**
 * gc-checkbox
 * @param {Boolean} value - 选中值
 */
/* eslint-disable */
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "gc-checkbox",
  props: {
    value: Boolean,
    status: Number,
    row: String,
    col: String
  },
  data() {
    return {
      currentValue: this.value,
      gCol: this.col,
      gRow: this.row,
      iconType: [
        {
          status: 0,
          canClick: true
        },
        {
          status: 1,
          canClick: false
        },
        {
          status: 2,
          canClick: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["seatlist"]),
    handleDisabled() {
      return !this.iconType.find(v => v.status == this.status).canClick;
    }
  },
  methods: {
    ...mapMutations({
      addCachedSeat: "seat/ADD_CACHED_SEAT",
      delCachedSeat: "seat/DEL_CACHED_SEAT"
    }),
    onChange(event) {
      /**
       * selectTemp  选座数据
       * oldIndex    选座后存储的状态索引
       * selectIndex 座位索引
       * selectGroup 座位号
       */
      let selectTemp, oldIndex, selectIndex, selectGroup;
      let index = parseInt(this.col);
      let params = {
        row: this.row,
        col: this.col
      };
      if (event) {
        selectTemp = this.seatlist.filter(item => item.col === this.col);
        selectIndex = selectTemp.length > 0 ? selectTemp[0].col : null;
        selectGroup = this.seatlist.length > 0 ? this.seatlist[0].row : null;
        // 用户是否选座
        if (selectIndex !== null) {
          if (index === parseInt(selectIndex)) {
            this.currentValue = false;
            this.$Notice.error({
              title: "温馨提示",
              desc: "当前列座位已做选择，请选择相邻座位时间段"
            });
          }
        } else if (selectGroup !== null) {
          // 存在座位号，对比选择前后的座位号
          oldIndex = parseInt(this.seatlist[0].col);
          if (selectGroup !== this.row) {
            this.currentValue = false;
            this.$Notice.error({
              title: "温馨提示",
              desc: `请选择${selectGroup}相邻座位时间段座位`
            });
          } else if (index > oldIndex + 1 || index < oldIndex - 1) {
            this.currentValue = false;
            this.$Notice.error({
              title: "温馨提示",
              desc: `请选择${selectGroup}相邻座位时间段座位且最大选座2项`
            });
          } else {
            this.addCachedSeat(params);
          }
        } else {
          this.addCachedSeat(params);
        }

        // 选座数量限制
        if (this.seatlist.length > 2) {
          this.delCachedSeat(params);
          this.currentValue = false;
          this.$Notice.warning({ title: "温馨提示", desc: "最多能选择2个邻座位时间段座位" });
        }
      } else {
        this.delCachedSeat(params);
      }
      this.$emit("change", [...this.seatlist]);
    }
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
    col(val) {
      this.gCol = val;
    },
    row(val) {
      this.gRow = val;
    },
    currentValue(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style lang="less">
.gc-check {
  &.is-limit {
    .gc-check__checkbox--input:not(:checked) {
      & + .gc-check__checkbox--core {
        background-image: url(~@/assets/img/seat_select.png);
      }
    }
  }
  &__checkbox {
    &--label {
      flex: 1;
      cursor: pointer;
      &.is-left {
        padding-left: 25px;
        .gc-check__desc {
          padding-right: 0;
        }
      }
    }
    &--input {
      opacity: 0;
      position: absolute;
      top: 50%;
      right: 15px;
      margin: 0;
      width: 0;
      height: 0;
      transform: translateY(-50%);
      outline: none;
      z-index: -1;
      &:checked {
        & + .gc-check__checkbox--core {
          background-image: url(~@/assets/img/seat_select.png);
        }
      }
      &[disabled] + .gc-check__checkbox--core {
        background-image: url(~@/assets/img/seat_select.png);
        &.is-real {
          background-image: url(~@/assets/img/seat_using.png);
        }
      }
    }
    &--core {
      display: inline-block;
      position: relative;
      width: 32px;
      height: 32px;
      background: url(~@/assets/img/seat_normal.png) center no-repeat;
      background-size: cover;
      z-index: 1;
    }
  }
}
</style>
