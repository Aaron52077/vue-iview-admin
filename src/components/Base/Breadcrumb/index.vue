<template>
    <sBreadcrumb class="gc-breadcrumb" :separator="separator">
        <sBreadcrumbItem v-for="(item, index) in breadcrumb" :key="index" :to="item.path">{{item.meta.title}}</sBreadcrumbItem>
    </sBreadcrumb>
</template>
<script>
export default {
    props: {
        separator: {
            type: String,
            default: '/'
        }
    },
    data() {
        return {
            breadcrumb: ''
        }
    },
    watch: {
        $route() {
            this.getBreadcrumb()
        }
    },
    mounted() {
        this.getBreadcrumb()
    },
    methods: {
        getBreadcrumb() {
            this.breadcrumb = this.$route.matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
        }
    }
}
</script>

<style lang="less">
.gc-breadcrumb {
    margin: 15px 0;
    padding: 0 20px;
    width: 100%;
    min-height: 24px;
    color: #4d4d4d;
    font-size: 14px;
}
</style>
