/**
 * echart 图标配置  
 * @param [type][类型] 自定义系列  
 * @param [desc] 自定义系列可以自定义系列中的图形元素渲染，从而能扩展出不同的图表
 * @param [docs][文档] https://echarts.baidu.com/option.html#series-custom
 * @returns {*}  无数据返回 / 有数据返回配置项
 */

export const EchartsLineBar = (chartData, unit = '', zoomEnd = 25) => {
    let {title, legend, xAxis, series} = chartData;
    if (series.length === 0) {
        return {
            data: false,
            option: {}
        }
    } else {
        let seriesData = series.map(item => {
            if(item.type === 'bar') {
                return {
                    name: item.name,
                    type: 'bar',
                    barWidth: 30,
                    data: item.data
                }
            }
            if(item.type === 'line') {
                return {
                    name: item.name,
                    type: 'line',
                    data: item.data,
                    smooth: true, 
                    symbolSize:8,
                    yAxisIndex: 1
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
                color: ['#3AA0FF','#EEA989','#EC6F00','#b666f4','#cf9ff1'],
                grid: {
                    top: '20%',
                    left: '3%',
                    right: '4%',
                    bottom: xAxisData.length >= 8 ? '12%' : '5%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        return [
                            params[0].name,
                            params[0].marker + '学生：' + ((params[0] || {}).value || 0) + unit,
                            params[1].marker + '教师: ' + ((params[1] || {}).value || 0) + unit,
                            params[2].marker + '师生比: ' + `1 : ${(params[1] || {}).value === 0 ? 0 : ((params[0] || {}).value / (params[1] || {}).value).toFixed(2)}`
                        ].join('<br/>')
                    }
                },
                legend: {
                    show: xAxis.length > 1 ? true : false,
                    top: 20,
                    right: 40,
                    itemWidth: 20,
                    itemHeight: 10,
                    selectedMode: false,
                    data: legend || []
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xAxis,
                        axisTick:{
                            show:false
                        },
                        axisLine:{
                            show:false
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        position: 'right',
                        min: 0,
                        axisLabel: {
                            formatter: '{value}'
                        },
                        axisTick:{
                            show:false
                        },
                        axisLine:{
                            show:false
                        }
                    },
                    {
                        type: 'value',
                        position: 'left',
                        min: 0,
                        axisLabel: {
                            formatter: '{value}'
                        },
                        axisTick:{
                            show:false
                        },
                        axisLine:{
                            show:false
                        },
                        splitLine: {show: true}
                    },
                ],
                dataZoom: [
                    {
                        show: xAxis.length >= 10 ? true : false,
                        height: 15,
                        xAxisIndex: [0],
                        bottom: 10,
                        start: 0,
                        end: xAxis.length >= 7 ? zoomEnd : 100,
                        zoomLock: false,
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
                        end: 35
                    }
                ],
                series: seriesData
            }
        }
    }
}