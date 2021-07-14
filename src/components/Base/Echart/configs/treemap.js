/**
 * echart 图标配置
 * @module treemap
 * @param [type][类型] 一种常见的表达『层级数据』『树状数据』的可视化形式。它主要用面积的方式，便于突出展现出『树』的各层级中重要的节点
 * @param [docs][文档] https://echarts.baidu.com/option.html#series-treemap
 * @param {Boolean} [data] - 是否有数据
 * @param {Object} [option] - 配置项
 * @returns {*}  无数据返回 / 有数据返回配置项
 */

export const EchartsTreemap = chartData => {
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
        grid: {
          top: "12%",
          bottom: "6%",
          left: "5%",
          right: "5%",
          containLabel: true
        },
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
          "#e5cf0d",
          "#97b552",
          "#95706d",
          "#dc69aa",
          "#07a2a4",
          "#9a7fd1",
          "#588dd5",
          "#f5994e",
          "#c05050",
          "#59678c",
          "#c9ab00",
          "#7eb00a",
          "#6f5553",
          "#c14089"
        ],
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}%"
        },
        series: [
          {
            type: "treemap",
            width: "100%",
            height: "85%",
            top: "15%",
            roam: false, //是否开启拖拽漫游（移动和缩放）
            nodeClick: false, //点击节点后的行为,false无反应
            breadcrumb: {
              show: false
            },
            label: {
              //描述了每个矩形中，文本标签的样式。
              normal: {
                show: true
                // position: ['10%', '40%']
              }
            },
            itemStyle: {
              normal: {
                show: true,
                textStyle: {
                  color: "#fff",
                  fontSize: 16
                },
                borderWidth: 1,
                borderColor: "#fff"
              },
              emphasis: {
                label: {
                  show: true
                }
              }
            },
            data: series
          }
        ]
      }
    };
  }
};

export const EchartsTreemapOpt1 = chartData => {
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
        grid: {
          top: "12%",
          bottom: "6%",
          left: "5%",
          right: "5%",
          containLabel: true
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}%"
        },
        series: [
          {
            type: "treemap",
            width: "100%",
            height: "85%",
            top: "15%",
            roam: false, //是否开启拖拽漫游（移动和缩放）
            nodeClick: false, //点击节点后的行为,false无反应
            breadcrumb: {
              show: false
            },
            label: {
              //描述了每个矩形中，文本标签的样式。
              normal: {
                show: true
                // position: ['10%', '40%']
              }
            },
            leafDepth: 2,
            levels: [
              {
                color: ["#5781FD"],
                itemStyle: {
                  normal: {
                    borderWidth: 0,
                    borderColor: "#fff",
                    gapWidth: 2
                  }
                }
              },
              {
                colorSaturation: [0.35, 0.6],
                colorAlpha: [0.5, 1]
              }
            ],
            itemStyle: {
              normal: {
                show: true,
                textStyle: {
                  color: "#fff",
                  fontSize: 16
                },
                borderWidth: 1,
                borderColor: "#fff"
              },
              emphasis: {
                label: {
                  show: true
                }
              }
            },
            data: [
              {
                name: "",
                children: [...series]
              }
            ]
          }
        ]
      }
    };
  }
};
