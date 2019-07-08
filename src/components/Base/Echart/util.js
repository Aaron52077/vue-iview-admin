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