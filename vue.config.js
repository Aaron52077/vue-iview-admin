var path = require('path')

/**
 * @example 
 * .env                # 在所有的环境中被载入
 * .env.local          # 在所有的环境中被载入，但会被 git 忽略
 * .env.[mode]         # 只在指定的模式中被载入
 * .env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
 */

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './',
    // 生产环境下css 分离文件 设为false打包时不生成.map文件
    productionSourceMap: process.env.VUE_APP_ENV == 'prod', 
    // 打包生成目录，不同的环境打不同包名  
    outputDir: process.env.outputDir,  
    // 开启less全局变量                      
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    devServer: {
        // 配置服务器                    
        // 处理host不识别
        disableHostCheck: false,     
        https: false,
        // 配置自动启动浏览器
        open: true,                 
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            '/api': {
                target: process.env.VUE_APP_API || 'http://172.20.14.123:9999',
                ws: true,
                changeOrigin: true
            }
        }
    },
    chainWebpack: config => {
        // 覆盖webpack默认配置的都在这里, 配置解析别名  
        // 别名@为 VUE 自带默认配置(指向src),无需配置
        config.plugins.delete('prefetch')
        // 配置解析别名
        // config.resolve.alias.set('@', resolve('src'))
        config.resolve.alias
            .set("@base", resolve("src/components/Base"))
    }
}