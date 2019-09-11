<template>
    <div class="container">
        <mBreadcrumb separator=">"></mBreadcrumb>
        <div class="gc-container">
            <div class="gc-container__title">适用于处理同级页面类导航面包屑</div>
            <div>子页面1</div>
            <sDivider></sDivider>
            <sRow>
                <sCol span="24">
                    <sTable :loading="loading" size="small" :columns="columns1" :data="data1" border draggable @on-drag-drop="draggableChange"></sTable>
                    <div style="margin-top: 10px">切换 Loading 状态 <sSwitch v-model="loading"></sSwitch></div>
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
            ]
        }
    },
    methods: {
        draggableChange(index1, index2) {
            console.log(index1, index2)
        }
    },
    components: { mBreadcrumb }
}
</script>