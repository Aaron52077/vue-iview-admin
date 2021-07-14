<template>
  <van-datetime-picker
    v-bind="$attrs"
    :type="type"
    :title="title"
    :value="currentDate"
    :min-date="minDate"
    :max-date="maxDate"
    :formatter="formatter"
    @cancel="cancelHandle"
    @confirm="confirmHandle"
  />
</template>

<script>
/* eslint-disable */
/**
 * pickerDate 时间选择
 * @module components/pickerDate
 * @param {String} [type] - 类型
 * @param {Function} [formatter] - 过滤筛选
 * @example
 */
const currentYear = new Date().getFullYear();
// const isEmptyArray = val => val.reduce((isEmpty, str) => isEmpty && !str || (typeof str === 'string' && str.trim() === ''), true);

export default {
  name: "mPickerDate",
  inheritAttrs: false,
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    dateValue: [Date, String],
    type: {
      type: String,
      default: "date"
    },
    formatter: Function,
    minDate: {
      type: Date,
      default: () => new Date(currentYear - 10, 0, 1)
    },
    maxDate: {
      type: Date,
      default: () => new Date()
    },
    title: {
      type: String,
      default: ""
    }
  },
  computed: {
    formatterMap() {
      const formatter = {
        date: "yyyy-MM-dd",
        datetime: "yyyy-MM-dd hh:mm",
        time: "hh:mm",
        "year-month": "yyyy-MM"
      };
      return formatter[this.type] || "yyyy-MM-dd hh:mm";
    },
    currentDate() {
      return this.parseDate(this.dateValue);
    },
    currentValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("change", val);
      }
    }
  },
  methods: {
    /**
     * 过滤时间
     */
    parseDate(val) {
      let timestamp, value;
      const t = this.dataBase;
      let formater = this.formatterMap;
      if (val && !(val instanceof Date)) {
        /**
         * 时间戳(Timestamp)转时间(Date)
         * 方式1 +new Date(val)
         * 方式2 val.getTime()
         * 方式3 val.valueOf()
         */
        timestamp = +new Date(val);
        value = new Date(timestamp);
      } else {
        value = val ? new Date(val) : new Date();
      }
      this.$nextTick(() => {
        this.$emit("input", value);
      });
      return value;
    },
    cancelHandle() {
      this.$emit("on-cancel");
      this.currentValue = false;
    },
    confirmHandle(value) {
      const t = this.dataBase;
      let formater = this.formatterMap;
      let val = t.dateToStr(value, formater);
      this.$emit("input", val);
      this.$emit("on-confirm", {
        time: val,
        date: new Date(value)
      });
      this.currentValue = false;
    },
    changeHandle(picker) {
      this.$emit("on-change", picker);
    }
  }
};
</script>
