/**
 * echart 图标配置
 * @module gauge
 * @param [type][类型] 仪表盘
 * @param [docs][文档] https://echarts.baidu.com/option.html#series-gauge
 * @param {Boolean} [data] - 是否有数据
 * @param {Object} [option] - 配置项
 * @returns {*}  无数据返回 / 有数据返回配置项
 */
import echarts from "echarts";

export const EchartsGauge = chartData => {
  let { title, series } = chartData;
  if (series.length === 0) {
    return {
      data: false,
      option: {}
    };
  } else {
    let seriesData = {
      value: ((100 * series[0].value) / 100).toFixed(2),
      color: {
        pieMini: "#ffca1c", //小圆形颜色
        pieMiniMini: "#fff", //小小圆形颜色
        piePlus: "#5DD1FA", //大圆形颜色
        value: "#687284" //底部数值颜色
      }
    };
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
        grid: {
          top: "15%",
          left: 0,
          right: 0,
          containLabel: true
        },
        series: [
          {
            name: "刻度1",
            type: "gauge",
            radius: "65%",
            min: 0, //最小刻度
            max: 100, //最大刻度
            splitNumber: 10, //刻度数量
            startAngle: 225,
            endAngle: -45,
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: [[1, "rgba(0,0,0,0)"]]
              }
            },
            axisLabel: {
              show: true,
              color: "#4d5bd1",
              distance: 25,
              formatter: function(v) {
                switch (v + "") {
                  case "0":
                    return "0";
                  case "10":
                    return "10";
                  case "20":
                    return "20";
                  case "30":
                    return "30";
                  case "40":
                    return "40";
                  case "50":
                    return "50";
                  case "60":
                    return "60";
                  case "70":
                    return "70";
                  case "80":
                    return "80";
                  case "90":
                    return "90";
                  case "100":
                    return "100";
                }
              }
            },
            axisTick: {
              show: true,
              splitNumber: 7,
              lineStyle: {
                color: "#5c53de", //用颜色渐变函数不起作用
                width: 1
              },
              length: -8
            },
            splitLine: {
              show: true,
              length: -20,
              lineStyle: {
                color: "#5c53de" //用颜色渐变函数不起作用
              }
            },
            detail: {
              show: false
            },
            pointer: {
              show: false
            }
          },
          {
            name: "仪表盘1",
            type: "gauge",
            radius: "52%",
            splitNumber: 10,
            axisLine: {
              lineStyle: {
                color: [
                  [seriesData.value / 100, "#BF18FE"],
                  [1, "#111F42"]
                ],
                width: 8
              }
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            itemStyle: {
              show: false
            },
            detail: {
              formatter: function(value) {
                if (value !== 0) {
                  var num = Math.round(value);
                  return parseInt(num).toFixed(0) + "%";
                } else {
                  return 0;
                }
              },
              offsetCenter: [0, "70%"],
              textStyle: {
                padding: [0, 0, 80, 0],
                fontSize: 18,
                fontWeight: "700",
                color: seriesData.color.value || "#83af98"
              }
            },
            title: {
              fontSize: 28,
              offsetCenter: [0, "-20%"]
            },
            data: [
              {
                name: "目标值：100",
                value: seriesData.value
              }
            ],
            pointer: {
              show: false,
              length: "75%",
              width: 20 //指针粗细
            }
          }
        ]
      }
    };
  }
};

export const EchartsGaugeOpt1 = chartData => {
  let { title, series } = chartData;
  const highlight = "#03b7c9";
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
        grid: {
          top: "23%",
          left: 0,
          right: 0,
          containLabel: true
        },
        series: [
          {
            name: "刻度",
            type: "gauge",
            center: ["50%", "75%"], // 默认全局居中
            radius: "90%",
            splitNumber: 10, // 刻度数量
            min: 0,
            max: 100,
            startAngle: 180,
            endAngle: 0,
            clockwise: true,
            axisLine: {
              show: true,
              lineStyle: {
                width: 2,
                shadowBlur: 0,
                color: [[1, highlight]]
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: highlight,
                width: 1
              },
              length: -4,
              splitNumber: 10
            },
            splitLine: {
              show: true,
              length: -7,
              lineStyle: {
                color: highlight
              }
            },
            axisLabel: {
              distance: -15,
              textStyle: {
                color: highlight,
                fontSize: "12"
              }
            },
            pointer: {
              //仪表盘指针
              show: 0
            },
            detail: {
              show: false
            }
          },
          {
            name: "渐变标尺",
            center: ["50%", "75%"], // 默认全局居中
            type: "gauge",
            radius: "80%",
            splitNumber: 0, //刻度数量
            startAngle: 180,
            endAngle: 0,
            axisLine: {
              lineStyle: {
                shadowColor: "rgba(0, 0, 0, 0.4)",
                shadowBlur: 12,
                color: [
                  [0.25, ["#9b9e9b"]],
                  [
                    0.45,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "#6fed5c"
                      },
                      {
                        offset: 1,
                        color: "#b2f268"
                      }
                    ])
                  ],
                  [
                    0.48,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "#b2f268"
                      },
                      {
                        offset: 1,
                        color: "#d8d563"
                      }
                    ])
                  ],
                  [
                    0.66,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "#d8d563"
                      },
                      {
                        offset: 1,
                        color: "#edb168"
                      }
                    ])
                  ],
                  [
                    0.83,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "#edb168"
                      },
                      {
                        offset: 1,
                        color: "#eb7742"
                      }
                    ])
                  ],
                  [
                    1,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "#eb7742"
                      },
                      {
                        offset: 1,
                        color: "#e8412e"
                      }
                    ])
                  ]
                ]
              }
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            detail: {
              show: false
            },
            pointer: {
              show: true
            }
          },
          {
            name: "数值",
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            radius: "40%",
            center: ["50%", "75%"], // 默认全局居中
            min: 0,
            max: 100,
            splitNumber: 0,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                color: [[1, highlight]], // 属性lineStyle控制线条样式
                width: "1%"
              }
            },
            axisLabel: {
              // 坐标轴小标记
              show: false
            },
            splitLine: {
              lineStyle: {
                width: 0
              }
            },
            pointer: {
              // 分隔线 指针
              color: highlight,
              width: "30%",
              length: "170%"
            },
            detail: {
              show: false
            },
            itemStyle: {
              normal: {
                color: highlight
              }
            },
            data: series
          },
          {
            name: "刻度",
            type: "gauge",
            center: ["50%", "75%"], // 默认全局居中
            radius: "90%",
            splitNumber: 10, //刻度数量
            min: 0,
            max: 100,
            startAngle: 180,
            endAngle: 0,
            clockwise: true,
            axisLine: {
              show: true,
              lineStyle: {
                width: 2,
                shadowBlur: 0,
                color: [[1, highlight]]
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: highlight,
                width: 1
              },
              length: -4,
              splitNumber: 10
            },
            splitLine: {
              show: true,
              length: -7,
              lineStyle: {
                color: highlight
              }
            },
            axisLabel: {
              distance: -15,
              textStyle: {
                color: highlight,
                fontSize: "12"
              }
            },
            pointer: {
              //仪表盘指针
              show: 0
            },
            detail: {
              show: false
            }
          },
          {
            name: "遮罩",
            tooltip: {
              show: false
            },
            type: "pie",
            radius: "38%",
            center: ["50%", "75%"], // 默认全局居中
            hoverAnimation: false,
            show: false,
            itemStyle: {
              normal: {
                color: "#fff"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            animation: false,
            data: [1.9]
          }
        ]
      }
    };
  }
};
