# 固定滚动区域

参数 config中指定要排除的元素cls: id 或 class,cls参数支持多个，匹配多个时将累积,适用于头部或底部分页固定，中间内容超过屏幕需要滚动的场景。
参数offset支持用具体数字来计算高度。

```html
	<div>
        <div class="gc-breadcrumb" id="demo_top">
            <sBreadcrumb class="gc-breadcrumb-inner" separator=">">
                <sBreadcrumbItem>首页</sBreadcrumbItem>
                <sBreadcrumbItem>应用中心</sBreadcrumbItem>
                <sBreadcrumbItem>某应用</sBreadcrumbItem>
            </sBreadcrumb>
        </div>
        <mCalcHeight :config="{ cls:['#demo_top'] }">
            <div style="height:1200px">滚动<br/>内容<br/><br/><br/>...到底了</div>
        </mCalcHeight>
    </div>
```

其他用法

```html
    用法1
	<mCalcHeightt v-model="myHeight"></mCalcHeight>
    <!--  {{myHeight}}  -->
    <!--  关联v-model后返回的值，可以做更高级的应用 -->
    用法2
    <mCalcHeight :config="{ offset: 120 }"></mCalcHeight>
```