<template>
    <Select
        ref="select"
        v-bind="$attrs"
        multiple
        transfer
        :max-tag-count="2"
        @on-change="handleChange">
        <select-tree
            :selectedArray="value"
            :data="data"
            :load-data="loadData"
            @on-clear="handleClear"
            @on-check="handleTreeCheck"></select-tree>
    </Select>
</template>

<script>
/* eslint-disable */
import { Select } from 'iview'
import Emitter from 'iview/src/mixins/emitter.js'
import selectTree from './treeNode.vue'

export default {
    name: 'TreeSelect',
    mixins: [Emitter],
    props: {
        value: {
            type: Array,
            default: () => []
        },
        data: {
            type: Array,
            default: () => []
        },
        loadData: Function
    },
    data () {
        return {
            isChangedByTree: true,
            isInit: true
        }
    },
    provide () {
        return {
            parent: this
        }
    },
    methods: {
        handleChange (selected) {
            if (!this.isChangedByTree) this.$emit('input', selected)
            this.isChangedByTree = false
        },
        handleTreeCheck (selectedArray) {
            this.isChangedByTree = true
            this.$emit('input', selectedArray.map(item => item.id))
        },
        handleClear () {
            this.$refs.select.reset()
        }
    },
    components: {
       Select, selectTree
    },
}
</script>
