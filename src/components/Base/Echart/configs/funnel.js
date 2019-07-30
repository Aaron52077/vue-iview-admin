/**
 * echart 图标配置  
 * @module funnel
 * @param [type][类型] 漏斗图
 * @param [docs][文档] https://echarts.baidu.com/option.html#series-funnel
 * @param {Boolean} [data] - 是否有数据
 * @param {Object} [option] - 配置项
 * @returns {*}  无数据返回 / 有数据返回配置项
 */

export const EchartsFunnel = (chartData) => {
    let {title, xAxis, series} = chartData;
    
    if (series.length === 0) {
        return {
            data: false,
            option: {}
        }
    } else {
        let xAxisData = xAxis.map((item, index) => { 
            return [{x:`${84 - index * 6}%`,y:`${85 - index * 15}%`},{x:'86%',y:`${85 - index * 15}%`,value: `数量${item}人`,lineStyle:{color:'#000'}}]
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
                color: ['#5279E6', '#AEC2FA'],
                grid: {
                    left: '10%',
                    right: '10%',
                    bottom: '3%',
                    containLabel: true
                },
                series: [
                    {
                        type: 'funnel',
                        left: '25%',
                        right: '30%',
                        top: '15%',
                        bottom: '5%',
                        minSize: '0%',
                        maxSize: '130%',
                        sort: 'ascending',
                        gap: 2,
                        label: {
                            show: true,
                            position: 'inside',
                            padding: [15, 0, 0, 0]
                        },
                        labelLine: {
                            length: 10,
                            lineStyle: {
                                width: 1,
                                type: 'solid'
                            }
                        },
                        itemStyle: {
                            borderColor: '#fff',
                            borderWidth: 1
                        },
                        markLine: {
                            symbol: 'none',
                            lineStyle: {type: 'solid'},
                            data: xAxisData
                        },
                        data: series
                    }
                ]
            }
        }
    }
}