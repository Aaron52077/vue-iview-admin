<template>
    <div class="gc-avatar" 
        :class="[shape === 'square' ? 'gc-avatar__square' : 'gc-avatar__circle']"
        :style="{'width': `${size}px`, 'height': `${size}px`, 'background': bgColor}">
        <template v-if="src">
            <div class="avatar-inner"><img :src="src" /></div>
        </template>
        <template v-else>
            <div class="avatar-inner">{{firstName}}</div>
        </template>
	</div>
</template>

<script>
/**
 * m-Avatar 头像
 * @module components/Avatar
 * @example
 */
export default {
    props: {
        src: String,
        name: String,
        shape: {
			type: String,
			default: 'circle'
		},
        size: {
			type: [Number, String],
			default: 36
		},
        color: {
            type: Number,
            default: 4
        }
    },
    computed: {
		firstName() {
			return (this.name || '')[0]
        },
        bgColor() {
            const colors = ['#2db7f5','#19be6b','#ff9900', '#ed4014', '#e8eaec']
			const mid =  this.color || Number(this.name) || '0'
			return this.src ? 'none' : colors[mid%colors.length]
		},
    }
}
</script>

<style scoped lang="less">
.gc-avatar {
    display: inline-block;
    text-align: center;
    font-size: 16px;
    color: #fff;
    vertical-align: middle;
    &__circle {
        border-radius: 50%;
        overflow: hidden;
        img {
            border-radius: 50%;  
        }
    }
    &__square {
        border-radius: 3px;
    }
    .avatar-inner {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
}
</style>
