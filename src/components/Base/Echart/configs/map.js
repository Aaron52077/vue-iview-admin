/**
 * echart 图标配置
 * @module map
 * @param [type][类型] 地图
 * @param [docs][文档] https://echarts.baidu.com/option.html#series-map
 * @param {Boolean} [data] - 是否有数据
 * @param {Object} [option] - 配置项
 * @returns {*}  无数据返回 / 有数据返回配置项
 */

import echarts from "echarts";
require("echarts/map/js/china");
require("echarts/extension/bmap/bmap");
import guangxi from "echarts/map/json/province/guangxi.json";

export const EchartsMap = (chartData, unit = "") => {
  let { title, series } = chartData;
  if (series.length === 0) {
    return {
      data: false,
      option: {}
    };
  } else {
    return {
      data: true,
      option: {
        title: {
          text: title || "",
          textStyle: {
            color: "#1D83DD",
            fontWeight: 500,
            fontSize: 20
          },
          padding: 15
        },
        color: ["#1D83DD"],
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            return [
              params.name,
              params.marker + "录取人数：" + ((params.data || {}).plan || 0) + unit,
              params.marker + "报到人数: " + ((params.data || {}).actual || 0) + unit,
              params.marker + "报到率: " + ((params.data || {}).value || 0) + "%"
            ].join("<br/>");
          }
        },
        visualMap: {
          type: "continuous",
          // orient: 'horizontal',
          itemWidth: 10,
          itemHeight: 80,
          text: ["高", "低"],
          showLabel: false,
          inRange: {
            color: ["#1D83DD"]
          },
          textStyle: {
            color: "#7B93A7"
          },
          left: 20,
          bottom: 30
        },
        grid: {
          right: 10,
          top: 135,
          bottom: 100,
          containLabel: true
        },
        geo: {
          type: "map",
          map: "china",
          left: "center",
          top: "center",
          layoutSize: "100%",
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            emphasis: {
              areaColor: "#3AA0FF"
            }
          }
        },
        series: [
          {
            mapType: "china",
            type: "map",
            roam: false,
            geoIndex: 0,
            label: {
              show: false
            },
            data: series
          }
        ]
      }
    };
  }
};

export const EchartsMapOpt1 = (chartData, unit = "") => {
  let { title, series } = chartData;
  if (series.length === 0) {
    return {
      data: false,
      option: {}
    };
  } else {
    let yAxis = series.slice(0, 9).map((item, index) => {
      return index + item.name;
    });
    return {
      data: true,
      option: {
        title: {
          text: title || "",
          textStyle: {
            color: "#1D83DD",
            fontWeight: 500,
            fontSize: 20
          },
          padding: 15
        },
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            return [
              params.name,
              params.marker + "录取人数：" + ((params.data || {}).plan || 0) + unit,
              params.marker + "报到人数: " + ((params.data || {}).actual || 0) + unit,
              params.marker + "报到率: " + ((params.data || {}).value || 0) + "%"
            ].join("<br />");
          }
        },
        visualMap: {
          type: "continuous",
          orient: "horizontal",
          itemWidth: 10,
          itemHeight: 80,
          text: ["高", "低"],
          showLabel: true,
          seriesIndex: [0],
          min: 0,
          max: 2,
          inRange: {
            color: ["#6FCF6A", "#FFFD64", "#FF5000"]
          },
          textStyle: {
            color: "#7B93A7"
          },
          left: "left",
          bottom: 30
        },
        grid: {
          right: 10,
          top: 45,
          bottom: 20,
          width: "45%",
          containLabel: true
        },
        xAxis: {
          show: false
        },
        yAxis: {
          type: "category",
          inverse: true,
          nameGap: 16,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#ddd"
            }
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: "#ddd"
            }
          },
          axisLabel: {
            interval: 0,
            margin: 85,
            textStyle: {
              color: "#455A74",
              align: "left",
              fontSize: 14
            },
            rich: {
              a: {
                color: "#fff",
                backgroundColor: "#FAAA39",
                width: 20,
                height: 20,
                align: "center",
                borderRadius: 2
              },
              b: {
                color: "#fff",
                backgroundColor: "#4197FD",
                width: 20,
                height: 20,
                align: "center",
                borderRadius: 2
              }
            },
            formatter: function(params) {
              if (parseInt(params.slice(0, 1)) < 3) {
                return [
                  "{a|" + (parseInt(params.slice(0, 1)) + 1) + "}" + "  " + params.slice(1)
                ].join("\n");
              } else {
                return [
                  "{b|" + (parseInt(params.slice(0, 1)) + 1) + "}" + "  " + params.slice(1)
                ].join("\n");
              }
            }
          },
          data: yAxis
        },
        geo: {
          map: "china",
          left: "left",
          layoutSize: "80%",
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            emphasis: {
              areaColor: "#3AA0FF"
            }
          }
        },
        series: [
          {
            mapType: "china",
            type: "map",
            roam: false,
            geoIndex: 0,
            label: {
              show: false
            },
            data: series
          },
          {
            name: "barSer",
            type: "bar",
            roam: false,
            visualMap: false,
            zlevel: 2,
            barMaxWidth: 8,
            barGap: 0,
            itemStyle: {
              normal: {
                color: function(params) {
                  // build a color map as your need.
                  var colorList = [
                    {
                      colorStops: [
                        {
                          offset: 0,
                          color: "#FFD119" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#FFAC4C" // 100% 处的颜色
                        }
                      ]
                    },
                    {
                      colorStops: [
                        {
                          offset: 0,
                          color: "#00C0FA" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#2F95FA" // 100% 处的颜色
                        }
                      ]
                    }
                  ];
                  if (params.dataIndex < 3) {
                    return colorList[0];
                  } else {
                    return colorList[1];
                  }
                },
                barBorderRadius: 15
              }
            },
            data: series.slice(0, 9)
          }
        ]
      }
    };
  }
};

