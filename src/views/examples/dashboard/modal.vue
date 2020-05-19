<template>
    <sModal class="gc-dia-main" width="1000" v-model="currentValue" transfer footer-hide :mask-closable="false">
        <div slot="header" class="gc-dia-title">基本信息</div>
        <div class="gc-dia-body gc-tabs">
            <div class="gc-table gc-table-mini">
                <sTabs type="card" :animated="false" v-model="activeTab" @on-click="onTabClick">
                    <sTabPane label="柱状图" name="bar1">
                        <div class="echart-block">
                            <mEchart v-if="barObj1.data" :optionObj="barObj1.option" />
                        </div>
                    </sTabPane>
                    <sTabPane label="线形图" name="line1">
                        <div class="echart-block">
                            <mEchart v-if="lineObj1.data" :optionObj="lineObj1.option" />
                        </div>
                    </sTabPane>
                </sTabs>
            </div>
        </div>
    </sModal>
</template>

<script>
/* eslint-disable */
import { echartBarAPI, echartLineAPI } from '@/api/echarts'
import { EchartsBarOpt1 } from '@base/Echart/configs/bar'
import { EchartsLineOpt1 } from '@base/Echart/configs/line'

export default {
    name: 'dashboard-modal',
    model: {
        prop: 'value',
        event: 'change'
    },
    data() {
        return {
            activeTab: 'bar1',
            barObj1: {
                data: false,
                option: {}
            }, 
            lineObj1: {
                data: false,
                option: {}
            }
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
        row: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    methods: {
        onTabClick(name) {
            if (name === 'bar1') {
                echartBarAPI().then(res => {
                    this.barObj1 = EchartsBarOpt1(res.data);
                });
            } else {
                echartLineAPI().then(res => {
                    this.lineObj1 = EchartsLineOpt1(res.data);
                });
            }
        }
    },
    watch: {
        row: {
            handler(val, oldVal) {
                if (val.id) {
                    this.activeTab = 'bar1';
                    this.onTabClick('bar1');
                }
            },
            immediate: true
        }
    },
}
</script>