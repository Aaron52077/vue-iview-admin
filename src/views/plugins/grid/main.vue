<template>
    <div class="gc-panel">
        <div class="gc-panel__title">桌面拖拽式布局</div>
        <sDivider></sDivider>
        <grid-layout
            v-bind="layout"
            @layout-updated="layoutUpdatedHandler">
            <grid-item
                v-for="(item, index) in layout.layout"
                :key="index"
                v-bind="item"
                @resize="resizeHandler"
                @move="moveHandler"
                @resized="resizedHandler"
                @moved="movedHandler">
                <sCard dis-hover class="layout-card">
                    <sTag size="medium" color="primary" slot="title">Card {{item.i}}</sTag>
                    <template v-if="item.i === '0'">
                        <div class="gc-container__h1">拖拽卡片调整位置</div>
                        <div class="gc-container__h1">在控制台打印出数据变化</div>
                    </template>
                    <template v-else>
                        <sRadioGroup v-model="typeActive" type="button" size="small" slot="extra" @on-change="changeType">
                            <sRadio v-for="item in chartsType" :label="item | vecharts" :key="item"></sRadio>
                        </sRadioGroup>
                        <div class="layout-card__item">
                            <ve-chart :data="chartData" :judge-width="true" :settings="chartSettings" v-bind="pubSetting"></ve-chart>
                        </div>
                    </template>
                </sCard>
            </grid-item>
        </grid-layout>
    </div>
</template>

<script>
/* eslint-disable */
import { GridLayout, GridItem } from 'vue-grid-layout'
import vCharts from '@/components/mixins/v-charts.js'

export default {
    mixins: [vCharts],
    data() {
        return {
            layout: {
                layout: [
                    { 'x': 0, 'y': 0, 'w': 3, 'h': 11, 'i': '0' },
                    { 'x': 3, 'y': 0, 'w': 3, 'h': 11, 'i': '1' },
                    { 'x': 6, 'y': 0, 'w': 3, 'h': 11, 'i': '2' },
                    { 'x': 9, 'y': 0, 'w': 3, 'h': 11, 'i': '3' },
                    { 'x': 0, 'y': 11, 'w': 3, 'h': 11, 'i': '4' },
                    { 'x': 3, 'y': 11, 'w': 3, 'h': 11, 'i': '5' },
                    { 'x': 6, 'y': 11, 'w': 3, 'h': 11, 'i': '6' },
                    { 'x': 9, 'y': 11, 'w': 3, 'h': 11, 'i': '7' }
                ],
                colNum: 12,
                rowHeight: 30,
                isDraggable: true,
                isResizable: false,
                isMirrored: false,
                verticalCompact: true,
                margin: [10, 10],
                useCssTransforms: true
            },
            chartsType: ['histogram', 'line', 'pie'],
            typeActive: '柱状图',
            chartSettings: {
                type: 'histogram'
            },
            chartData: {
                columns: ['日期', '访问用户'],
                rows: [
                    { '日期': '1月1日', '访问用户': 1523 },
                    { '日期': '1月2日', '访问用户': 1223 },
                    { '日期': '1月3日', '访问用户': 2123 },
                    { '日期': '1月4日', '访问用户': 4123 },
                    { '日期': '1月5日', '访问用户': 3123 },
                    { '日期': '1月6日', '访问用户': 7123 }
                ]
            },
        }
    },
    components: { 
        'grid-layout': GridLayout,
        'grid-item': GridItem
    },
    mounted () {
        // 加载完成后显示提示
        this.showInfo()
    },
    methods: {
        log(arg1 = 'log', ...logs) {
            if (logs.length === 0) {
                console.log(arg1)
            } else {
                console.group(arg1)
                logs.forEach(e => {
                    console.log(e)
                })
                console.groupEnd()
            }
        },
        // 显示提示
        showInfo() {
            this.$Notice.success({
                title: '提示',
                desc: '你可以按住卡片拖拽改变位置，调整卡片大小'
            });
        },
        // 测试代码
        layoutUpdatedHandler(newLayout) {
            console.group('layoutUpdatedHandler')
            newLayout.forEach(e => {
                console.log(`{'x': ${e.x}, 'y': ${e.y}, 'w': ${e.w}, 'h': ${e.h}, 'i': '${e.i}'},`)
            })
            console.groupEnd()
        },
        resizeHandler(i, newH, newW) {
            this.log('resizeHandler', `i: ${i}, newH: ${newH}, newW: ${newW}`)
        },
        moveHandler(i, newX, newY) {
            this.log('moveHandler', `i: ${i}, newX: ${newX}, newY: ${newY}`)
        },
        resizedHandler(i, newH, newW, newHPx, newWPx) {
            this.log('resizedHandler', `i: ${i}, newH: ${newH}, newW: ${newW}, newHPx: ${newHPx}, newWPx: ${newWPx}`)
        },
        movedHandler(i, newX, newY) {
            this.log('movedHandler', `i: ${i}, newX: ${newX}, newY: ${newY}`)
        },
        changeType(name) {
            const stateMap = {
                '柱状图': 'histogram',
                '线图': 'line',
                '饼图': 'pie'
            }
            this.chartSettings = { type: stateMap[name] }
        }
    },
    filters: {
        vecharts(val) {
            const stateMap = {
                'histogram': '柱状图',
                'line': '线图',
                'pie': '饼图'
            }
            return stateMap[val]
        }
    }
}
</script>

<style lang="less">
.layout-card {
    width: 100%;
    height: 100%;
    &__item {
        width: 100%;
        height: 400px; 
    }
}
</style>
