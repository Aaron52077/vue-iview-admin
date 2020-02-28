# 通用项目结构

## 核心基于dataBase

```
├── docs/                   开发文档
├── mock/                   mock.js
├── public/                 资源目录，第三方无需编译的资源
├── src/
│   ├── api/                调用接口相关
│   ├── assets/             资源目录，字体、图标、css、less等
│   │     └── css/
│   │          ├── common   全局公用样式
│   │          └── packages 页面模块包...
│   ├── components/         项目组件，项目内模块相关的组件
│   │     ├── Base          自定义组件 pc ui公用组件
│   │     ├── H5            自定义组件 wap ui公用组件
│   │     ├── mixins        混合工具集
│   │     ├── iview.js      iview ui配置公用组件注册入口
│   │     ├── vant.js       vant ui配置公用组件注册入口
│   │     └── index.js      基础公用组件注册入口
│   ├── directive/          全局指令filters
│   ├── filters/            全局过滤器
│   ├── directive/          全局指令
│   ├── i18n/               i18n自定义轻量级国际化配置
│   ├── layout/             项目工程骨架
│   ├── utils/              数据处理、全局公用方法工具集等...
│   ├── views/              模块页面，包含各个模块独立路由配置及模块相关组件
│   │     ├── account       项目登录相关     
│   │     └── .../modelN/   模块N...
│   ├── router/             主路由配置
│   └── store/              vuex相关
├── App.vue                 
├── main.js                 入口
├── global.js               全局配置，公共方法集等配置
├──.env*                    环境配置
└── vue.config.js           配置
```

### git规范

> 分支

develop    开发分支（新功能以此分支为基础开发，可创建独立分支在可发布阶段合并）

test     测试分支

release   预发布

master     正式分支

### 组件开发

> 开发的通用组件位置

```
\src\components\Base\*
```

对于频繁使用的组件可以写入配置，可参考  \src\components\index* 文件


> 组件相关的文档位置

```
\docs\common\*
```