export const EchartsMapOpt2 = (chartData, unit = "") => {
  let { title, series } = chartData;
  if (series.length === 0) {
    return {
      data: false,
      option: {}
    };
  } else {
    echarts.registerMap("guangxi", guangxi);
    // 中心点
    const center = [108.61, 21.96];
    // 数据转换到坐标点
    let convertData = data => {
      let dataPoint = data.map(item => {
        return [
          {
            coord: center
          },
          {
            coord: item.point
          }
        ];
      });
      return dataPoint;
    };
    let seriesMap = [];
    seriesMap.push(
      {
        name: "钦州",
        type: "lines",
        zlevel: 1,
        effect: {
          show: true,
          period: 6,
          trailLength: 0.7,
          color: "#fff",
          symbolSize: 3
        },
        lineStyle: {
          normal: {
            color: "#ffcb3e",
            width: 0,
            curveness: 0.2
          }
        },
        data: convertData(series)
      },
      {
        name: "钦州",
        type: "lines",
        zlevel: 2,
        effect: {
          show: true,
          period: 6,
          trailLength: 0,
          symbol:
            "path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705",
          symbolSize: 15
        },
        lineStyle: {
          normal: {
            color: "#ffcb3e",
            width: 1,
            opacity: 0.4,
            curveness: 0.2
          }
        },
        data: convertData(series)
      },
      {
        name: "南宁",
        type: "effectScatter",
        coordinateSystem: "geo",
        zlevel: 2,
        rippleEffect: {
          brushType: "stroke"
        },
        label: {
          normal: {
            show: true,
            position: "right",
            formatter: "{b}"
          }
        },
        symbolSize: function(val) {
          return val[2] / 16;
        },
        itemStyle: {
          normal: {
            color: "#ffcb3e"
          }
        },
        data: series.map(item => {
          return {
            name: item.name,
            value: [...item.point, item.value]
          };
        })
      }
    );
    return {
      data: true,
      option: {
        title: {
          text: title || "",
          textStyle: {
            color: "#1D83DD",
            fontWeight: 500,
            fontSize: 20
          },
          padding: 15
        },
        color: ["#1D83DD"],
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            return [
              params.marker + params.name + "：" + ((params.data.value || [])[2] || 0) + unit
            ].join("<br/>");
          }
        },
        geo: {
          type: "map",
          map: "guangxi",
          roam: false,
          zoom: 1.1,
          aspectScale: 1,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: "#1D83DD",
              borderColor: "#ffffff"
            },
            emphasis: {
              areaColor: "#3AA0FF"
            }
          }
        },
        series: seriesMap
      }
    };
  }
};
