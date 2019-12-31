import dataBase from '@/global'
import cache from '@/utils/cache'

const state = {
    sidebar: {
        opened: cache.getCookie('sidebarStatus') ? !!+cache.getCookie('sidebarStatus') : true,
        withoutAnimation: false
    },
    offsetTop: 0,
    language: dataBase.lang,
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
    SET_OFFSET_TOP: (state, value) => {
        state.offsetTop = value
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
        cache.setCookie('sidebarStatus', 0)
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
    },
    SET_TABBAR: (state, value) => {
        state.tabbar = value
    },
    SET_NAVBAR: (state, value) => {
        state.navbar = value
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