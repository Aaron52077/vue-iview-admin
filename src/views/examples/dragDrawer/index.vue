<template>
    <div class="gc-panel">
        <div class="gc-panel__title">DragDrawer 可拖动抽屉</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <div class="gc-container__title">在支持drawer所有api的基础上，支持可拖动和footer底部插槽</div>
            <sDivider></sDivider>
            <sRow :gutter="16">
                <sCol span="12">
                    <div class="inner-text">
                        <span>方向</span>
                        <sSwitch v-model="placement">
                            <span slot="open">左</span>
                            <span slot="close">右</span>
                        </sSwitch>
                        <span>是否可拖动</span>
                        <sSwitch v-model="draggable"></sSwitch>
                        <sButton @click="showContainerBDrawer = !showContainerBDrawer" type="primary" style="margin-left: 10px">{{ showContainerBDrawer ? '关闭' : '打开' }}容器内抽屉</sButton>
                        <sButton @click="showWindowBDrawer = true" type="primary" style="margin-left: 10px">打开全屏抽屉</sButton>
                    </div>
                    <div class="drag-drawer__box">
                        <!-- 局部 -->
                        <mDragDrawer v-model="showContainerBDrawer"
                            :width.sync="width2"
                            :min-width="150"
                            :inner="true"
                            :transfer="false"
                            :placement="placementComputed"
                            :draggable="draggable"
                            @on-resize="handleResize"
                            :scrollable="true">
                            <div slot="header">这是标题</div>
                            <p v-for="n in list1" :key="n.id">{{ n.name }}</p>
                            <div slot="footer">
                                <p>到底拉！</p>
                            </div>
                        </mDragDrawer>
                        <!-- 全屏 -->
                        <mDragDrawer v-model="showWindowBDrawer"
                            :width.sync="width1"
                            :min-width="300"
                            :placement="placementComputed"
                            :draggable="draggable"
                            :scrollable="true">
                                <div slot="header">这是标题</div>
                                <p v-for="n in list2" :key="n.id">{{ n.name }}</p>
                            </mDragDrawer>
                    </div>
                </sCol>
                <sCol span="12">
                    
                </sCol>
            </sRow>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import mDragDrawer from '@base/DragDrawer'
import { getDragListData } from '@/api/index'

export default {
    name: 'drag_drawer_page',
    components: {
        mDragDrawer
    },
    data () {
        return {
            showWindowBDrawer: false,
            showContainerBDrawer: false,
            showBDrawer3: false,
            width1: 300,
            width2: 200,
            placement: false,
            draggable: true,
            list1: [],
            list2: []
        }
    },
    computed: {
        placementComputed() {
            return this.placement ? 'left' : 'right'
        }
    },
    created() {
        getDragListData().then(res => {
            const { data: { list1, list2 } } = res
            this.list1 = list1;
            this.list2 = list2;
        });
    },
    methods: {
        handleResize (event) {
            const { atMin } = event
            console.log(atMin);
        },
    }
}
</script>

<style lang="less">
.drag-drawer {
    &__box {
        position: relative;
        margin-top: 10px;
        width: 100%;
        height: 400px;
        background: pink;
        border: 1px solid pink;
        p {
            padding: 14px 0;
            border-bottom: 1px dashed #eeeeee;
        }
    }
}
.inner-text {
    > span {
        margin: 0 10px;
    }
}
</style>
