
<template>
    <!-- eslint-disable vue/require-component-is -->
    <component :is="linkProps(to)">
        <slot />
    </component>
</template>

<script>
export default {
    props: {
        to: {
            type: String,
            required: true
        }
    },
    methods: {
        /**
         * @param {string} path
         * @returns {Boolean}
         */
        isExternal(path) {
            return /^(https?:|mailto:|tel:)/.test(path)
        },
        linkProps(url) {
            if (this.isExternal(url)) {
                return {
                    is: 'a',
                    href: url,
                    target: '_blank',
                    rel: 'noopener'
                }
            }
            return {
                is: 'router-link',
                to: url
            }
        }
    }
}
</script>
