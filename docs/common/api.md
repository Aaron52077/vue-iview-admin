# 全局API

## 简单数据共享 setData/getData

快速在各组件之间共享数据。使用时需要注意 setData的key命名注意使用相关前缀，避免与其他页面冲突。需要重置的地方需要在created、mounted重置

```
    this.dataBase.setData('test', '测试数据')
    this.dataBase.log(this.dataBase.getData['test'])  //获取
```

## 复杂数据共享 setApi

用 setApi 存储更复杂的数据。基本用法如下：

定义 api.js：
```
    /* eslint-disable */
    import Vue from 'vue';
    // 命名建议使用模块名称,如：name:'test'，需注意避免重复
    // api 模式下，建议只使用 name, data, methods, computed 等特性
    let data = new Vue({
        name:'test',
        data:{
            shareData:'test',
        },
        methods: {
            setData(v){
                this.shareData = [v,new Date()];
            }
        }
    })
    Vue.dataBase.setApi(data); 
    export default data;
```

?> **注：使用时注意命名合理，避免重复和冲突。**

全局调用：
```
   //引入，只需在页面主入口引入，子页面模块则无需再重复引入;
   import './api.js';
   //组件中应用
   this.dataBase.api_test.shareData = '更新了';
   //模板中的应用
   {{dataBase.api_test.shareData}}
   <a @click="api_test.setData('数据更新了')">事件</a>
```

## 持久数据共享 setValue/getValue

localStorage方式持久数据存储与读取，该数据会保留在用户浏览器中，同cookie一样不适合存储数据较大或太频繁更新的数据

```
    this.dataBase.setValue(key, value) //设置
    this.dataBase.getValue(key) //获取
    this.dataBase.delValue(key) //删除
```

## 数据深拷贝 cloneDeep

```
dataBase.cloneDeep(object|array)
```

## 数据长度获取 size

```
dataBase.size(object|array|string)
```

## 日志打印 log

```
dataBase.log(arg...)
```

## 浏览器实时宽高 dh/dw

```
dataBase.dh //高
dataBase.dw //宽
```

## 登录令牌 setToken

```
dataBase.setToken //获取登录token
dataBase.setToken = ''; //设置登录token
```

## 按需引入Js/Css资源 load
```
dataBase.load(arg...,callback)
```
例：dataBase.load('./js/1.js', './js/2.css', callback)，dataBase.load('jquery', callback)，dataBase.load('viewer', callback)


## 异步请求 $axios

```
//项目实例中以 this.$http.. 调用。
this.$axios.post('/api/module/...')
.then(function (response) {
    console.log(response);
})
.catch(function (error) {
    // handle error
    console.log(error);
})
//注：项目中接口请求成功会返回code值。code=1时表示请求成功，否则会返回msg。需要根据业务进行合理提示给用户。
```

多个接口聚合请求的情况
```
    var res1 = () => {
        return this.$axios.post('/api/1');
    }
    var res2 = () => {
        return this.$axios.post('/api/2');
    }
    2个接口同时进行
    this.$axios.all([res1(), res2()])
    .then(this.$axios.spread(function (res1, res2) {
        console.log(res1,res2) //多个接口同时返回的数据
    }));
    n个接口同时进行
    this.$axios.all([..., ...)
    .then(this.$axios.spread(function (...resList) {
        return resList  // 多个接口同时返回的数据
    }));
```

## 格式化文件大小 renderFileSize

```
    //模板中使用
    {{123312 | renderFileSize}}
    //组件中
    this.dataBase.renderFileSize('123312')
```

## 日期对象格式化 dateToStr

```
    //模板中使用
    {{new Date() | dateToStr}}
    {{new Date() | dateToStr('yyyy-MM-dd hh:mm')}}
    //组件中
    this.dataBase.dateToStr(new Date(), 'yyyy-MM-dd hh:mm')
```

## 时间戳格式化 unixToStr

```
    //模板中使用
    {{'1233331212' | unixToStr}}
    {{'1233331213' | unixToStr('yyyy-MM-dd hh:mm')}}
    //组件中
    this.dataBase.unixToStr('1233331213', 'yyyy-MM-dd')
```

## 下载附件 downloadFile

适用于导出、下载文件流第三方资源等

```
    this.dataBase.fileDownload({
        data: data,
        fileName: '9527.zip',
        type: 'application/zip;charset=utf-8'
    }); // 传入数据，文件名称，文件流导出类型
```
