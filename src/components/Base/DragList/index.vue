<template>
    <sRow :gutter="16" class="drag-wrapper">
        <sCol span="12">
            <slot name="leftTitle"></slot>
            <mScrollbar class="drag-inline">
                <draggable :class="dropConClass.left" :options="options" :value="list1" @input="handleListChange($event, 'left')" @end="handleEnd($event, 'left')">
                    <div class="drag-list-item" v-for="(itemLeft, index) in list1" :key="`drag_li1_${index}`">
                        <slot name="left" :itemLeft="itemLeft">{{ itemLeft }}</slot>
                    </div>
                </draggable>
            </mScrollbar>
        </sCol>
        <sCol span="12">
            <slot name="rightTitle"></slot>
            <mScrollbar class="drag-inline">
                <draggable :class="dropConClass.right" :options="options" :value="list2" @input="handleListChange($event, 'right')" @end="handleEnd($event, 'right')">
                    <div class="drag-list-item" v-for="(itemRight, index) in list2" :key="`drag_li2_${index}`">
                        <slot name="right" :itemRight="itemRight">{{ itemRight }}</slot>
                    </div>
                </draggable>
            </mScrollbar>
        </sCol>
    </sRow>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    name: 'DragList',
    props: {
        list1: {
            type: Array,
            required: true
        },
        list2: {
            type: Array,
            default: () => []
        },
        dropConClass: {
            type: Object,
            default: () => ({})
        }
    },
    components: { draggable },
    data () {
        return {
            options: { group: 'dragList' }
        }
    },
    methods: {
        handleListChange(value, type) {
            if (type === 'left') this.$emit('update:list1', value)
            else this.$emit('update:list2', value)
        },
        handleEnd(event, type) {
            const srcClassName = (event.srcElement || event.target).classList[0]
            const targetClassName = event.to.classList[0]
            let src = ''
            let target = ''
            if (srcClassName === targetClassName) {
                if (type === 'left') {
                    src = 'left'
                    target = 'left'
                } else {
                    src = 'right'
                    target = 'right'
                }
            } else {
                if (type === 'left') {
                    src = 'left'
                    target = 'right'
                } else {
                    src = 'right'
                    target = 'left'
                }
            }
            this.$emit('on-change', {
                src: src,
                target: target,
                oldIndex: event.oldIndex,
                newIndex: event.newIndex
            })
        }
    }
}
</script>

<style lang="less">
.drag-wrapper {
    .drag-inline {
        width: 100%;
        height: 460px;
    }
}
</style>