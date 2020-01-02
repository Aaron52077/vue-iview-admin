/**
 * Author: chao_code520@163.com
 * name: Aaron
 */
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './',
    // 生产环境下source map, 可以将其设置为 false 以加速生产环境构建
    productionSourceMap: false, 
    // 打包生成目录，不同的环境打不同包名  
    outputDir: process.env.outputDir,  
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    // 开启less全局变量                      
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        },
        extract: false
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                resolve('src/assets/css/common/_var.less'),
                resolve('src/assets/css/common/_mixins.less')
            ] // 引入全局样式变量
        }
    },
    devServer: {
        open: true,                 
        overlay: {
            warnings: false,
            errors: true
        },
        // detail: https://cli.vuejs.org/config/#devserver-proxy
        proxy: {
            '/api': {
                target: process.env.VUE_APP_API,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    configureWebpack: {    
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: process.env.VUE_APP_TITLE,
        performance: {
            hints: false
        },
        // 配置解析别名  
        resolve: {
            alias: {
                '@base': resolve('src/components/Base')
            }
        }
    },
    chainWebpack: config => {
        // detail: https://github.com/PanJiaChen/vue-element-admin/blob/master/vue.config.js
        /**
         * 删除懒加载模块的 prefetch preload，降低带宽压力
         * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
         * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
         * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
         */
        config.plugins.delete('prefetch').delete('preload')
        // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
        config.resolve.symlinks(true)
        // building config. webpack 4.0, 开发环境 sourcemap 不包含列信息
        config.when(process.env.NODE_ENV === 'development',
            config => config.devtool('cheap-source-map')
        )
        config.when(process.env.NODE_ENV !== 'development',
          config => {
            config
                .plugin('ScriptExtHtmlWebpackPlugin')
                .after('html')
                .use('script-ext-html-webpack-plugin', [{
                    // `runtime` must same as runtimeChunk name. default is `runtime`
                    inline: /runtime\..*\.js$/
                }])
                .end()
            config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, // minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
    }
}