/**
 * echart 图标配置
 * @param [type][类型] 自定义系列
 * @param [desc] 自定义系列可以自定义系列中的图形元素渲染，从而能扩展出不同的图表
 * @param [docs][文档] https://echarts.baidu.com/option.html#series-custom
 * @returns {*}  无数据返回 / 有数据返回配置项
 */

/**
 * echart 图标配置
 * @param [type][类型] 自定义系列
 * @param [desc] 自定义系列可以自定义系列中的图形元素渲染，从而能扩展出不同的图表
 * @param [docs][文档] https://echarts.baidu.com/option.html#series-custom
 * @returns {*}  无数据返回 / 有数据返回配置项
 */
import { toolTextFlow, toolFormatter } from "../util";
/**
 * 线图和柱状图结合
 * @param coloums [data] { key: '获奖数', unit: '次' }, { key: '国家级获奖数', unit: '次' }, { key: '国家级奖占比', unit: '%' }
 * @param yConf [data]  left: { name: '获奖数', unit: '次' }, right: { name: '百分比', unit: '%' }
 */
export const EchartsLineAndBar = (chartData, coloums = [], yConf = {}, isFlow = true) => {
  let { title, legend, xAxis, series } = chartData;
  if (series.length === 0) {
    return {
      data: false,
      option: {}
    };
  } else {
    let seriesMap = series.map(item => {
      if (item.type === "bar") {
        return {
          name: item.name,
          type: "bar",
          barWidth: 15,
          barCategoryGap: 10,
          data: item.data
        };
      }
      if (item.type === "line") {
        return {
          name: item.name,
          type: "line",
          data: item.data,
          smooth: true,
          symbolSize: 6,
          yAxisIndex: 1
        };
      }
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
        color: [
          "#3AA0FF",
          "#EEA989",
          "#EC6F00",
          "#b666f4",
          "#cf9ff1",
          "#4ee2b3",
          "#56e7ed",
          "#fdb300",
          "#fda5bb",
          "#f3709b",
          "#f97ae3",
          "#e75ec3",
          "#52b9f5",
          "#52a6f5",
          "#5085f3",
          "#9b8bff"
        ],
        grid: {
          top: 45,
          left: "3%",
          right: "4%",
          bottom: 30,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            return toolFormatter(params, coloums);
          }
        },
        legend: {
          type: "scroll",
          orient: "horizontal",
          itemWidth: 20,
          itemHeight: 10,
          bottom: 5,
          selectedMode: true,
          data: legend
        },
        xAxis: [
          {
            type: "category",
            axisLabel: {
              interval: 0,
              rotate: 45,
              formatter: function(parma) {
                if (isFlow) {
                  return toolTextFlow(parma);
                } else {
                  return parma;
                }
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            data: xAxis
          }
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            name: ((yConf || {}).left || {}).name || "",
            position: "left",
            axisLabel: {
              formatter: "{value}" + (((yConf || {}).left || {}).unit || "")
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: { show: true }
          },
          {
            type: "value",
            name: ((yConf || {}).right || {}).name || "",
            min: 0,
            position: "right",
            axisLabel: {
              formatter: "{value}" + (((yConf || {}).right || {}).unit || "")
            },
            axisTick: { show: false },
            axisLine: { show: false },
            splitLine: { show: true },
            inverse: true
          }
        ],
        series: seriesMap
      }
    };
  }
};

// 针对Y轴数据，是否是反向坐标轴
export const EchartsLineAndBarOpt1 = (chartData, coloums = [], yConf = {}, isFlow = true) => {
  let { title, legend, xAxis, series } = chartData;
  if (series.length === 0) {
    return {
      data: false,
      option: {}
    };
  } else {
    let seriesMap = series.map(item => {
      if (item.type === "bar") {
        return {
          name: item.name,
          type: "bar",
          barWidth: 15,
          barCategoryGap: 10,
          data: item.data
        };
      }
      if (item.type === "line") {
        return {
          name: item.name,
          type: "line",
          data: item.data,
          smooth: true,
          symbolSize: 6,
          yAxisIndex: 1
        };
      }
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
        color: [
          "#3AA0FF",
          "#EEA989",
          "#EC6F00",
          "#b666f4",
          "#cf9ff1",
          "#4ee2b3",
          "#56e7ed",
          "#fdb300",
          "#fda5bb",
          "#f3709b",
          "#f97ae3",
          "#e75ec3",
          "#52b9f5",
          "#52a6f5",
          "#5085f3",
          "#9b8bff"
        ],
        grid: {
          top: 45,
          left: "3%",
          right: "4%",
          bottom: 30,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            return toolFormatter(params, coloums);
          }
        },
        legend: {
          type: "scroll",
          orient: "horizontal",
          itemWidth: 20,
          itemHeight: 10,
          bottom: 5,
          data: legend
        },
        xAxis: [
          {
            type: "category",
            axisLabel: {
              interval: 0,
              rotate: 45,
              formatter: function(parma) {
                if (isFlow) {
                  return toolTextFlow(parma);
                } else {
                  return parma;
                }
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            data: xAxis
          }
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            name: ((yConf || {}).left || {}).name || "",
            position: "left",
            axisLabel: {
              formatter: "{value}" + (((yConf || {}).left || {}).unit || "")
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: { show: true }
          },
          {
            type: "value",
            name: ((yConf || {}).right || {}).name || "",
            min: 0,
            position: "right",
            nameLocation: "start",
            axisLabel: {
              formatter: "{value}" + (((yConf || {}).right || {}).unit || "")
            },
            axisTick: { show: false },
            axisLine: { show: false },
            splitLine: { show: true },
            inverse: true
          }
        ],
        series: seriesMap
      }
    };
  }
};
