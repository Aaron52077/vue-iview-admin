import echarts from 'echarts'
/**
 * echart 图标配置  
 * @module line
 * @param [type][类型] 折线/面积图 
 * @param [docs][文档] https://echarts.baidu.com/option.html#series-line
 * @param {Boolean} [data] - 是否有数据
 * @param {Object} [option] - 配置项
 * @returns {*}  无数据返回 / 有数据返回配置项
 */
import { toolFormatter } from '../util';
export const EchartsLine = (chartData, coloums = []) => {
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
                color: ['#F29746', '#4FABE5'],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '12%',
                    containLabel: true
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function(parma) {
                        return toolFormatter(parma, coloums)
                    }
                },
                legend: {
                    bottom: 10,
                    itemWidth: 20,
                    itemHeight: 10,
                    data: legend || []
                },
                xAxis: [
                    {
                        axisTick:{ show: false },
                        type : 'category',
                        boundaryGap: false,
                        data : xAxis || []
                    }
                ],
                yAxis: {
                    type: 'value',
                    min: 0,
                    splitLine: {show: false}
                },
                series: series.map(n => {
                    return {
                        name: n.name,
                        type: 'line',
                        data: n.data
                    }
                })
            }
        } 
    }
}

export const EchartsLineOpt1 = (chartData) => {
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
                color: ['#F4A45C','#4FABE5'],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                },
                legend: {
                    align: 'right',
                    right: 15,
                    top: 15,
                    itemWidth: 20,
                    itemHeight: 10,
                    data: legend || []
                },
                xAxis: [
                    {
                        axisTick:{ show: false },
                        axisLine:{ show: false },
                        type : 'category',
                        boundaryGap: false,
                        data : xAxis || []
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        min: 0,
                        axisTick: {
                            show: false
                        },
                        axisLine:{
                            show: false
                        },
                        splitLine: {
                            show: true,
                            color: '#EEEEEE'
                        }
                    }
                ],
                series: [
                    {
                        name: (series[0] || {}).name || '',
                        type: 'line',
                        smooth: false,
                        symbol: 'circle',
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 3
                            }
                        },
                        // 折线Y轴渐变
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(79,171,229, 0.3)'
                                }, {
                                    offset: 0.8,
                                    color: 'rgba(79,171,229, 0)'
                                }], false),
                                shadowColor: 'rgba(79,171,229, 0.1)',
                                shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgb(79,171,229)',
                                borderColor: 'rgba(231,235,234, 0.15)',
                                borderWidth: 12
                            }
                        },
                        data: (series[0] || {}).data || []
                    },
                    {
                        name: (series[1] || {}).name || '',
                        type: 'line',
                        smooth: false,
                        symbol: 'circle',
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 3
                            }
                        },
                        // 折线Y轴渐变
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(245,177,117, 0.3)'
                                }, {
                                    offset: 0.8,
                                    color: 'rgba(245,177,117, 0)'
                                }], false),
                                shadowColor: 'rgba(245,177,117, 0.1)',
                                shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgb(244,164,92)',
                                borderColor: 'rgba(244, 164, 92, 0.15)',
                                borderWidth: 12
                            }
                        },
                        data: (series[1] || {}).data || []
                    }
                ]
            }
        } 
    }
}