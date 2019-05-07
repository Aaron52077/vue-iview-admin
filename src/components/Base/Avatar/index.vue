<template>
    <sAvatar 
        :shape="shape" 
        :size="size" 
        :src="src">
        <div class="avatar-inner" v-if="name">{{firstName}}</div>
    </sAvatar>
</template>

<script>
/**
 * m-Avatar 头像
 * @module components/Avatar
 * @example
 */
export default {
    props: {
        shape: String,
        size: String,
        src: String,
        name: String
    },
    computed: {
		firstName() {
			return (this.name || '')[0]
		}
    }
}
</script>


