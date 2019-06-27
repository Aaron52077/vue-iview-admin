/**
 * echart 图标配置  
 * @module pie
 * @param [type][类型] 饼图
 * @param [docs][文档] https://echarts.baidu.com/option.html#series-pie
 * @param {Boolean} [data] - 是否有数据
 * @param {Object} [option] - 配置项
 * @returns {*}  无数据返回 / 有数据返回配置项
 */

export const EchartsPie = (chartData) => {
    let {title, series} = chartData;

    if (series.length === 0) {
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
                color: ['#37a2da','#32c5e9','#9fe6b8','#ffdb5c','#ff9f7f','#fb7293','#e7bcf3','#8378ea'],
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} :{c}元 ({d}%)"
                },
                legend: {
                    type: 'scroll',
                    bottom: '10%',
                    itemWidth: 16,
                    itemHeight: 8,
                    data: series.map((item) => {return item.name})
                },
                series: [
                    {
                        name: '金额',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        center : ['50%','60%'],
                        labelLine: {
                            normal: {
                                show: true
                            }
                        },
                        label:{
                            normal:{
                                formatter: '{c} 元'
                            }
                        },
                        data: series.map((item) => {return item.data})
                    }
                ]
            }
        }
    }
}

export const EchartsPieOpt1 = (chartData) => {
    let {title, series} = chartData;

    if (series.length === 0) {
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
                color: ['#37a2da','#32c5e9','#9fe6b8','#ffdb5c','#ff9f7f','#fb7293','#e7bcf3','#8378ea'],
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    type: 'scroll',
                    bottom: 10,
                    itemWidth: 16,
                    itemHeight: 8,
                    data: series.map((item) => {return { name: item.name, value: item.data }})
                },
                series: [
                    {
                        name: '月均消费分布',
                        type: 'pie',
                        radius : [50, 150],
                        roseType : 'area',
                        label:{
                            normal:{
                                formatter: '{c} 元'
                            }
                        },
                        data: series.map((item) => {return { name: item.name, value: item.data }})
                    }
                ]
            }
        }
    }
}