# 标签

``` vue
<template>
    <div class="container">
        <mTag border="danger">标签一</mTag>
        <mTag border="primary">标签二</mTag>
        <mTag border="success">标签三</mTag>
        <mTag border="warning">标签四</mTag>
        <mTag border="info">标签五</mTag>
    </div>
</template>
```
> props Attributes

|参数|说明|类型|可选值|默认|
| ------ | ------ | ------ |------ |------ |
| type | 标签的样式类型 | String | info/primary/success/danger/warning | — |
| round | 标签是否有圆角 | Boolean | true/false | false |
| border | 标签的边框样式类型 | String | info/primary/success/danger/warning | — |
| size | 标签的样式大小 | String | medium/small | — |
| closable | 标签是否显示关闭 | Boolean | true/false | false |

> solt Attributes 具名插槽

|参数|可选值|说明|
| ------ | ------ | ------ |  
| name | right | 插入至标签栏右侧的内容 |

