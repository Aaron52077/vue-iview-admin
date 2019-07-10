
<template>
    <div class="container">
        <mBreadcrumb separator=">"></mBreadcrumb>
        <div class="gc-container">
            <div class="gc-container__title">适用于处理同级页面类导航面包屑</div>
            <router-link to="/api/page/children1">页面1</router-link>
            <router-link to="/api/page/children2">页面2</router-link>
            <sDivider></sDivider>
            <sRow :gutter="16">
                <sCol span="8">
                    <div class="gc-container__h1">系统级后台权限id获取</div>
                    <sTree ref="permissionTree" :data="treeData" show-checkbox multiple></sTree>
                    <div class="tree">
                        <sButton type="primary" class="tree-inline" @click="getNodeId">获取节点id</sButton><sButton type="primary" class="tree-inline" @click="getNodePid">获取节点所有父级id</sButton>
                    </div>
                    <div class="gc-container__title">勾选节点id：{{id}}</div>
                    <div class="gc-container__title">勾选节点id、当前节点父级id集合：{{parentIds}}</div>
                </sCol>
                <sCol span="8">
                    <div class="gc-container__h1">指令-复制</div>
                    <sInput v-model="inputVal" style="width: 60%; z-index: 0;">
                        <sButton slot="append" v-clipboard="clipOptions">复制</sButton>
                    </sInput>
                    <div class="gc-container__h1" style="margin-top: 10px;">滚动加载实例</div>
                    <sScroll class="gc-loadmore__wrapper" :on-reach-bottom="handleReachBottom">
                        <mScrollbar class="gc-loadmore__wrapper"> 
                            <sCard dis-hover v-for="(item, index) in list1" :key="index" style="margin: 10px 0">
                                Content {{ item }}
                            </sCard>
                        </mScrollbar>
                    </sScroll>
                </sCol>
                <sCol span="8">
                    <div class="gc-container__h1">指令-水波纹</div>
                    <sButton v-waves @click.native="clickHandle">Default</sButton>
                    <sButton type="primary" v-waves class="inline" @click.native="clickHandle">Primary</sButton>
                    <sButton type="dashed" v-waves class="inline" @click.native="clickHandle">Dashed</sButton>
                    <sButton type="text" v-waves class="inline" @click.native="clickHandle">Text</sButton>
                    <br><br>
                    <sButton type="info" v-waves class="inline" @click.native="clickHandle">Info</sButton>
                    <sButton type="success" v-waves class="inline" @click.native="clickHandle">Success</sButton>
                    <sButton type="warning" v-waves class="inline" @click.native="clickHandle">Warning</sButton>
                    <sButton type="error" v-waves class="inline" @click.native="clickHandle">Error</sButton>
                </sCol>
            </sRow>
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
            id: [],
            inputVal: '输入的内容',
            list1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            loadFalg: false
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
        clickHandle() {
            this.$Notice.info({
                title: '水波纹指令',
                desc: '触发水波纹'
            });
        },
        handleReachBottom() {
             return new Promise(resolve => {
                setTimeout(() => {
                    const last = this.list1[this.list1.length - 1];
                    for (let i = 1; i < 11; i++) {
                        this.list1.push(last + i);
                    }
                    resolve();
                }, 50);
            });
        },
    },
    computed: {
        clipOptions() {
            return {
                value: this.inputVal,
                success: () => {
                    this.$Message.success('复制成功')
                },
                error: () => {
                    this.$Message.error('复制失败')
                }
            }
        }
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
.inline {
    margin-left: 5px;
}

.gc-loadmore__wrapper {
    width: 100%;
    height: 300px;
}
</style>
