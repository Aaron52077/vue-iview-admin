<template>
    <div>
        <div class="gc-dropdown-menu" ref="menu" aria-multiselectable="true">
            <div class="gc-dropdown-menu__item" v-for="(item, index) in list" :key="index" @click.stop="toggleItem(index)">
                <div class="gc-dropdown-menu__title" :class="[item.showPopup ? 'gc-dropdown-menu__title--active' : '']">{{item.title}}</div>
            </div>
        </div>
        <div ref="wrapper" class="gc-popup gc-popup__top popup-top" :class="[showPopup ? 'gc-popup__show' : '']">
            <div class="gc-popup__mask" :style="{top: offsetTop + 'px'}" @click.self="onClickOutside()"></div>
            <div class="gc-popup__container" v-show="showWrapper" :style="{top: offsetTop + 'px'}">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import emitter from "@/components/mixins/emitter"

export default {
    mixins: [emitter],
    name: 'dropdown-menu',
    props: {
        menuList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            showPopup: false,
            offsetTop: 0,
            showWrapper: false,
            list: [...this.menuList],
            isActive: false
        }
    },
    // beforeCreate() {
    //     const createEmitter = eventName => () => this.$emit(eventName);

    //     this.showWrapper = createEmitter('open');
    //     this.showPopup = createEmitter('close');
    // },
    methods: {
        updateOffset() {
            const { menu } = this.$refs;
            const rect = menu.getBoundingClientRect();
            // this.offsetTop = window.innerHeight - rect.top;
            this.offsetTop = rect.top + rect.height;
        },
        toggleItem(active) {
            this.isActive = parseInt(active);

            this.list = this.menuList.map((item, index) => {
                if (index === active) {
                    this.toggle();
                } else if (item.showPopup) {
                    this.toggle(false);
                }
                return {
                    showPopup: index == active,
                    ...item
                }
            });
            this.$emit('input', active);
            this.$emit('on-change', active)
        },
        onClickOutside() {
            this.toggle(false);
            this.$emit('closed');
        },
        toggle(show = !this.showPopup) {
            // if (show === this.showPopup) {
            //     return;
            // }
            this.showPopup = show;

            if (show) {
                this.updateOffset();
                this.showWrapper = true;
            }
        },
        onClosed() {
            this.showWrapper = false;
            this.showPopup = false;
            this.$emit('closed');
        }
    }
}
</script>

<style lang="less">
@import '~@/assets/css/common/_popup.less';
.gc-dropdown-menu {
    position: relative;
    display: flex;
    height: 50px;
    background-color: #fff;
    user-select: none;
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 200%;
        transform: scale(.5);
        transform-origin: 0 0;
        pointer-events: none;
        box-sizing: border-box;
        border: 0 solid #F7F6F6;
        border-bottom-width: 2px;
        right: 0;
    }
    &__item {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        min-width: 0; // hack for flex ellipsis
        &:active {
            opacity: .7;
        }
        &--disabled {
            &:active {
                opacity: 1;
            }
            .gc-dropdown-menu__title {
                color: #969799;
            }
        }
    }
    &__title {
        position: relative;
        box-sizing: border-box;
        max-width: 100%;
        padding: 0 8px;
        color: #323233;
        font-size: 15px;
        line-height: 18px;
        &::after {
            position: absolute;
            top: 50%;
            right: -4px;
            margin-top: -5px;
            border: 3px solid;
            border-color: transparent transparent currentColor currentColor;
            transform: rotate(-45deg);
            opacity: .8;
            content: '';
        }
        &--active {
            color: #1989fa;
            &::after {
                margin-top: -1px;
                transform: rotate(135deg);
            }
        }
    }
}
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