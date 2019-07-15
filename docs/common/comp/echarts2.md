# 组件化

> 通过配置绘制图例

```html
<!-- 高阶用法 -->
<mEchart v-if="radar.data" :optionObj="radar.option"></mEchart>
```

```js
import mEchart from '@Base/Base/Echart';
/*
 *  引入组件、配置 
 */
import { EchartsLineOpt1, EchartsLineOpt2 } from '@Echart/configs/line';
import { EchartsRadar } from '@Echart/configs/radar';

export default {
    data () {
        return {
            radar: {
                data: false,
                option: {}
            },
            radarData:  {
                title: '各类收入比例',
                legend: ['工资收入', '其他收入', '报销收入'],
                series: [
                    { name: '工资收入', value: 232 },
                    { name: '其他收入', value: 212 },
                    { name: '报销收入', value: 122 }
                ]
            }
        }
    },
    created() {
        this.radar = EchartsRadar(this.radarData);
    },
    methods: {
        EChartData() {
            const params = { endDate: '2018-01', startDate: '2018-10' }
            this.dataBase.common.getEChartData('4414ff7892fa11e9af4d000c29c5c6a4', params).then(res => {
                console.log(res)
            });
        }
    }
}
```

> props Attributes

|名称|描述|类型|可选值|默认|
| ------ | ------ | ------ |------ |------ |
| optionObj | echart 配置项 | Object | - | {} |
| action | 是否支持点击跳转 | Boolean | true/false | false |
| path | 路由跳转路径 | String | - | - |
| params | 路由跳转路径查询参数 | 路由跳转路径 | - | - |
