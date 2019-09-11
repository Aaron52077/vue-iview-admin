
<template>
    <div class="container">
        <mBreadcrumb separator=">"></mBreadcrumb>
        <div class="gc-container">
            <div class="gc-container__title">适用于处理同级页面类导航面包屑</div>
            <router-link to="/api/page/children1">页面1</router-link>&nbsp;&nbsp;&nbsp;
            <router-link to="/api/page/children2">页面2</router-link>
            <sDivider></sDivider>
            <div class="gc-container__h1">Table 跨分页全选/多选</div>
            <sTable size="default"
                    ref="selection" 
                    :columns="columns2" 
                    :data="data2" 
                    highlight-row 
                    stripe 
                    @on-select-all-cancel="handleCancelSelectAll"
                    @on-select-all="handleSelectAll"
                    @on-select="handleSelect"
                    @on-select-cancel="handleCancel"></sTable>
            <div class="gc-page">
                <sPage :total="20" :current="1" size="small" show-elevator show-total @on-change="changePage"></sPage>
            </div>
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
                    <div class="gc-container__h1" style="margin-top: 10px;">保留2位或多位小数精度</div>
                    <sRow>
                        <sCol span="12">
                            <div>处理前：1.25623, 1.581, 10.05</div>
                        </sCol>
                        <sCol span="12">
                            <div>处理后：{{dataBase.toFixed(1.25623, 2)}}, {{dataBase.toFixed(1.581, 2)}}, {{dataBase.toFixed(10.05, 1)}}</div>
                        </sCol>
                    </sRow>
                </sCol>
            </sRow>
        </div>
        <router-view class="gc-loyout" :key="active"></router-view>
    </div>
</template>

<script>
/* eslint-disable */
import { remove, uniqBy, differenceBy } from 'lodash';
import mBreadcrumb from '@base/Breadcrumb'
import { uniqueArr } from '@/utils'
import { tableTemp } from './table.js'

export default {
    data () {
        return {
            selectList: [],
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
            loadFalg: false,
            data2: tableTemp.data1,
            columns2: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Status',
                    key: 'status',
                    render: (h, params) => {
                        const row = params.row;
                        const color = row.status === 1 ? 'primary' : row.status === 2 ? 'success' : 'error';
                        const text = row.status === 1 ? 'Working' : row.status === 2 ? 'Success' : 'Fail';

                        return h('sTag', {
                            props: {
                                type: 'dot',
                                color: color
                            }
                        }, text);
                    }
                },
                {
                    title: 'Sampling Time',
                    key: 'time',
                    render: (h, params) => {
                        return h('div', 'Almost' + params.row.time + '天');
                    }
                },
                {
                    title: 'Updated Time',
                    key: 'update',
                    render: (h, params) => {
                        let date = this.dataBase.dateToStr(params.row.update, 'yyyy-MM-dd');
                        return h('div', date);
                    }
                }
            ]
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
        changePage(page) {
            // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
            if(page == 1) {
                this.data2 = tableTemp.data1;
            }else {
                this.data2 = tableTemp.data2;
            }
            this.updateChecked();
        },
        handleCancel(selection, row) {
            //从已选项中去除取消项
            remove(this.selectList, n => {
                return n.id === row.id;
            });
        },
        handleSelect(selection, row) {
            //添加到已选项
            this.selectList.push(row);
        },
        handleSelectAll(selection) {
            //数组合并，有可能用户先选择了某几项，已经被我们push进去，因此数组合并需要去重一下
            this.selectList = uniqBy(this.selectList.concat(selection), "id");
        },
        handleCancelSelectAll(selection) {
            //从已选项中移除当页数据
            this.selectList = differenceBy(this.selectList, this.data2, "id");
        },
        updateChecked() {
            // 把源数据加上_checked字段，遍历已选项数据，更新选中状态
            const temp = this.dataBase.cloneDeep(this.data2);
            let tempArr = temp.reduce((arr, val) => {
                let tempObj = {_checked: false, ...val};
                if (this.selectList.length > 0) {
                    for (let key of this.selectList) {
                        if (key.id == val.id) {
                            tempObj._checked = true;
                        }
                    }
                }
                arr.push(tempObj);
                return arr;
            }, []);
            this.data2 = tempArr;
        }
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
.gc-page {
    margin: 10px;
    text-align: right;
}
</style>
