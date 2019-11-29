import { login, logout } from '@/api/login'
import cache from '@/utils/cache'
import { resetRouter } from '@/router'

const state = {
    token: cache.getLocal('token'),
    logs: [],               // 错误日志
    roles: [],
    name: cache.getLocal('user_name'),
    avatar: cache.getLocal('user_avatar')
}

const mutations = {
    setToken: (state, token) => {
        state.token = token
    },
    setName: (state, name) => {
        state.name = name
    },
    setAvatar: (state, avatar) => {
        state.avatar = avatar
    },
    setRoles: (state, roles) => {
        state.roles = roles
    },
    setLogs: (state, val) => {
        state.logs.push(val)
    }
}

const actions = {
    accountIn({ commit }, params) {
        // 账户登录
        return new Promise((resolve, reject) => {
            login(params).then(res => {
                const { data } = res
                if (!data) {
                    reject('Verification failed, please Login again.')
                }
                const { access_token, name, avatar, roles } = data
                // roles must be a non-empty array  !roles || roles.length == 0
                if (!!data && data === '用户角色不存在') {
                    reject(data || '用户角色不存在')
                }
                commit('setRoles', roles)
                commit('setToken', access_token)
                commit('setName', name)
                commit('setAvatar', avatar)
                cache.setLocal('token', access_token)
                cache.setLocal('user_name', name)
                cache.setLocal('user_avatar', avatar)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    accountOut({ commit, state }) {
        // 帐号登出
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('setToken', '')
                commit('setRoles', [])
                cache.removeLocal('token')
                cache.removeLocal('user_name')
                cache.removeLocal('user_avatar')
                resetRouter()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}