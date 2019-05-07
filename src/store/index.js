/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import { userLogin } from '@/api/login'
import cache from '@/utils/cache'

Vue.use(Vuex)

const state = {
    datas: {},
    token: '',
    logs: [],               // 错误日志
    userInfo: '',
}

const getters = {
    token: state => state.token,
    userInfo: state => state.userInfo,
}

const mutations = {
    setData(state, data) {
        state.datas = data
    },
    setToken(state, token) {
        state.token = token
    },
    loginOut(state) {
        state.userInfo = {}
        cache.removeLocal('token')
    },
    setLogs(state, val) {
        state.logs.push(val)
    },
}

const actions = {
    setData({ commit }, data) {
        commit('setData', data)
    },
    // 获取登录数据
    GetLoginData({ commit }, params) {
        // async 
        const { url, data } = params
        return new Promise((resolve, reject) => {
            userLogin(url, data).then(res => {
                const { access_token, username } = res
                commit('setToken', access_token)
                cache.setLocal('token', access_token)
                state.userInfo = username
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    }
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
