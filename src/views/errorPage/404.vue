<template>
    <div class="gc-panel page-container">
        <div class="page-wrapper">
            <img class="page-wrapper__img" src="/theme/404.gif">
            <p class="page-wrapper__text">您要查找的頁面被外星人偷走了，或者根本不存在。</p>
            <sButton type="primary" round @click="$router.push('/')">回到首页</sButton>
            <div class="page-wrapper__issues">
                <a href="https://github.com/Aaron52077/vue-wuli-ui/issues" target="_blank">Issues me</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'page-404'
}
</script>

<style lang="less">
.page-container {
    width: 100%;
    height: 100vh;
    background: @--color-hover !important;
}
.page-wrapper {
    position: absolute;
    max-width: 320px;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: 999;
    &__img {
        width: 100%;
    }
    &__text {
        margin: 15px 0;
        color: @--color-white;
        font-size: 16px;
    }
    &__issues {
        margin-top: 20px;
        a  {
            color: @--color-white;
        }
    }
}
</style>