<template>
    <component :is="hasToken" />
</template>

<script>
import { mapGetters } from 'vuex'
import mAccount from '@/views/account/main.vue'
import mLayoutMain from './main.vue'

export default {
    name: 'page-layout',
    data() {
        return {
            hasToken: 'mLayoutMain'
        }
    },
    components: { mAccount, mLayoutMain },
    computed: {
        ...mapGetters([
            'token'
        ])
    },
    created() {
        if (!this.token) {
            this.hasToken = 'mAccount'
        }
    }
}
</script>