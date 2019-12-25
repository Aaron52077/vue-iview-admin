/* eslint-disable */ 
// 数据脱敏处理
export function desensitization(str, begin, end) {
    let tempStr = '';
    if(typeof str === 'string' && !!str) {
        let len = str.length;
        var firstStr = str.substr(0, begin);
        var lastStr = str.substr(end);
        var middleStr = str.substring(begin, len - Math.abs(end)).replace(/[\s\S]/g, '*');
        
        tempStr = firstStr + middleStr + lastStr;
        return tempStr;
    }
    return tempStr;
}

export function desensitizationName(str) {
    let tempStr = '';
    if(typeof str === 'string' && !!str) {
        let len = str.length;
        tempStr = str.substr(0, 1) + str.substring(1, len).replace(/[\s\S]/g, '*');
        return tempStr;
    }
    return tempStr;
}

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
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export const filterObj = (obj) => {
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

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
    const keysArr1 = Object.keys(obj1)
    const keysArr2 = Object.keys(obj2)
    if (keysArr1.length !== keysArr2.length) return false
    else if (keysArr1.length === 0 && keysArr2.length === 0) return true
    /* eslint-disable-next-line */
    else return !keysArr1.some(key => obj1[key] != obj2[key])
}

// scrollTop animation
export const scrollTop = (el, from = 0, to, duration = 500, endCallback) => {
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
export const getExplorer = () => {
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