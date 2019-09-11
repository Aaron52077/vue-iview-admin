//  过滤上万数据
export function toThousand(num) {
    return num >= 10000 ? (num / 10000).toFixed(1) + '万' : num
}

// 过滤千分符
export function toThousandFilter(num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

// 时间数字转字符
export function getTimeStr(t) {
    var result = "";
    if (+t >= 0) {
        var h = parseInt(parseInt(t) / 3600);
        var m = parseInt(parseInt(parseInt(t) - h * 3600) / 60);
        result = (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m);
    }
    return result;
}

// 时间字符转数字
export function getTimeInt(time) {
    if (time) {
        var time_str = time.split(':');
        return (parseInt(time_str[0]) || 0) * 3600 + (parseInt(time_str[1]) || 0) * 60
    }
}

// 格式化文件大小
export function renderFileSize(size) {
    if (!size) {
        return '0B';
    }
    if (size > 999999) {
        return parseInt(size / 1000000) + "MB"
    }
    if (size > 999) {
        return parseInt(size / 1000) + "KB"
    }
    if (size < 1000) {
        return size + "B"
    }
    return size;
}

// 日期对象格式化
export function dateToStr(date, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    if (typeof date != 'object') return '';

    cFormat = cFormat || 'yyyy-MM-dd';
    var formatObj = {
        M: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds()
    };
    cFormat = cFormat.replace(/(M+|d+|h+|m+|s+)/g, (result) => {
        return ((result.length > 1 ? "0" : "") + formatObj[result.slice(-1)]).slice(-2)
    });
    return cFormat.replace(/(y+)/g, (result) => {
        return date.getFullYear().toString().slice(-result.length)
    });
}

// unix时间格式化 时间戳
export function unixToStr(data, cFormat) {
    var val = `${data}` || '';
    val = val.replace(/@1/g, '');
    val = val.replace(/@2/g, '');
    cFormat = cFormat || 'yyyy-MM-dd hh:mm';
    var result = (val.length < 12 ? parseInt(val) * 1000 : parseInt(val)) || 0;
    return dateToStr(new Date(result), cFormat);
}

export function getTodayBefore(day) {
    var timeStamp = new Date(new Date().setHours(12, 0, 0, 0));
    return unixToStr(timeStamp - 86400000 * day, 'yyyy-MM-dd');
}

// 毫秒转小时
export function getSec2Hours(val) {
    var t = getTimeStr(val).split(':')
    var m = parseInt(t[0]) + (parseFloat((parseInt(t[1]) / 60).toFixed(1)) || '');
    return parseFloat(m) || 0;
}

// 计算时长
export function getTimeLength(val, offset) {
    const arr = (`${val}`).split(',');
    let val1 = parseInt(arr[0]) || 0,
        val2 = parseInt(arr[1]) || 0;
    let result = (val1 > 0 && val2 > val1 ? (val2 - val1) : 0) + (offset || 0);
    let hours = getSec2Hours(result);
    let days = parseFloat((hours / 24).toFixed(1)) || 0;
    return { hours: hours, days: days }
}

// 小写金额转大写
export function moneyFormat(num) {
    if (isNaN(num)) return '';
    var strPrefix = '';
    if (num < 0) strPrefix = '(负)';
    num = Math.abs(num);
    if (num >= 1000000000000) return '';
    var strOutput = '';
    var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
    var strCapDgt = '零壹贰叁肆伍陆柒捌玖';
    num += "00";
    var intPos = num.indexOf('.');
    if (intPos >= 0) {
        num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
    }
    strUnit = strUnit.substr(strUnit.length - num.length);
    for (let i = 0, len = num.length; i < len; i++) {
        strOutput += strCapDgt.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
    }
    return strPrefix + strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, '零元')
}

// 保留2位小数精度问题 建议使用mathjs工具包
export const toFixed = (num, n) => {
    let flag = 1
    if (num < 0) {
       flag = -1
       num *= -1
    }
    num = Math.round(num * Math.pow(10, n)) / Math.pow(10, n)+ Math.pow(10, -(n + 1));
    return (num * flag).toFixed(n)
}
