# 项目打包生成预配置url处理

!> 基于vue-cli 3.0

> 借助 generate-asset-webpack-plugin

### 推荐方式

> 第一步：在public中去生成serverConfig.json文件，让其在build的时候生成json文件，然后再使用axios异步获取json，替换url即可

> 第二步：yarn add generate-asset-webpack-plugin --dev / npm install generate-asset-webpack-plugin --save-dev 

> 第三步：在vue.config.js配置项中添加 

``` js
    const GenerateAssetPlugin = require('generate-asset-webpack-plugin')
    // 获取环境api地址
    const env = {
        VUE_APP_API: process.env.VUE_APP_API
    }
    // 配置自动生成
    /* eslint-disable no-new */
    let createServerConfig = function (compilation) {
        var parseEnv = Object.assign({ _hash: compilation.hash }, env) // process.env
        Object.keys(parseEnv).forEach(function (key) {
            parseEnv[key] = parseEnv[key].replace(/"/g, "")
        });
        return JSON.stringify(parseEnv, null, 2)
    }
    module.exports = {
        configureWebpack: {    
            plugins: [
                new GenerateAssetPlugin({
                    filename: './public/serverConfig.json',
                    fn: (compilation, cb) => {
                        cb(null, createServerConfig(compilation))
                    },
                    extraFiles: []
                })
            ]
        }
    }
```

> 第四步：在main.js获取ApiUrl

``` js
    // 获取服务端动态配置地址方式
    function getServerConfig() {
        return new Promise((resolve, reject) => {
            axios.get('./serverConfig.json').then((result) => {
                let config = result.data
                axios.defaults.baseURL = config.VUE_APP_API   
                resolve()
            }).catch((error) => {
                axios.defaults.baseURL = process.env.VUE_APP_API 
                reject()
            })
        })
    }
    async function init() {
        await getServerConfig();
        new Vue({
            router,
            store,
            created() {
                dataBase.init(this)
            },
            render: h => h(App)
        }).$mount('#app')
    }
    init()
```