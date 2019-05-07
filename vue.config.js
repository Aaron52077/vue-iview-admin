var path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './',
    // 生产环境下css 分离文件
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
    configureWebpack: {    
        // 覆盖webpack默认配置的都在这里   
        // 配置解析别名      
        resolve: {                   
            alias: {
                '@': path.resolve(__dirname, './src')
            } 
        }
    },
    chainWebpack: config => {
        config.plugins.delete('prefetch')
        // 配置解析别名
        // config.resolve.alias.set('@', resolve('src'))
    }
}