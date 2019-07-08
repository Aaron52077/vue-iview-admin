/**
 * echart 图标配置  
 * @module bar
 * @param [type][类型] 柱状/条形图
 * @param [docs][文档] https://echarts.baidu.com/option.html#series-bar
 * @param {Boolean} [data] - 是否有数据
 * @param {Object} [option] - 配置项
 * @returns {*}  无数据返回 / 有数据返回配置项
 */
import echarts from "echarts";
import { toolFormat } from '../util';

export const EchartsBar = (chartData, zoomEnd = 25, unit = '人', color = ['#4FABE5','#F4A45C']) => {
    let {title, legend, xAxis, series} = chartData;

    if (xAxis.length === 0) {
        return {
            data: false,
            option: {}
        }
    } else {
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
                color: color,
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: xAxis.length >= 7 ? '10%' : '3%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type : 'line', // line or shadow
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    formatter: function(parma) {
                        return toolFormat(parma, unit)
                    }
                },
                legend: {
                    show: legend.length > 1 ? true : false,
                    align: 'right',
                    right: 15,
                    top: 15,
                    itemWidth: 20,
                    itemHeight: 10,
                    data: legend || []
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xAxis
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                dataZoom: [
                    {
                        show: xAxis.length >= 7 ? true : false,
                        height: 15,
                        xAxisIndex: [0],
                        bottom: 10,
                        start: 0,
                        end: xAxis.length >= 7 ? zoomEnd : 100,
                        // zoomLock: true,
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
                        end: 35
                    }
                ],
                series: series.map(item => {
                    return {
                        name: item.name,
                        barWidth: 30,
                        type: 'bar',
                        data: item.data
                    }
                })
            }
        }
    }
}

export const EchartsBarOpt1 = (chartData, zoomEnd = 25, unit = '分', color = ['#209DFC', '#13BDE8']) => {
    let {title, legend, xAxis, series} = chartData;

    if (xAxis.length === 0) {
        return {
            data: false,
            option: {}
        }
    } else {
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
                color: color,
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: xAxis.length >= 7 ? '10%' : '3%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    formatter: function(parma) {
                        return toolFormat(parma, unit)
                    }
                },
                legend: {
                    show: legend.length > 1 ? true : false,
                    align: 'right',
                    right: 15,
                    top: 15,
                    itemWidth: 20,
                    itemHeight: 10,
                    data: legend || []
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick:{
                            show:false
                        },
                        axisLine:{
                            show:false
                        },
                        data: xAxis
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        },
                        axisTick:{
                            show:false
                        },
                        axisLine:{
                            show:false
                        }
                    }
                ],
                dataZoom: [
                    {
                        show: xAxis.length >= 7 ? true : false,
                        height: 15,
                        xAxisIndex: [0],
                        bottom: 10,
                        start: 0,
                        end: xAxis.length >= 7 ? zoomEnd : 100,
                        // zoomLock: true,
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
                        end: 35
                    }
                ],
                series: series.map(item => {
                    return {
                        name: item.name,
                        barWidth: 30,
                        type: 'bar',
                        itemStyle : {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: color[0]},                   //柱图渐变色
                                        {offset: 1, color: color[1]},                   //柱图渐变色
                                    ]
                                )
                            },
                        },
                        data: item.data
                    }
                })
            }
        }
    }
}