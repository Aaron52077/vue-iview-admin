<template>
  <div class="gc-datapicker">
    <template v-if="hasLabel">
      <slot name="innerLeft"></slot>
      <sDatePicker
        v-bind="$attrs"
        v-on="$listeners"
        :type="type"
        v-model="startTime"
        :format="format"
        :size="size"
        :transfer="transfer"
        :clearable="clearable"
        :placeholder="placeholder"
        :options="optionsTime"
        style="width: 180px"
        @on-change="startTimeChange"
      ></sDatePicker>
      <slot name="innerRight"></slot>
      <sDatePicker
        v-bind="$attrs"
        v-on="$listeners"
        :type="type"
        v-model="endTime"
        :format="format"
        :size="size"
        :transfer="transfer"
        :clearable="clearable"
        :placeholder="placeholder"
        :options="optionsTime"
        style="width: 180px"
        @on-change="endTimeChange"
      ></sDatePicker>
      <sButton class="gc-datapicker__btn" type="primary" @click="queryHandle">{{
        innerText
      }}</sButton>
    </template>
    <template v-else>
      <sDatePicker
        v-bind="$attrs"
        v-on="$listeners"
        :type="type"
        v-model="startTime"
        :format="format"
        :size="size"
        :transfer="transfer"
        :clearable="clearable"
        :placeholder="placeholder"
        :options="optionsTime"
        :style="{ width: `${width}px` }"
        @on-change="startTimeChange"
      ></sDatePicker>
      <span>-</span>
      <sDatePicker
        v-bind="$attrs"
        v-on="$listeners"
        :type="type"
        v-model="endTime"
        :format="format"
        :size="size"
        :transfer="transfer"
        :clearable="clearable"
        :placeholder="placeholder"
        :options="optionsTime"
        :style="{ width: `${width}px` }"
        @on-change="endTimeChange"
      ></sDatePicker>
      <sButton class="gc-datapicker__btn" type="primary" @click="queryHandle">{{
        innerText
      }}</sButton>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "date"
    },
    transfer: {
      type: Boolean,
      default: true
    },
    hasLabel: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    size: String,
    width: {
      type: [String, Number],
      default: 180
    },
    format: {
      type: [String, Date],
      default: "yyyy-MM-dd"
    },
    placeholder: {
      type: String,
      default: "选择日期"
    },
    formater: {
      type: String,
      default: "yyyy-MM-dd hh:mm"
    },
    innerText: {
      type: String,
      default: "查询"
    },
    config: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      startTime: "",
      endTime: "",
      optionsTime: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now() - 86400000;
        }
      }
    };
  },
  created() {
    if (this.config) {
      this.startTime = this.config.start;
      this.endTime = this.config.end;
    }
  },
  methods: {
    startTimeChange(date) {
      let endTime = this.endTime;
      if (date !== "" && endTime !== "") {
        let start = new Date(date).getTime();
        let end = new Date(endTime).getTime() + 24 * 60 * 59 * 1000;
        if (end < start) {
          this.$Message.error("开始时间不能大于结束时间");
          // 清空
          setTimeout(() => {
            this.startTime = "";
          }, 0);
          return;
        }
      }
    },
    endTimeChange(date) {
      let startTime = this.startTime;
      if (date !== "" && startTime !== "") {
        let end = new Date(date).getTime();
        let start = new Date(startTime).getTime();
        if (end < start) {
          // 清空
          setTimeout(() => {
            this.endTime = "";
          }, 0);
          this.$Message.error("开始时间不能大于结束时间");
          return;
        }
      }
    },
    queryHandle() {
      const t = this.dataBase;
      const formater = this.formater;
      let startTime = this.startTime,
        endTime = this.endTime;
      if (startTime !== "" && endTime !== "") {
        let start = t.dateToStr(startTime, formater);
        let end = t.dateToStr(endTime, formater);
        this.$emit("on-click", { start: start, end: end });
      } else {
        this.$Message.error("请选择时间段");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.gc-datapicker {
  margin-top: 10px;
  span {
    margin: 0 10px;
  }
  &__btn {
    margin-left: 10px;
  }
}
</style>
