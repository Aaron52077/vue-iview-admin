/**
 * @param [parma][数据] 
 * @param [unit][单位]
 * @returns {*}  统一返回数据带单位
 */
export const toolFormat = (parma, unit) => {
    let obj = parma[0].name + '<br />';
    for (const item of parma) {
        // obj + item.marker + item.seriesName + ':' + item.value + unit + '<br />'
        obj = `${obj}${item.marker}${item.seriesName}: ${item.value}${unit}<br />`
    }
    return obj
}

// echart 过滤回调实例
// formatter: function(params) {
//     return [
//         params[0].name,
//         params[0].marker + '消费金额：' + (params[0].value || 0) + '元',
//         params[1].marker + '消费次数: ' + (params[1].value || 0) + '次'
//     ].join('<br/>')
// }