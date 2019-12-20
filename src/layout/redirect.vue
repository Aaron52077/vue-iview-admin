<script>
export default {
    beforeCreate() {
        const { params, query } = this.$route
        const { path } = params
        this.$router.replace({ path: '/' + path, query })
    },
    render: h => h() // avoid warning message
}
</script>