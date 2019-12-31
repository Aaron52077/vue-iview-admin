# 通用项目结构

## 核心基于dataBase

```
/
├── *.config.js             配置
├── public/                 资源目录，第三方无需编译的资源
├── src/
│   ├── assets/             资源目录，字体、图标、css、less等
│   │     └── css/
│   │          ├── common   全局公用样式
│   │          └── packages 页面模块包...
│   ├── components/         项目组件，项目内模块相关的组件
│   │     ├── Base          主框架ui公用组件
│   │     ├── iview.js      主框架iview ui配置公用组件
│   │     └── index.js      主框架ui公用组件入口
│   ├── utils/              项目数据处理全局公用方法等...
│   ├── views/              模块页面，包含各个模块独立路由配置及模块相关组件
│   │     ├── account       项目登录相关     
│   │     └── .../modelN/   模块N...
│   ├── router/             主路由配置
│   └── store/              vuex相关
├── App.vue                 
├── main.js                 入口
├── global.js               全局配置，公共方法集等配置
└──.env*                    环境配置
```