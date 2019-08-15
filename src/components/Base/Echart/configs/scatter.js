/**
 * echart 图标配置  
 * @module scatter
 * @param [type][类型] 带有涟漪特效动画的散点（气泡）图
 * @param [docs][文档] https://echarts.baidu.com/option.html#series-scatter
 * @param {Boolean} [data] - 是否有数据
 * @param {Object} [option] - 配置项
 * @returns {*}  无数据返回 / 有数据返回配置项
 */

export const EchartsScatter = (chartData, unit = '', zoomEnd = 25) => {
    let {title, legend, xAxis, series} = chartData;

    if (xAxis.length === 0) {
        return {
            data: false,
            option: {}
        }
    } else {
        let seriesData = series.map(item => {
            return {
                name: item.name,
                type: 'scatter',
                data: item.data,
                symbolSize: function (val) {
                    if(val[2] > 80) {
                        return val[2] * 0.1
                    }else {
                        return val[2] * 1
                    }
                },
                animationDelay: function (idx) {
                    return idx * 5
                }
            }
        });
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
                color: ['#F07663', '#6DA8FD'],
                legend: {
                    data: legend || [],
                    right: '8%',
                    top: '5%'
                },
                tooltip: {
                    position: 'top',
                    formatter: function (params) {
                        return params.marker + params.seriesName + '：' + params.value[2] + unit;
                    }
                },
                grid: {
                    top: '20%',
                    left: '5%',
                    bottom: '20%',
                    right: '10%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: xAxis,
                    boundaryGap: false,
                    // splitLine: {
                    //     show: false
                    // },
                    // axisTick:{
                    //     show:false
                    // },
                    axisLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'category',
                    data: legend.reverse(),
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show:false
                    },
                    splitLine:{
                        show: true,
                        lineStyle: {
                            color: '#999',
                            type: 'dashed'
                        }
                    }
                },
                dataZoom: [
                    {
                        show: xAxis.length >= 10 ? true : false,
                        height: 15,
                        xAxisIndex: [0],
                        bottom: 15,
                        start: 0,
                        end: xAxis.length >= 10 ? zoomEnd : 100,
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
                        end: 45,
                        moveOnMouseMove: false,
                        zoomOnMouseWheel: false,
                        moveOnMouseWheel: false
                    }
                ],
                series: seriesData
            }
        }
    }
}