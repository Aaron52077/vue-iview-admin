<template>
    <div class="no-result" :style="{ paddingTop: `${offsetTop}px` }">
        <template v-if="type == 1">
            <sIcon class="no-result__icon" type="logo-html5" />
        </template>
        <template v-if="type == 2">
            <mIcon iconClass="no-result__icon1" iconName="wp-form" />
        </template>
        <p>
            <slot></slot>
        </p>
    </div>
</template>
<script>
/* eslint-disable */
export default {
    props:{
        type: {
            type: [String, Number],
            default: "1"
        },
        offsetTop: {
            type: Number,
            default: 120
        }
    }
}
</script>

<style lang="less" scoped>
.no-result {
    width: 100%;
    text-align: center;
    background-color: #fff;
    &__icon {
        font-size: 48px;
        color: #999;
    }
    &__icon1 {
        font-size: 40px;
        color: #999;
    }
    p {
        margin-top: 10px;
    }
}
</style>
