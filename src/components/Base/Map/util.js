/* eslint-disable */
/**
 * [AMapLib] 高德地图
 * [BMapLib] 百度地图
 * [QQMapLib] 腾讯地图
 */

// 隐身插入script方式
// var _hmt = _hmt || [];
// (function () {
//     var hm = document.createElement("script");
//     hm.async = 1;
//     hm.src = "https://api.map.baidu.com/api?v=2.0&ak=" + ak + "&callback=init";
//     var s = document.getElementsByTagName("script")[0];
//     s.parentNode.insertBefore(hm, s);
// })();
export function AMapLib(key) {
  return new Promise((resolve, reject) => {
    window.init = function() {
      resolve(AMap);
    };
    // 异常机制处理
    try {
      AMap && window.init();
    } catch (error) {
      let script = document.createElement("script");
      script.async = 1;
      script.type = "text/javascript";
      script.src = "https://webapi.amap.com/maps?v=1.3&key=" + key + "&callback=init";
      script.onerror = reject;
      document.head.appendChild(script);
    }
  });
}

export function BMapLib(ak) {
  return new Promise((resolve, reject) => {
    window.init = function() {
      resolve(BMap);
    };
    // 异常机制处理
    try {
      BMap && window.init();
    } catch (error) {
      let script = document.createElement("script");
      script.async = 1;
      script.type = "text/javascript";
      script.src = "https://api.map.baidu.com/api?v=2.0&ak=" + ak + "&callback=init";
      script.onerror = reject;
      document.head.appendChild(script);
    }
  });
}

export function QQMapLib(key) {
  return new Promise((resolve, reject) => {
    window.init = function() {
      resolve(qq);
    };
    // 异常机制处理
    try {
      qq && window.init();
    } catch (error) {
      let script = document.createElement("script");
      script.async = 1;
      script.type = "text/javascript";
      script.src =
        "https://map.qq.com/api/js?v=2.exp&key=" + key + "&libraries=place&callback=init";
      script.onerror = reject;
      document.head.appendChild(script);
    }
  });
}
