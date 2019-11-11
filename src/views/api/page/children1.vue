<template>
    <div class="container">
        <mBreadcrumb separator=">"></mBreadcrumb>
        <div class="gc-container">
            <div class="gc-container__title">适用于处理同级页面类导航面包屑</div>
            <div>子页面1</div>
            <sDivider></sDivider>
            <sRow :gutter="16">
                <sCol span="12">
                    <sTable :loading="loading" size="small" :columns="columns1" :data="data1" border draggable @on-drag-drop="draggableChange"></sTable>
                    <div style="margin-top: 10px">切换 Loading 状态 <sSwitch v-model="loading"></sSwitch></div>
                </sCol>
                <sCol span="12">
                    <div class="gc-container__h1">树节点右键操作</div>
                    <div class="gc-demo__block">
                        <sTag v-for="(item, index) in data1"
                            ref="tags"
                            type="dot"
                            color="primary"
                            :key="index"
                            :name="item.name">{{item.name}}</sTag>
                    </div>
                </sCol>
            </sRow>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import mBreadcrumb from '@base/Breadcrumb'

export default {
    data () {
        return {
            loading: false,
            columns1: [
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Address',
                    key: 'address'
                }
            ],
            data1: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
                }
            ],
            menudata: {
                boxStyle: "width:100px;background:#fff;border:1px soild #eee;border-radius:3px;",
                optionStyle: "color:#333;line-height:30px;font-size:12px;",
                menus: [
                    {
                        content: "menu content",
                        callback: "callbackMethods"
                    },
                    {
                        content: "右键菜单二",
                        callback: "otherMethods"
                    }
                ]
            }
        }
    },
    methods: {
        draggableChange(index1, index2) {
            console.log(index1, index2)
        },
        callbackMethods(){
            // do something
            this.$Message.info('11111')
        },
        otherMethods(){
            // do something
            this.$Message.info('22222')
        }
    },
    components: { mBreadcrumb }
}
</script>

<style lang="less">
.gc-demo__block {
    position: relative;
}
</style>