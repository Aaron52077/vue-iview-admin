/**
 * 顶部导航 navList
 * @returns {*}
 */
export const navList = [
    {
        icon: 'md-cube',
        name: '组件类',
        path: '/',
        childrens: []
    },
    {
        icon: 'md-build',
        name: 'api',
        path: '/api',
        childrens: []
    },
    {
        icon: 'ios-podium',
        name: '可视化',
        path: '/echarts',
        childrens: []
    },
    {
        icon: 'logo-github',
        name: 'language',
        path: '/',
        childrens: [
            {
                title: '语言',
                list: [
                    {
                        key: '中文',
                        value: 'zh-cn'
                    },
                    {
                        key: '繁体',
                        value: 'zh-tw'
                    },
                    {
                        key: 'English',
                        value: 'en'
                    }
                ]
            },
            {
                title: '源码',
                list: [
                    {
                        key: '地址',
                        value: 'https://github.com/Aaron52077/vue-wuli-ui.git'
                    }
                ]
            }
        ]
    }
]

/**
 * 侧边导航 menuList
 * @returns {*}
 */
export const menuList = [
    {
        name: '组件栏',
        children: [
            {name: '图标', path: '/icons', icon: 'md-heart-outline'},
            {name: '头像', path: '/avatar', icon: 'md-person'},
            {name: '无记录', path: '/noneTip', icon: 'md-paw'},
            {name: '时间控件', path: '/timePicker', icon: 'md-time'}
        ]
    },
    {
        name: 'API',
        children: [
            {name: '面包屑', path: '/api', icon: 'md-filing'},
            {name: '富文本1', path: '/api/umEditor', icon: 'ios-share'},
            {name: '富文本2', path: '/api/quillEditor', icon: 'ios-share'},
            {name: '富文本3', path: '/api/tinymce', icon: 'ios-share'},
            {name: '图片裁剪', path: '/api/cropper', icon: 'md-clipboard'}
        ]
    },
    {
        name: '可视化',
        children: [
            {name: '图表', path: '/echarts/exp', icon: 'md-podium'},
            {name: '柱状图', path: '/echarts/bar', icon: 'md-stats'},
            {name: '线性图', path: '/echarts/line', icon: 'md-done-all'},
            {name: '雷达图', path: '/echarts/radar', icon: 'md-wifi'},
            {name: '饼图', path: '/echarts/pie', icon: 'md-radio-button-off'},
            {name: '地理坐标系', path: '/echarts/map', icon: 'md-map'}
        ]
    }
]