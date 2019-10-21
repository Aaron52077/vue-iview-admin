<template>
    <div>
        <div class="gc-skeleton"
            v-if="loading"
            :class="{'gc-skeleton__animate': animate}">
            <div class="gc-skeleton__avatar"
                :style="avatarStyles"
                :class="{'gc-skeleton__avatar--round': avatarShape}"></div>
            <div class="gc-skeleton__content">
                <div class="gc-skeleton__title" v-if="title" :style="{'width' : titleWidth}"></div>
                <div class="gc-skeleton__row" 
                    v-for="(item, index) in row" :key="item + index"
                    :style="{'width' : getRowWidth(index)}"></div>
            </div>
        </div>
        <template v-else>
           <slot></slot>     
        </template>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    props: {
        title: Boolean,
        avatar: Boolean,
        row: {
            type: Number,
            default: 0
        },
        loading: {
            type: Boolean,
            default: true
        },
        animate: {
            type: Boolean,
            default: true
        },
        avatarSize: {
            type: [Number, String],
            default: '32'
        },
        avatarShape: {
            type: String,
            default: 'round'
        },
        titleWidth: {
            type: [Number, String],
            default: '40%'
        },
        rowWidth: {
            type: [Number, String, Array],
            default: '100%'
        }
    },
    methods: {
        getRowWidth(index) {
            const rowWidth = this.dataBase.cloneDeep(this.rowWidth);
            if (rowWidth === '100%' && index === this.row - 1) {
                return '60%';
            }

            if (Array.isArray(rowWidth)) {
                return rowWidth[index];
            }

            return rowWidth;
        }
    },
    computed: {
        avatarStyles() {
            let calsses = {}
            if(this.avatar) {
                calsses = { 'width': `${this.avatarSize}px`, 'height': `${this.avatarSize}px` }
                return calsses
            }
            return calsses
        }
    }
}
</script>

<style lang="less">
@import '~@/assets/css/common/_var.less';
@import '~@/assets/css/common/_mixins.less';

.gc-skeleton {
    .display-flex();
    padding: 0 16px;
    &__avatar {
        flex-shrink: 0;
        margin-right: 16px;
        background-color: #f2f3f5;
        &--round {
            .border-radius(100%);
        }
    }
    &__content {
        width: 100%;
    }
    &__avatar + &__content {
        padding-top: 8px;
    }
    &__row,
    &__title {
        height: 16px;
        background-color: #f2f3f5;
    }
    &__title {
        margin: 0;
    }
    &__row {
        &:not(:first-child) {
            margin-top: 12px;
        }
    }
    &__title + &__row {
        margin-top: 20px;
    }
    &__animate {
        .animation(skeleton-blink 1s ease-in-out infinite);
    }
}

@keyframes skeleton-blink {
    50% {
        opacity: .6;
    }
}
</style>