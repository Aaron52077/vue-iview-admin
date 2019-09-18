const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')

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
    // 生产环境下source map, 可以将其设置为 false 以加速生产环境构建 process.env.VUE_APP_ENV !== 'prod'
    productionSourceMap: false, 
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
    configureWebpack: config => {    
        // 覆盖webpack默认配置的都在这里   
        // config.performance.hints = false
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.mode = 'production'
            return {
                // 关闭 webpack 的性能提示
                performance: {
                    hints: false
                },
                plugins: [new CompressionPlugin({
                    test: /.js$|.html$|.css/,    // 匹配文件名
                    threshold: 10240,            // 对超过10k的数据进行压缩 只处理大于此大小的资产。以字节为单位
                    deleteOriginalAssets: false // 是否删除原文件
                })]
            }
        }
    },
    chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch')
        // 覆盖webpack默认配置的都在这里, 配置解析别名  
        config.resolve.alias
            .set("@base", resolve("src/components/Base"))
    }
}