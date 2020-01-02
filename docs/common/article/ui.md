# 项目pc、wap移动端引用ui包选择

!> pc [view-design](https://www.iviewui.com/)、[element-ui](https://element.eleme.cn/#/zh-CN)、[ant-design-vue](https://www.antdv.com/docs/vue/introduce-cn/) 推荐view-design

> 第一步：yarn add view-design / npm install view-design

> 第二步：在src/components/iview.js配置通用组件注册

``` js
    import Vue from 'vue'
    import { Button } from 'view-design'
    import '~view-design/dist/styles/iview.css'
    // 别名自定义组件、方便区分自定义的区别
    const components = {
        'sButton': Button
    }
    Object.keys(components).forEach(key => {
        Vue.component(key, components[key]);
    })
```

!> wap [Vant](https://youzan.github.io/vant/#/zh-CN/)、[NutUI](http://nutui.jd.com/#/index)、[ant-design-vue](https://mobile.ant.design/index-cn) 推荐Vant

> 第一步：yarn add vant / npm install vant

> 第二步：在src/components/vant.js配置通用组件注册

``` js
    import Vue from 'vue'
    import { Tabbar } from 'vant'
    import '~view-design/dist/styles/iview.css'
    // 别名自定义组件、方便区分自定义的区别
    const components = {
        'vanTabbar': Tabbar
    }
    Object.keys(components).forEach(key => {
        Vue.component(key, components[key]);
    })
    // 直接方式：
    import '~vant/lib/index.css'
    // 推荐方式：babel.config.js 按需加载样式
    // 执行命令 yarn add babel-plugin-import --dev / npm install babel-plugin-import --save-dev
    module.exports = {
        plugins: [
                [
                    'import',
                    {
                        libraryName: 'vant',
                        libraryDirectory: 'es',
                        // 指定样式路径
                        style: name => `${name}/style/less`
                    },
                    'vant'
                ]
            ]
        }
    
```