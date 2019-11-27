<template>
    <div>{{ message }}</div>
</template>

<script>
export default {
    name: 'page-404',
    computed: {
        message() {
            return '网管说这个页面你不能进......'
        }
    }
}
</script>
