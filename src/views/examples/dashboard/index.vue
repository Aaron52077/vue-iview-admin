<template>
    <div class="gc-container gc-panel gc-table">
        <div class="gc-container__h1">针对系统演示处理，一键脱敏：
            <sSwitch true-color="#13ce66" false-color="#ff4949" @on-change="desensitization($event)">
                <span slot="open">开</span>
                <span slot="close">关</span>
            </sSwitch>
        </div>
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
import { mapGetters, mapMutations } from 'vuex'
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
                    width: 120,
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
                        }, _this.sensitive ? _this.dataBase.desensitizationName(params.row.name) : params.row.name)
                    }
                },
                {
                    key: 'id',
                    align: 'center',
                    title: '身份证号',
                    render: (h, params) => {
                        const _this = this
                        return h('span', _this.sensitive ? _this.dataBase.desensitization(params.row.id, 3, -3) : params.row.id)
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
    computed: {
        ...mapGetters([
            'sensitive'
        ])
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

        },
        ...mapMutations({
            'desensitization': 'app/SET_SENSITIVE'
        })
    },
    components: { dialogModal }
}
</script>