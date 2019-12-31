<template>
    <div class="gc-container gc-panel gc-table">
        <sTable 
            ref="table"
            :height="520"
            :columns="tableCols"
            :data="tableData.records"
            border
            @on-select-all-cancel="onSelectCancel"
            @on-select-all="onSelectAll"
            @on-select="onSelect"
            @on-select-cancel="onDelteteSelect" />
        <!-- 操作层 -->
        <dialogModal v-model="visible" :row="rowData" />
    </div>
</template>

<script>
import { mockTable } from '@/api'
import dialogModal from './modal.vue'

export default {
    data () {
        return {
            visible: false,
            rowData: {},
            tableData: {
                total: 0,
                page: 1,
                size: 10,
                records: []     // 数据源
            },
            tableCols: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    type: 'index',
                    width: 65,
                    title: '序号'
                },
                {
                    key: 'name',
                    align: 'center',
                    title: '姓名',
                    render: (h, params) => {
                        const _this = this
                        return h('sButton', {
                            props: {type: 'text', size: 'small'},
                            class: ['gc-btn-text'],
                            on: {
                                click() {
                                    _this.visible = true
                                    _this.rowData = params.row
                                },
                            },
                        }, params.row.name)
                    }
                },
                {
                    title: '状态',
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
                        }, text)
                    }
                },
                {
                    title: '计划时间',
                    key: 'time'
                },
                {
                    title: '更新时间',
                    key: 'update'
                }
            ]
        }
    },
    created() {
        this.getTableData();
    },
    methods: {
        getTableData() {
            mockTable().then(res => {
                this.tableData.records = res.data
            });
        },
        onSelect() {

        },
        onSelectAll() {

        },
        onDelteteSelect() {

        },
        onSelectCancel() {

        }
    },
    components: { dialogModal }
}
</script>