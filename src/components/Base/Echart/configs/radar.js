/**
 * echart 图标配置
 * @module radar
 * @param [type][类型] 雷达图
 * @param [docs][文档] https://echarts.baidu.com/option.html#series-radar
 * @param {Boolean} [data] - 是否有数据
 * @param {Object} [option] - 配置项
 * @returns {*}  无数据返回 / 有数据返回配置项
 */

export const EchartsRadar = chartData => {
  let { title, xAxis, series } = chartData;
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
        color: ["#F4A45C", "#4FABE5"],
        grid: {
          top: "23%",
          bottom: "6%",
          left: "5%",
          right: "5%",
          containLabel: true
        },
        tooltip: {
          trigger: "item"
        },
        radar: {
          name: {
            textStyle: {
              color: "#000000"
            }
          },
          splitArea: {
            areaStyle: {
              color: ["#fff", "#fff", "#fff", "#fff"],
              shadowColor: "rgba(0, 100, 0, 0.3)"
            }
          },
          indicator: xAxis || []
        },
        series: [
          {
            type: "radar",
            data: [
              {
                value: series.map(item => {
                  return item.data;
                }),
                name: "数据",
                itemStyle: {
                  normal: {
                    color: "rgba(5, 128, 242, 0.8)"
                  }
                },
                areaStyle: {
                  normal: {
                    color: "#60b0f7"
                  }
                }
              }
            ]
          }
        ]
      }
    };
  }
};

export const EchartsRadarOpt1 = chartData => {
  let { title, xAxis, series } = chartData;
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
        color: ["#F4A45C", "#4FABE5"],
        grid: {
          top: "23%",
          bottom: "6%",
          left: "5%",
          right: "5%",
          containLabel: true
        },
        tooltip: {
          trigger: "item"
        },
        radar: {
          radius: 160,
          center: ["53%", "55%"],
          splitNumber: 4,
          name: {
            textStyle: {
              color: "#201E1F"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#A4D6F3",
              width: 1
            }
          },
          splitLine: {
            lineStyle: {
              color: ["#A4D6F3", "transparent", "transparent", "transparent"],
              width: 1
            }
          },
          splitArea: {
            areaStyle: {
              color: ["#B3DBF5", "#FAFAFA"]
            }
          },
          indicator: xAxis || []
        },
        series: [
          {
            type: "radar",
            name: "数据",
            tooltip: {
              trigger: "item"
            },
            symbol: "circle",
            symbolSize: 3,
            lineStyle: {
              width: 1
            },
            itemStyle: {
              normal: {
                color: "#3D68E4",
                borderColor: "#3D68E4"
              }
            },
            data: [
              {
                value: series.map(item => {
                  return item.data;
                })
              }
            ]
          }
        ]
      }
    };
  }
};
