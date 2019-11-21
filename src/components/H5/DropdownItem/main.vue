<template>
    <div ref="wrapper" class="gc-popup gc-popup__top popup-top" :class="[showWrapper ? 'gc-popup__show' : '']">
        <div class="gc-popup__mask" :style="{top: offsetTop + 'px'}" @click.self="hidePopup()"></div>
        <div class="gc-popup__container" v-show="showPopup" :style="{top: offsetTop + 'px'}" @click="onClosed()">
            <slot></slot>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'dropdown-menu-item',
    props: {
        name: {
            type: [String, Number],
            default: ''
        }
    },
    data () {
        return {
            offsetTop: 0,
            showPopup: false,
            showWrapper: false
        }
    },
    methods: {
        hidePopup() {
            this.dispatch('dropdownMenu', 'item-click', this);
            this.showWrapper = false;
            this.$emit('closed');
        },
        onClosed() {
            
        },
    },
    watch: {
        showWrapper(val) {
            console.log(`即将为${val ? "显示" : "隐藏"}状态`)
            // this.broadcast(this.$children, "MyDropdownMenu", "visible", [val])
        }
    },
}
</script>

<style lang="less">
@import '~@/assets/css/common/_popup.less';
.popup-top {
    .gc-popup__container {
        left: 0;
        right: 0;
        padding: 15px;
        background-color:#fff;;
        color: #000;
        font-size: 14px;
    }
}
</style>