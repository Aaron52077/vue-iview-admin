/* eslint-disable */ 
// 解析时间方式2 ps:另外一种在全局过滤器中
const dateToStrParser = (date) => {
    let _date = new Date(date);
    // IE patch start (#1422)
    if (isNaN(_date.getTime()) && typeof date === 'string'){
        _date = date.split('-').map(Number);
        _date[1] += 1;
        _date = new Date(..._date);
    }
    // IE patch end

    if (isNaN(_date.getTime())) return null;
    return _date;
};

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
const objEqual = (obj1, obj2) => {
    const keysArr1 = Object.keys(obj1)
    const keysArr2 = Object.keys(obj2)
    if (keysArr1.length !== keysArr2.length) return false
    else if (keysArr1.length === 0 && keysArr2.length === 0) return true
    /* eslint-disable-next-line */
    else return !keysArr1.some(key => obj1[key] != obj2[key])
}

/**
 * @description 判断数组是否相等
 * @param {arr1, arr2}
 * @return {Boolean}
 */
export const arrayEqual = (arr1, arr2) => {
    if (arr1 === arr2) return true
    if (arr1.length !== arr2.length) return false
    for (let i = 0; i < arr1.length; ++i) {
        if (arr1[i] !== arr2[i]) return false
    }
    return true
}

// scrollTop animation
const scrollTop = (el, from = 0, to, duration = 500, endCallback) => {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60)
            }
        )
    }
    const difference = Math.abs(from - to)
    const step = Math.ceil(difference / duration * 50)

    const scroll = (start, end, step) => {
        if (start === end) {
            endCallback && endCallback()
            return
        }

        let d = (start + step > end) ? end : start + step
        if (start > end) {
            d = (start - step < end) ? end : start - step
        }

        if (el === window) {
            window.scrollTo(d, d)
        } else {
            el.scrollTop = d
        }
        window.requestAnimationFrame(() => scroll(d, end, step))
    }
    scroll(from, to, step)
}


/**
 * @returns {String} 当前浏览器名称
 */
const getBrowserType = () => {
    const ua = window.navigator.userAgent
    const isExplorer = (exp) => {
        return ua.indexOf(exp) > -1
    }
    if (isExplorer('MSIE')) return 'IE'
    else if (isExplorer('Firefox')) return 'Firefox'
    else if (isExplorer('Chrome')) return 'Chrome'
    else if (isExplorer('Opera')) return 'Opera'
    else if (isExplorer('Safari')) return 'Safari'
}

/**
 * @returns {Array} 过滤数组无关数据
 */
function bouncer(arr) {
    // Don't show a false ID to this bouncer.
    // 过滤掉数组中false, null, 0, "", undefined, NaN
    return arr.filter(value => {
        return !(!value || value === "")
    });
}

/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
const filterEmptyObj = (obj) => {
    if (!(typeof obj == 'object')) {
        return;
    }

    for (var key in obj) {
        if (obj.hasOwnProperty(key) && (obj[key] == null || obj[key] == undefined || obj[key] === '')) {
            delete obj[key];
        }
    }
    return obj;
}

// 判断数据类型
const typeOf = (data) => {      
    const toString = Object.prototype.toString;
    // 为了统一DOM节点类型输出        
    let dataType = data instanceof Element 
    ? 'element' 
    : toString.call(data)
    .replace(/\[object\s(.+)\]/, '$1')
    .toLowerCase()  
    return dataType
}

/**
 * @param {Array} 不同数组，取交集
 * @returns {Array}
 */
function array2Equal(arr1, arr2) {
    let arr = [];
    arr2.forEach(item => {
        if (arr1.some(m => m.key === item.key)) {
            arr.push(item)
        }
    });
    return arr;
}

// 简单函数回调封装
const forEach = (arr, fn) => {
    if (!arr.length || !fn) return
    let i = -1
    let len = arr.length
    while (++i < len) {
        let item = arr[i]
        fn(item, i, arr)
    }
}

// 小写金额转大写
function moneyFormat(num) {
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
const toFixed = (num, n) => {
    let flag = 1
    if (num < 0) {
       flag = -1
       num *= -1
    }
    num = Math.round(num * Math.pow(10, n)) / Math.pow(10, n)+ Math.pow(10, -(n + 1));
    return (num * flag).toFixed(n)
}