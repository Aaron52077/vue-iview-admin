<template>
  <div class="gc-valid" :style="`width:${width}px; height:${height}`" @click="refreshCode">
    <span v-for="(item, index) in codeList" :key="index" :style="getStyle(item)">{{
      item.code
    }}</span>
  </div>
</template>

<script>
export default {
  name: "validCode",
  props: {
    width: {
      type: [String, Number],
      default: "112"
    },
    height: {
      type: [String, Number],
      default: "32"
    },
    length: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      codeList: []
    };
  },
  mounted() {
    this.refreshCode();
  },
  methods: {
    refreshCode() {
      let len = this.length,
        codeList = [],
        chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789",
        charsLen = chars.length;
      let rgb = [
        Math.round(Math.random() * 220),
        Math.round(Math.random() * 240),
        Math.round(Math.random() * 200)
      ];
      for (let i = 0; i < len; i++) {
        codeList.push({
          code: chars.charAt(Math.floor(Math.random() * charsLen)),
          color: `rgb(${rgb})`,
          fontSize: `1${[Math.floor(Math.random() * 10)]}px`,
          padding: `${[Math.floor(Math.random() * 10)]}px`,
          transform: `rotate(${Math.floor(Math.random() * 90) - Math.floor(Math.random() * 90)}deg)`
        });
      }
      this.codeList = codeList;
      // 将当前数据派发出去
      this.$emit("update:value", codeList.map(item => item.code).join(""));
      this.$emit("click", codeList.map(item => item.code).join(""));
    },
    getStyle(data) {
      return `color: ${data.color}; font-size: ${data.fontSize}; padding: ${data.padding}; transform: ${data.transform}`;
    }
  }
};
</script>

<style lang="less" scoped>
.gc-valid {
  cursor: pointer;
}
</style>
