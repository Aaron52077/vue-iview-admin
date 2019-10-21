/* eslint-disable */
/**
 * @param [parma][数据] 
 * @param [unit][单位]
 * @returns {*}  统一返回数据带单位
 */
export const toolFormat = (parma, unit) => {
    let obj = parma[0].name + '<br />';
    for (const item of parma) {
        // es5 写法
        // obj = obj + item.marker + item.seriesName + ':' + item.value + unit + '<br />'
        obj = `${obj}${item.marker}${item.seriesName}: ${item.value}${unit}<br />`
    }
    return obj
}

/**
 * @param [parma][数据] 
 * @param [coloums][数据单位的列配置] 顺序必须同series的数据格式一致方可替换，暂不支持某一项配置
 * @returns {*}  多单位赋值
 */
export const toolFormatter = (parma, coloums = []) => {
    let obj = parma[0].name + '<br />';
    parma.forEach((item, index) => {
        // 判断要查询的数组是否至少有一个元素包含在目标数组中
        if(!!coloums[index].key && item.seriesName === coloums[index].key) {
            obj = obj + item.marker + item.seriesName + ':' + item.value + coloums[index].unit + '<br />'
        }else {
            obj = obj + item.marker + item.seriesName + ':' + item.value + '<br />'
        }
    });
  
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

/**
 * @param [parma][数据] 
 * @returns {*}  统一处理X，Y轴显示数据溢出
 */
export const toolTextFlow = (parma, len = 5) => {
    let result;
    if (parma.length > len) {
        result = `${parma.substring(0, 5)}...`
    } else {
        result = parma
    }
    return result
}