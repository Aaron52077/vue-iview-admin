
<template>
    <div class="container">
        <mBreadcrumb separator=">"></mBreadcrumb>
        <div class="gc-container">
            <div class="gc-container__title">适用于处理同级页面类导航面包屑</div>
            <router-link to="/api/page/children1">页面1</router-link>
            <router-link to="/api/page/children2">页面2</router-link>
            <sDivider></sDivider>
            <sTree ref="permissionTree" :data="treeData" show-checkbox multiple></sTree>
            <div class="tree">
                <sButton type="primary" class="tree-inline" @click="getNodeId">获取节点id</sButton><sButton type="primary" class="tree-inline" @click="getNodePid">获取节点所有父级id</sButton>
            </div>
            <div class="gc-container__title">勾选节点id：{{id}}</div>
            <div class="gc-container__title">勾选节点id、当前节点父级id集合：{{parentIds}}</div>
        </div>
        <router-view class="gc-loyout" :key="active"></router-view>
    </div>
</template>

<script>
/* eslint-disable */
import mBreadcrumb from '@base/Breadcrumb'
import { uniqueArr } from '@/utils'

export default {
    data () {
        return {
            active: '1',
            treeData: [
                {
                    id: -1,
                    title: 'parent 1',
                    expand: true,
                    selected: true,
                    children: [
                        {
                            id: 1,
                            title: 'parent 1-1',
                            expand: true,
                            children: [
                                {
                                    id: 11,
                                    title: 'leaf 1-1-1',
                                    disabled: true
                                },
                                {
                                    id: 12,
                                    title: 'leaf 1-1-2'
                                }
                            ]
                        },
                        {
                            id: 2,
                            title: 'parent 1-2',
                            expand: true,
                            children: [
                                {
                                    id: 21,
                                    title: 'leaf 1-2-1',
                                    checked: true
                                },
                                {
                                    id: 22,
                                    title: 'leaf 1-2-1'
                                }
                            ]
                        }
                    ]
                }
            ],
            parentIds: [],
            id: []
        }
    },
    methods: {
        getNodeId() {
            const checkedNodes = this.$refs.permissionTree.getCheckedNodes();
            let tmpIds = [];  
            checkedNodes.map(item => {
                tmpIds = tmpIds.concat(item.id);
            });
            this.id = tmpIds;
        },
        getNodePid() {
            const checkedNodes = this.$refs.permissionTree.getCheckedNodes();
            /* 获取选中项的所有父级 */
            let tmpIds = [];  
            checkedNodes.map(item => {
                const parents = this.getParentIds(this.treeData, item.id);
                tmpIds = tmpIds.concat(parents);
            });
            
            checkedNodes.map(item => {
                tmpIds.push(item.id);
            });
            
            /* 去重，checkNodeIds即为选中所有节点的id集合 */
            this.parentIds = uniqueArr(tmpIds);
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
                            ids.push(obj.id);
                        }
                        if(obj.id !== id) {
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
    },
    components: { mBreadcrumb }
}
</script>

<style lang="less" scoped>
.tree {
    padding: 20px 0;
    &-inline {
        margin-right: 10px;
    }
}
</style>
