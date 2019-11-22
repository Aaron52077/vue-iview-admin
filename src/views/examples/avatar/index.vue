<template>
    <div class="gc-panel">
        <div class="gc-panel__title">Avatar 头像</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <div class="gc-container__title">样式1</div>
            <sDivider></sDivider>
            <mAvatar class="gc-block" name="陈哥哥"></mAvatar>
            <mAvatar class="gc-block" name="张三" :color="0" :size="48"></mAvatar>
            <mAvatar class="gc-block" name="李四" :color="1" :size="48"></mAvatar>
            <mAvatar class="gc-block" name="王五" :color="2" :size="48"></mAvatar>
            <mAvatar class="gc-block" name="赵六" :color="3" :size="48"></mAvatar>
            <mAvatar class="gc-block" src="plugins/pic.png" name="赵六" :color="0" :size="48"></mAvatar>
        </div>
        <div class="gc-container">
            <div class="gc-container__title">样式2</div>
            <sDivider></sDivider>
            <mAvatar class="gc-block" name="陈哥哥" shape="square"></mAvatar>
            <mAvatar class="gc-block" name="张三" :color="3" :size="48" shape="square"></mAvatar>
            <mAvatar class="gc-block" name="李四" :color="2" :size="48" shape="square"></mAvatar>
            <mAvatar class="gc-block" name="王五" :color="1" :size="48" shape="square"></mAvatar>
            <mAvatar class="gc-block" name="赵六" :color="0" :size="48" shape="square"></mAvatar>
            <mAvatar class="gc-block" name="赵六" :color="0" :size="48" shape="square"></mAvatar>
            <mAvatar class="gc-block" src="plugins/pic.png" name="赵六" :color="0" :size="48" shape="square"></mAvatar>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            
        }
    },
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/common/_mixins.less';
.gc-block {
    display: inline-block;
    & + .gc-block {
        margin-left: 15px;
    }
}
</style>
