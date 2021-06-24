import store from '@/store';

//  过滤上万数据
export function toThousand(value) {
  if (value === null || value == '') {
    return '0';
  }
  value = parseFloat(value);
  return value >= 10000 ? (value / 10000).toFixed(1) + '万' : value;
}

/**
 * 10000 => "10,000" 过滤千分符
 * @param {number} num
 */
export function toThousands(value) {
  return (+value || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}

// 时间数字转字符
export function getTimeStr(t) {
  var result = '';
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
    return (parseInt(time_str[0]) || 0) * 3600 + (parseInt(time_str[1]) || 0) * 60;
  }
}

// 格式化文件大小
export function readFileSize(value) {
  if (value === null || value === '') {
    return '0B';
  }
  value = parseFloat(value);
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const formatter = (value, power) => {
    return (value / Math.pow(1024, power)).toFixed(2) + units[power];
  };
  const index = Math.floor(Math.log(value) / Math.log(1024)) || 0;
  return formatter(value, index);
}

// 日期对象格式化
export function dateToStr(date, cFormat) {
  if (arguments.length === 0) {
    return null;
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
  cFormat = cFormat.replace(/(M+|d+|h+|m+|s+)/g, result => {
    return ((result.length > 1 ? '0' : '') + formatObj[result.slice(-1)]).slice(-2);
  });
  return cFormat.replace(/(y+)/g, result => {
    return date
      .getFullYear()
      .toString()
      .slice(-result.length);
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
  var t = getTimeStr(val).split(':');
  var m = parseInt(t[0]) + (parseFloat((parseInt(t[1]) / 60).toFixed(1)) || '');
  return parseFloat(m) || 0;
}

// 计算时长
export function getTimeLength(val, offset) {
  const arr = `${val}`.split(',');
  let val1 = parseInt(arr[0]) || 0,
    val2 = parseInt(arr[1]) || 0;
  let result = (val1 > 0 && val2 > val1 ? val2 - val1 : 0) + (offset || 0);
  let hours = getSec2Hours(result);
  let days = parseFloat((hours / 24).toFixed(1)) || 0;
  return { hours: hours, days: days };
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
  num += '00';
  var intPos = num.indexOf('.');
  if (intPos >= 0) {
    num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
  }
  strUnit = strUnit.substr(strUnit.length - num.length);
  for (let i = 0, len = num.length; i < len; i++) {
    strOutput += strCapDgt.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
  }
  return (
    strPrefix +
    strOutput
      .replace(/零角零分$/, '整')
      .replace(/零[仟佰拾]/g, '零')
      .replace(/零{2,}/g, '零')
      .replace(/零([亿|万])/g, '$1')
      .replace(/零+元/, '元')
      .replace(/亿零{0,3}万/, '亿')
      .replace(/^元/, '零元')
  );
}

/**
 * 数据脱敏处理
 * @param {string} str 处理值
 * @param {object} option 配置项 type: tel/code/email/identity 电话、学号（工号）、邮箱、身份证
 */
export function desensitization(value, option = {}) {
  let sign = store.state.app.sensitive;
  if (sign && (typeof value === 'string' || value instanceof String)) {
    // 配置项拓展
    const __extend = (obj, option) => {
      for (const key in option) {
        obj[key] = option[key];
      }
      return obj;
    };
    const actions = {
      tel: {
        start: 3,
        end: -4
      },
      code: {
        start: 1,
        end: -1
      },
      email: {
        start: 3,
        end: -8
      },
      identity: {
        start: 3,
        end: -3
      },
      default: {
        start: 1,
        end: 0
      }
    };
    const __handler = key => {
      let action = actions[`${key}`] || actions['default'];
      return action;
    };
    let defaultOpt = __handler((option || {}).type || 'name');
    let options = __extend(defaultOpt, option);
    const { type, start, end } = options;
    let tempStr = '';
    let len = value.length;
    if (type !== undefined) {
      const firstStr = value.substr(0, start);
      const lastStr = value.substr(end);
      const middleStr = value.substring(start, len - Math.abs(end)).replace(/[\s\S]/g, '*');
      // result
      tempStr = firstStr + middleStr + lastStr;
      return tempStr;
    } else {
      tempStr = value.substr(0, 1) + value.substring(1, len).replace(/[\s\S]/g, '*');
      return tempStr;
    }
  } else {
    return value;
  }
}
