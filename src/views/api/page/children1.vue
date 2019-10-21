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
                        <!-- @contextmenu.prevent.native="contextMenu($event, index)" 自定义右键指令demo -->
                        <sTag v-for="(item, index) in data1"
                            ref="tags"
                            type="dot"
                            color="primary"
                            :key="index"
                            :name="item.name"
                            v-contextmenu="menudata">{{item.name}}</sTag>
                    </div>
                </sCol>
            </sRow>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import mBreadcrumb from '@base/Breadcrumb'
import directives from '@/directive/install'

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
    directives: { contextmenu: directives.contextmenu },
    components: { mBreadcrumb }
}
</script>

<style lang="less">
.gc-demo__block {
    position: relative;
}
.contextmenu {
    position: absolute;
    margin: 0;
    padding: 5px 0;
    background: #fff;
    z-index: 1000;
    list-style-type: none;
    border-radius: 4px;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .1);
    li {
        margin: 0;
        padding: 5px 15px;
        cursor: pointer;
        &:hover {
            background: #eee;
        }
    }
}
</style>