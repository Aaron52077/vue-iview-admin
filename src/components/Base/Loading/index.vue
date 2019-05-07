<template>
    <div class="gc-loading" :style="{ paddingTop: `${offsetTop}px` }">
        <div class="gc-loading__box" :style="{ height: `${size}px`, width: `${size}px` }"></div>
        <div class="gc-loading__tip">{{content}}</div>
    </div>
</template>

<script>
/**
 * m-loading   加载动画
 * @module components/loading
 * @desc 顶部导航
 * @param {String, Number} [size] - 图标大小
 * @param {string} [content] - 自定义提示文字
 * @param {string} [offsetTop] - 距离顶部距离
 * @example
 */
export default {
    props: {
        size: {
            type: [Number, String],
            default: 30
        },
        content: {
            type: String,
            default: '加载中'
        },
        offsetTop: {
            type: [Number, String],
            default: 150
        }
    }
}
</script>

<style lang="less" scoped>
.gc-loading { 
    position: relative;
    width: 100%;
    text-align: center;
    &__tip { 
        padding-top: 10px;
        font-size: 12px;
    }
    &__box {
        margin: 0 auto;
        border: 2px solid;
        border-color: #009efb #009efb transparent;
        border-radius: 50%;
        /*动画时间1s，线性变化，无限循环*/
        animation: loading 1s linear infinite;
    }
}
@keyframes loading{
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>