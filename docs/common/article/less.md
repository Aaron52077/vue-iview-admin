# 项目less全局变量配置

!> 基于vue-cli 3.0

> 借助 style-resources-loader vue-cli-plugin-style-resources-loader

### 推荐方式

> 第一步：yarn add style-resources-loader vue-cli-plugin-style-resources-loader --dev / npm install style-resources-loader vue-cli-plugin-style-resources-loader --save-dev 

> 第二步：在vue.config.js配置项中添加 

``` js
    function resolve(dir) {
        return path.join(__dirname, dir)
    }
    module.exports = {
        pluginOptions: {
            'style-resources-loader': {
                preProcessor: 'less',
                patterns: [
                    resolve('src/assets/css/common/_var.less'),
                    resolve('src/assets/css/common/_mixins.less')
                ] // 引入全局样式变量以及混合函数
            }
        }
    }
```