<template>
    <div class="no-result" :style="{ paddingTop: `${top}px` }">
        <template v-if="type == 1">
            <img class="no-result__img1" src="~@/assets/img/no-result.png" />
        </template>
        <template v-if="type == 2">
            <img class="no-result__img2" src="~@/assets/img/no-result.png" />
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
        top: {
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
    &__img1 {
        width: 174px;
        height: 151px;
    }
    &__img2 {
        width: 138px;
        height: 100px; 
    }
    p {
        margin-top: 10px;
    }
}
</style>
