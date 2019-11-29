<script>
export default {
    beforeCreate() {
        const { params, query, fullPath } = this.$route
        const { path } = params
        console.log('fullPath', fullPath)
        this.$router.replace({ path: '/' + path, query })
    },
    render: h => h() // avoid warning message
}
</script>