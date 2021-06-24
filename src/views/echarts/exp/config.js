import echarts from 'echarts';
/* eslint-disable */
export const demo1 = {
  title: {
    text: '渐变折线图',
    textStyle: {
      color: '#1D83DD',
      fontWeight: 500,
      fontSize: 20
    },
    padding: 15
  },
  color: ['#F4A45C', '#4FABE5'],
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        color: '#57617B'
      }
    }
  },
  legend: {
    align: 'right',
    right: 15,
    top: 15,
    itemWidth: 20,
    itemHeight: 10,
    data: ['理科', '文科']
  },
  xAxis: [
    {
      axisTick: { show: false },
      axisLine: { show: false },
      type: 'category',
      boundaryGap: false,
      data: [
        '00：00',
        '02：00',
        '04：00',
        '06：00',
        '08：00',
        '10：00',
        '12：00',
        '14：00',
        '16：00',
        '18：00',
        '20：00',
        '22：00',
        '24：00'
      ]
    }
  ],
  yAxis: [
    {
      type: 'value',
      min: 0,
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      splitLine: {
        show: true,
        color: '#EEEEEE'
      }
    }
  ],
  series: [
    {
      name: '理科',
      type: 'line',
      smooth: false,
      symbol: 'circle',
      showSymbol: false,
      lineStyle: {
        normal: {
          width: 3
        }
      },
      // 折线Y轴渐变
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(79,171,229, 0.3)'
              },
              {
                offset: 0.8,
                color: 'rgba(79,171,229, 0)'
              }
            ],
            false
          ),
          shadowColor: 'rgba(79,171,229, 0.1)',
          shadowBlur: 10
        }
      },
      itemStyle: {
        normal: {
          color: 'rgb(79,171,229)',
          borderColor: 'rgba(231,235,234, 0.15)',
          borderWidth: 12
        }
      },
      data: [20, 18, 19, 13, 15, 12, 10, 12, 14, 12, 16, 13, 23]
    },
    {
      name: '文科',
      type: 'line',
      smooth: false,
      symbol: 'circle',
      showSymbol: false,
      lineStyle: {
        normal: {
          width: 3
        }
      },
      // 折线Y轴渐变
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(245,177,117, 0.3)'
              },
              {
                offset: 0.8,
                color: 'rgba(245,177,117, 0)'
              }
            ],
            false
          ),
          shadowColor: 'rgba(245,177,117, 0.1)',
          shadowBlur: 10
        }
      },
      itemStyle: {
        normal: {
          color: 'rgb(244,164,92)',
          borderColor: 'rgba(244, 164, 92, 0.15)',
          borderWidth: 12
        }
      },
      data: [12, 10, 12, 15, 16, 18, 9, 12, 17, 19, 13, 15, 29]
    }
  ]
};

export const demo2 = {
  title: {
    text: '月均消费分布',
    textStyle: {
      color: '#1D83DD',
      fontWeight: 500,
      fontSize: 20
    },
    padding: 15
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  color: ['#37a2da', '#32c5e9', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293', '#e7bcf3', '#8378ea'],
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  calculable: true,
  series: [
    {
      name: '月均消费分布',
      type: 'pie',
      radius: [30, 100],
      roseType: 'area',
      data: [
        { value: 10, name: '0' },
        { value: 5, name: '1-200' },
        { value: 15, name: '201-300' },
        { value: 25, name: '301-400' },
        { value: 20, name: '401-500' },
        { value: 35, name: '501-600' },
        { value: 30, name: '600以上' }
      ]
    }
  ]
};

export const demo3 = {
  title: {
    text: '柱状图例',
    textStyle: {
      color: '#1D83DD',
      fontWeight: 500,
      fontSize: 20
    },
    padding: 15
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        color: '#57617B'
      }
    }
  },
  legend: {
    align: 'right',
    right: 15,
    top: 15,
    itemWidth: 20,
    itemHeight: 10,
    textStyle: {
      color: '#000'
    },
    data: ['男生', '女生']
  },
  xAxis: [
    {
      type: 'category',
      axisLine: {
        show: false,
        lineStyle: {
          color: '#545454'
        }
      },
      axisLabel: {
        interval: 0,
        textStyle: {
          fontSize: 10,
          color: '#828282'
        }
      },
      axisTick: {
        show: false
      },
      data: ['理科', '文科']
    }
  ],
  yAxis: [
    {
      type: 'value',
      min: 0,
      position: 'left',
      axisLine: {
        show: false,
        lineStyle: {
          color: '#545454'
        }
      },
      axisTick: {
        show: false
      },
      splitLine: { show: true }
    }
  ],
  dataZoom: [
    {
      show: true,
      height: 15,
      xAxisIndex: [0],
      bottom: 10,
      start: 0,
      end: 100,
      handleIcon:
        'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
      handleSize: '100%',
      handleStyle: {
        color: '#9FA2A8'
      },
      textStyle: {
        color: '#9FA2A8'
      },
      borderColor: '#90979c'
    },
    {
      type: 'inside',
      show: true,
      height: 15,
      start: 1,
      end: 35
    }
  ],
  series: [
    {
      name: '男生',
      type: 'bar',
      stack: '总量',
      barMaxWidth: 30,
      itemStyle: {
        normal: {
          color: '#31BD74'
        }
      },
      data: [2132, 1236]
    },
    {
      name: '女生',
      type: 'bar',
      stack: '总量',
      barMaxWidth: 30,
      itemStyle: {
        normal: {
          color: '#3AA0FF'
        }
      },
      data: [1222, 1955]
    }
  ]
};

export const demo4 = {
  title: {
    text: '地图应用图例',
    textStyle: {
      color: '#1D83DD',
      fontWeight: 500,
      fontSize: 20
    },
    padding: 15
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    containLabel: true
  },
  tooltip: {
    formatter: function(params) {
      let stausMap = params.data;
      return `${params.name} <br /> 来过${stausMap.value[2]}人`;
    }
  },
  bmap: {
    center: [108.623609, 21.903551],
    zoom: 17,
    roam: true
  },
  series: [
    {
      name: 'pm2.5',
      type: 'scatter',
      coordinateSystem: 'bmap',
      data: [
        { name: '廊坊', value: [116.7, 39.53, 193] },
        { name: '大庆', value: [125.03, 46.58, 279] },
        { name: '校门', value: [108.622163, 21.89902, 139] },
        { name: '图书馆', value: [1108.62217, 21.903713, 124] },
        { name: '食堂1', value: [108.623985, 21.903479, 125] },
        { name: '食堂2', value: [108.626084, 21.901846, 129] },
        { name: '小卖部', value: [108.626136, 21.907171, 314] }
      ],
      symbolSize: function(val) {
        return val[2] / 10;
      },
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: false
        },
        emphasis: {
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: '#3F9FF6',
          borderColor: '#218DEE',
          borderWidth: 2
        }
      }
    }
  ]
};
