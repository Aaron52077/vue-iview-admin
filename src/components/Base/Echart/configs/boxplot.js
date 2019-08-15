/**
 * echart 图标配置  
 * @module boxplot
 * @param [type][类型] 『箱形图』、『盒须图』、『盒式图』、『盒状图』、『箱线图』
 * @param [docs][文档] https://echarts.baidu.com/option.html#series-boxplot
 * @param {Boolean} [data] - 是否有数据
 * @param {Object} [option] - 配置项
 * @returns {*}  无数据返回 / 有数据返回配置项
 */
/* eslint-disable */
import echarts from "echarts";
import 'echarts/dist/extension/dataTool.js'

export const EchartsBoxplot = (chartData, unit = '', zoomEnd = 25) => {
    let {title, xAxis, series} = chartData;
    if (xAxis.length === 0) {
        return {
            data: false,
            option: {}
        }
    } else {
        let seriesData = echarts.dataTool.prepareBoxplotData(series);
        return {
            data: true,
            option: {
                title: {
                    text: title || '',
                    textStyle: {
                        color: '#1D83DD',
                        fontWeight: 500,
                        fontSize: 20
                    },
                    padding: 15
                },
                grid: {
                    left: '3%',
                    right: '3%',
                    bottom: xAxis.length > 8 ? '8%' : '3%',
                    containLabel: true
                },
                tooltip : {
                    trigger: 'item',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                dataZoom: [
                    {
                        show: xAxis.length > 8 ? true : false,
                        height: 15,
                        xAxisIndex: [0],
                        bottom: 10,
                        start: 0,
                        end: zoomEnd,
                        zoomLock: true,
                        showDetail: false,
                        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                        handleSize: '100%',
                        handleStyle: {
                            color: "#9FA2A8"
                        },
                        textStyle: {
                            color: "#9FA2A8"
                        },
                        borderColor: "#90979c"
                    }, 
                    {
                        type: "inside",
                        show: true,
                        height: 15,
                        start: 1,
                        end: 35,
                        moveOnMouseMove: false,
                        zoomOnMouseWheel: false,
                        moveOnMouseWheel: false
                    }
                ],
                xAxis: {
                    type: 'category',
                    data: xAxis,
                    boundaryGap: true,
                    nameGap: 30,
                    splitArea: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value}'
                    },
                    axisLine: {
                        show:false,
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '',
                    splitArea: {
                        show: true
                    },
                    axisLine: {
                        show:false,
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true
                    }
                },
                series: [{
                    name: 'boxplot',
                    type: 'boxplot',
                    data: seriesData.boxData,
                    tooltip: {
                        formatter: function (param) {
                            return [
                                param.name,
                                param.marker + '最大分数: ' + param.data[5].toFixed(2) + unit,
                                param.marker + '最小分数: ' + param.data[1].toFixed(2) + unit,
                                param.marker + '平均分数: ' + param.data[3].toFixed(2) + unit,
                            ].join('<br/>')
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#7DBFF9',
                            borderColor: '#218DEE'
                        },
                        label : {  
                            show : false  
                        },  
                        labelLine : {  
                            show : false  
                        } 
                    } 
                }]
            }
        }
    }
}