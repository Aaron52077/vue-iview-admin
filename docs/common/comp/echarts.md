# 引入图表

文档参考 [http://echarts.baidu.com/examples/](http://echarts.baidu.com/examples/)

```html
<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
<div class="echart-dom" style="height:400px;">
    <div class="echart-dom" :id="echartData.chartId"></div>
</div>
```

```js
import echart from '@/components/mixins/echart'

export default {
    mixins: [echart],
    props: {
        echartData: {
            type: Object,
            required: true
        }
    },
    watch: {
        echartData: {
            handler (val, oldVal) {
                this.drawChart()
            },
            deep: true
        }
    },
    methods: {
        drawChart () {
            let {chartId, titleText, legendData, seriesData} = this.echartData
            let myChart = this.echartInit(chartId)
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                legend: {
                    data:['销量']
                },
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option, true)
            this.$nextTick(() => {
                window.addEventListener('resize', () => { myChart.resize() })
            })
        }
    }
}
```

　

　

　

　

　

　

　

　

　


