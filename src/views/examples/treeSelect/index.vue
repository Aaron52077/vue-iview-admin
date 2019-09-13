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
        <sDivider></sDivider>
        <div class="gc-container">
            <div class="gc-container__h1">场景1：服务端返回单层部门回显，ep：默认返回为部门ID为{{deptId}}</div>
            <sCascader
                v-model="deptArr"
                style="width: 280px;" 
                placeholder="请选择部门"  
                :data="treeTemp"
                transfer 
                change-on-select
                @on-change="handleChange"></sCascader>
            <sButton class="tree-select__inline" type="primary" @click="handleReset">重置默认项</sButton>
            <div class="gc-container__h1" style="margin-top: 10px;">选择数据源：{{deptArr}}, 默认筛选父级得到层级节点数据：{{parentIds}}</div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import mTreeSelect from '@base/TreeSelect'
import { getTreeSelectData } from '@/api/index'
import { uniqueArr } from '@/utils'
import { treeTemp } from './tree.js'

export default {
    name: 'treeSelectPage',
    data () {
        return {
            treeSelected: [],
            treeData: [],
            treeTemp,
            deptId: '205',
            deptArr: [],
            parentIds: []
        }
    },
    created () {
        this.getTreeList();
        this.handleReset();
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
        },
        handleReset() {
            this.deptArr = [];
            let deptIds = this.deptId.split(',');
            this.getNodePid(deptIds);
        },
        getNodePid(arr = []) {
            const checkedNodes = arr;
            /* 获取选中项的所有父级 */
            let tmpIds = [];  
            checkedNodes.map(item => {
                const parents = this.getParentIds(this.treeTemp, item);
                tmpIds = tmpIds.concat(parents);
            });
            
            checkedNodes.map(item => {
                tmpIds.push(item);
            });
            
            /* 去重，checkNodeIds即为选中所有节点的id集合 */
            this.parentIds = uniqueArr(tmpIds);
            this.deptArr = uniqueArr(tmpIds);
        },
        /**    
        * 获取某节点的所有父节点
        */
        getParentIds(data, id) {
            let ids = [];
            function loop(json) {
                for (const obj of json) {
                    if (obj.children && obj.children.length > 0) {
                        if (JSON.stringify(obj).match(id)) {
                            ids.push(obj.value);
                        }
                        if(obj.parent_id !== id) {
                            loop(obj.children);
                        } else {
                            break;
                        }
                    }
                }
            };
            loop(data);
            return ids
        },
        handleChange(data) {
            this.deptArr = data;
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
