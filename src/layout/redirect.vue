<script>
export default {
  // 方式1
  // beforeRouteEnter (to, from, next) {
  //     next(instance => instance.$router.replace(JSON.parse(from.params.route)))
  // },
  // 方式2
  beforeCreate() {
    const { params, query } = this.$route;
    const { path } = params;
    this.$router.replace({ path: "/" + path, query });
  },
  render: h => h() // avoid warning message
};
</script>
