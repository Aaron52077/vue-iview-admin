<template>
    <div class="gc-container gc-panel gc-table">
        <sRow :gutter="16" class="gc-block__row">
            <sCol :xs="24" :sm="8" :lg="8">
                <div class="gc-thumb">
                    <sCarousel :autoplay-speed="4000" :height="355">
                        <sCarouselItem v-for="item in carouselImages" :key="item">
                            <img :src="item" class="gc-thumb__img">
                        </sCarouselItem>
                    </sCarousel>
                </div>
            </sCol>
            <sCol :xs="24" :sm="8" :lg="8">
                <sCard title="业务组件" icon="ios-options" :padding="0" class="gc-comp">
                    <sCellGroup>
                        <sCell v-for="(item, index) in compList1" :key="index" :title="item.name" extra="查看" :to="item.path" :icon="item.icon" />
                    </sCellGroup>
                </sCard>
            </sCol>
            <sCol :xs="24" :sm="8" :lg="8">
                <sCard title="功能组件" icon="ios-options" :padding="0" class="gc-comp">
                    <sCellGroup>
                        <sCell v-for="(item, index) in compList2" :key="index" :title="item.name" extra="查看" :to="item.path" :icon="item.icon" />
                    </sCellGroup>
                </sCard>
            </sCol>
        </sRow>
        <div class="gc-container__h1" style="margin: 10px 0;">针对预约系统演示处理，一键脱敏：
            <sSwitch true-color="#13ce66" false-color="#ff4949" @on-change="desensitizations($event)">
                <span slot="open">开</span>
                <span slot="close">关</span>
            </sSwitch>
        </div>
        <sTable 
            ref="table"
            :height="520"
            :columns="tableCols"
            :data="tableData.records"
            border />
        <!-- 操作层 -->
        <dialogModal v-model="visible" :row="rowData" />
        <!-- 选座大厅预约 -->
        <seat-hall 
            v-model="seatVisible" 
            :seat-tool="seatTool" 
            :seat-data="seatList" 
            :tool-list="toolList" 
            @on-confirm="onConfirmHandle" />
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mockTable } from '@/api'
import { compList1, compList2 } from '@/layout/config'
import dialogModal from './modal.vue'
import seatHall from './seat.vue'          // 选座大厅

export default {
    data () {
        return {
            carouselImages: [
                'https://wpimg.wallstcn.com/9679ffb0-9e0b-4451-9916-e21992218054.jpg',
                'https://wpimg.wallstcn.com/bcce3734-0837-4b9f-9261-351ef384f75a.jpg',
                'https://wpimg.wallstcn.com/d1d7b033-d75e-4cd6-ae39-fcd5f1c0a7c5.jpg',
                'https://wpimg.wallstcn.com/50530061-851b-4ca5-9dc5-2fead928a939.jpg'
            ],
            compList1,
            compList2,       // 组件列表
            visible: false,
            seatVisible: false,
            rowData: {},
            tableData: {
                total: 0,
                page: 1,
                size: 10,
                records: []     // 数据源
            },
            toolList: [],
            seatTool: [],
            seatList: [],
            tableCols: [
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
                        }, _this.dataBase.desensitization(params.row.name))
                    }
                },
                {
                    key: 'phone',
                    align: 'center',
                    title: '手机号码',
                    render: (h, params) => {
                        const _this = this
                        return h('span', _this.dataBase.desensitization(params.row.phone, { type: 'tel' }))
                    }
                },
                {
                    key: 'id',
                    align: 'center',
                    title: '身份证号',
                    render: (h, params) => {
                        const _this = this
                        return h('span', _this.dataBase.desensitization(params.row.id, { type: 'identity' }))
                    }
                },
                {
                    key: 'email',
                    align: 'center',
                    title: '邮箱地址',
                    render: (h, params) => {
                        const _this = this
                        return h('span', _this.dataBase.desensitization(params.row.email, { type: 'email', start: 2, end: -5 }))
                    }
                },
                {
                    title: '状态',
                    key: 'status',
                    render: (h, params) => {
                        const { status } = params.row;
                        const color = status === 1 ? 'primary' : status === 2 ? 'success' : 'error';
                        const text = status === 1 ? 'Working' : status === 2 ? 'Success' : 'Fail';

                        return h('sTag', {
                            props: {
                                type: 'dot',
                                color: color
                            }
                        }, text)
                    }
                },
                {
                    title: '更新时间',
                    key: 'update'
                },
                {
                    align: 'center',
                    title: '操作',
                    width: 120,
                    render: (h, params) => {
                        const _this = this
                        return h('sButton', {
                            props: {type: 'text', size: 'small'},
                            class: ['gc-btn-text'],
                            on: {
                                click() {
                                    _this.seatVisible = true
                                    _this.toolList = params.row.tool;
                                    _this.seatTool = params.row.point.map(item => item.seatNo);
                                    _this.seatList = params.row.point;
                                },
                            },
                        }, '预约')
                    }
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
        onConfirmHandle(data) {
            this.$store.state.seat.cachedSeats = [];
            this.$Message.success(`当前选座为：${data.seatNo}排${data.timeIndexStr}座`);
            this.confirmVisible = true;
        },
        ...mapMutations({
            'desensitizations': 'app/SET_SENSITIVE'
        }),
    },
    components: { dialogModal, seatHall }
}
</script>

<style lang="less">
.gc-thumb {
    &__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.gc-comp {
    width: 100%;
    height: 355px;
}
</style>