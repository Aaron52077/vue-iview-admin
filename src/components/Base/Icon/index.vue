<template>
    <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
        <use :xlink:href="iconsName"></use>
    </svg>
</template>

<script>
/**
 * m-icon  图标
 * @module components/icon
 * @desc 顶部导航
 * @param {String} [iconName] - 图标类型
 * @param {string} [iconClass] - 自定义图标样式
 * @example
 */
export default {
    name: 'm-icon',
    props: {
        iconClass: String,
        iconName: String
    },
    computed: {
        iconsName() {
            return `#${this.iconName}`
        },
        svgClass() {
            if (this.iconClass) {
                return 'gc-icon ' + this.iconClass
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
