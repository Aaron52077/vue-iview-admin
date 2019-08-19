<template>
    <div class="gc-panel">
        <div class="gc-panel__title">TreeSelect 树状下拉选择控件</div>
        <sDivider></sDivider>
        <div class="gc-container tree-select">
            <div class="gc-container__title">常用用法</div>
            <mTreeSelect
                v-model="treeSelected"
                style="width: 270px;"
                class="tree-select__inline"
                check-strictly
                :expand-all="true"
                :load-data="loadData"
                @on-change="handleTreeSelectChange"
                @on-toggle-expand="handleTreeSelectExpand"
                @on-check-change="handleTreeSelectCheckChange"
                @on-select-change="handleTreeSelectClick"
                :data="treeData"></mTreeSelect>
            <sButton class="tree-select__inline" type="primary" @click="changeTreeSelectData">清空选中数据</sButton>
            <sButton class="tree-select__inline" type="success" @click="changeTreeData">更新树状数据</sButton>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import mTreeSelect from '@base/TreeSelect'
import { getTreeSelectData } from '@/api/index'

export default {
    name: 'treeSelectPage',
    data () {
        return {
            treeSelected: [],
            treeData: []
        }
    },
    created () {
        this.getTreeList();
    },
    methods: {
        getTreeList() {
            getTreeSelectData().then(res => {
                const { data } = res
                this.treeData = data
            });
        },
        changeTreeSelectData() {
            this.treeSelected = []
        },
        changeTreeData() {
            this.getTreeList();
        },
        handleTreeSelectChange(list) {
            console.log('select change', list);
        },
        handleTreeSelectExpand(item) {
            console.log('toggle expand', item);
        },
        handleTreeSelectCheckChange(selectedArray, item) {
            console.log(selectedArray, item);
        },
        handleTreeSelectClick(selectArray, item) {
            console.log(selectArray, item);
        },
        loadData(item, callback) {
            getTreeSelectData().then(res => {
                const { data } = res
                callback(data)
            });
        }
    },
    components: { mTreeSelect }
}
</script>

<style lang="less">
.ivu-tree {
    padding: 0 10px;
}
</style>

<style lang="less" scoped>
.tree-select {
    &__inline {
        margin-top: 15px;
        & + & {
            margin-left: 15px;
        }
    }
}
</style>
