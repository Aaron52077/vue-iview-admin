<template>
    <sModal class="gc-dia-main" width="615" v-model="currentValue" transfer :mask-closable="false">
        <div slot="header" class="gc-dia-title">预约模拟大厅</div>
        <div class="gc-dia-body">
            <el-table-hall :head-tool="toolList" :sheet-data="seatData" @on-click="onClick" />
            <sRow type="flex" justify="center">
                <sCol span="8">
                    <div class="gc-seat__types">
                        <img class="type-icon" src="~@/assets/img/seat_normal.png" />
                        <div class="type-title">可预约</div>
                    </div>
                </sCol>
                <sCol span="8">
                    <div class="gc-seat__types">
                        <img class="type-icon" src="~@/assets/img/seat_select.png" />
                        <div class="type-title">已预约</div>
                    </div>
                </sCol>
                <sCol span="8">
                    <div class="gc-seat__types">
                        <img class="type-icon" src="~@/assets/img/seat_using.png" />
                        <div class="type-title">不可预约</div>
                    </div>
                </sCol>
            </sRow>
        </div>
        <div slot="footer" class="gc-dia-foot">
            <sButton size="large" class="gc-btn-text gc-btn-no" type="text" @click="handleCancel">取消</sButton>
            <sButton size="large" class="gc-btn-text gc-btn-yes" type="text" @click="handleConfirm">确定</sButton>
        </div>
    </sModal>
</template>

<script>
/* eslint-disable */
import elTableHall from '@base/Icon/table'

export default {
    name: 'seat-modal',
    model: {
        prop: 'value',
        event: 'change'
    },
    data() {
        return {
            toolLists: this.toolList,
            seatList: [] // 座位对象list
        }
    },
    computed: {
        currentValue: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('change', val)
            }
        }
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        seatData: {
            type: Array,
            default: () => []
        },
        toolList: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        handleCancel() {
            this.$store.state.seat.cachedSeats = []
            this.currentValue = false
        },
        handleConfirm() {
            if (this.seatList.length === 0) {
                this.$Notice.error({ title: '温馨提示', desc: '您当前未选择座位' });
                return;
            }
            // 处理排序时间参数
            let sortList = this.seatList.sort((a, b) => parseInt(a.col) - parseInt(b.col));
            // 传出对应参数
            this.$emit('on-confirm', {
                seatNo: this.seatList[0].row,
                timeIndexStr: this.seatList.map(item => item.col).join(',')
            });
            this.currentValue = false;
        },
        onClick(data) {
            this.seatList = data
        },
        array2Equal(arr1, arr2) {
            // 不同数组，取交集
            let result = [];
            arr2.forEach(item => {
                if (arr1.some(m => m.col == item.index)) {
                    result.push(item)
                }
            });
            return result;
        }
    },
    components: { elTableHall },
    watch: {
        toolList(val) {
            this.toolLists = val
        }
    }
}
</script>

<style lang="less">
.gc-seat {
    position: relative;
    &__dialog {
        padding: 15px 0 5px;
    }
    &__types {
        display: flex;
        align-items: center;
        margin: 5px 0;
        width: 100%;
        height: 24px;
        justify-content: center;
        .type-icon {
            width: 16px;
            height: 16px;
        }
        .type-title {
            padding-left: 5px;
            font-size: 13px;
        }
    }
}
</style>