/**
 * 顶部导航 navList
 * @returns {*}
 */
export const navList = [
    {
        icon: 'md-cube',
        name: '组件类',
        path: '/'
    },
    {
        icon: 'md-build',
        name: 'api',
        path: '/api'
    },
    {
        icon: 'ios-podium',
        name: '可视化',
        path: '/echarts'
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
            {name: 'Icon 图标', path: '/icons', icon: 'md-heart-outline'},
            {name: 'Avatar 头像', path: '/avatar', icon: 'md-person'},
            {name: 'NoneTip 无记录', path: '/noneTip', icon: 'md-paw'},
            {name: 'TimePicker 时间控件', path: '/timePicker', icon: 'md-time'}
        ]
    },
    {
        name: 'API',
        children: [
            {name: 'Breadcrumb 面包屑', path: '/api', icon: 'md-filing'},
            {name: 'umEditor 富文本', path: '/api/umEditor', icon: 'ios-share'},
            {name: 'quillEditor 富文本', path: '/api/quillEditor', icon: 'ios-share'},
            {name: 'tinymce 富文本', path: '/api/tinymce', icon: 'ios-share'},
            {name: 'cropper 图片裁剪', path: '/api/cropper', icon: 'md-clipboard'}
        ]
    },
    {
        name: '可视化',
        children: [
            {name: 'Echart 图表', path: '/echarts/exp', icon: 'md-podium'},
            {name: 'Bar', path: '/echarts/bar', icon: 'md-stats'},
            {name: 'Line', path: '/echarts/line', icon: 'md-done-all'},
            {name: 'Radar', path: '/echarts/radar', icon: 'md-wifi'},
            {name: 'Pie', path: '/echarts/pie', icon: 'md-radio-button-off'}
        ]
    }
]