# 组件的引入

> 动态引入。适用于常用组件，此方式以异步方式加载组件。

```
//引入
//可参考  \src\components\Base\* 文件

//模板中直接使用
<mIcon type="iview" name="md-images"  size="30" />

```

> 直接引入。 @top/Base/* 

```
//引入
import iconDiy from '@top/Base/Icon'

//注册
components:{ iconDiy }

//模板中使用
<iconDiy iconClass="iconyonghuhuaxiang" className="md-icon" />
```


