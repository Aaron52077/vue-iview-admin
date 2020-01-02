import dataBase from '@/global'
import cache from '@/utils/cache'

/**
 * 持久化存储状态
 * sidebar 是否展开收起菜单
 * offsetTop 距离顶部距离
 * language 系统语言
 * sensitive 是否脱敏
 * tabbar 顶部导航
 * navbar 左侧导航
 */

const state = {
    sidebar: {
        opened: cache.getCookie('sidebarStatus') ? !!+cache.getCookie('sidebarStatus') : true,
        withoutAnimation: false
    },
    offsetTop: 0,
    language: dataBase.lang,
    sensitive: false,
    tabbar: '组件类',
    navbar: '首页'
}

const mutations = {
    TOGGLE_SIDEBAR: state => {
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.withoutAnimation = false
        if (state.sidebar.opened) {
            cache.setCookie('sidebarStatus', 1)
        } else {
            cache.setCookie('sidebarStatus', 0)
        }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
        cache.setCookie('sidebarStatus', 0)
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
    },
    SET_OFFSET_TOP: (state, value) => {
        state.offsetTop = value
    },
    SET_TABBAR: (state, value) => {
        state.tabbar = value
    },
    SET_NAVBAR: (state, value) => {
        state.navbar = value
    },
    SET_SENSITIVE: state => {
        state.sensitive = !state.sensitive
    }
}

const actions = {
    toggleSideBar({ commit }) {
        commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
        commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    setNavbar({ commit }, value) {
        commit('SET_NAVBAR', value)
    },
    setTabbar({ commit }, value) {
        commit('SET_TABBAR', value)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}