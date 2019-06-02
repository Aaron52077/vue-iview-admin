/**
 * 顶部导航 navList
 * @returns {*}
 */
export const navList = [
    {
        id: '1',
        icon: 'md-cube',
        name: '组件类'
    },
    {
        id: '2',
        icon: 'md-chatbubbles',
        name: 'api'
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
            {name: 'TimePicker 时间控件', path: '/timePicker', icon: 'md-time'},
            {name: 'echart 图表', path: '/echart', icon: 'md-podium'}
        ]
    }
]