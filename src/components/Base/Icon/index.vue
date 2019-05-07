<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
/**
 * m-icon  图标
 * @module components/icon
 * @desc 顶部导航
 * @param {String} [iconClass] - 图标类型
 * @param {string} [className] - 自定义图标样式
 * @example
 */
export default {
    name: 'm-icon',
    props: {
        iconClass: String,
        className: String
    },
    computed: {
        iconName() {
            return `#${this.iconClass}`
        },
        svgClass() {
            if (this.className) {
                return 'gc-icon ' + this.className
            } else {
                return 'gc-icon'
            }
        }
    }
}
</script>

<style scoped>
.gc-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
}
</style>
