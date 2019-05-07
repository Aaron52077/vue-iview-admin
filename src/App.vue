<template>
	<!-- 视图 -->
    <mLayoutMain>
        <transition name="el-fade-in-linear" mode="out-in"> 
            <router-view></router-view>
        </transition>
    </mLayoutMain>
</template>

<script>
import mLayoutMain from '@/views/layout/main.vue'
export default {
	name: 'App',
	components: { mLayoutMain }
}
</script>

<style lang="less">
#app {
	width: 100%;
	height: 100%;
}
</style>
