import { login, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { SET_TOKEN, SET_ROLES } from '../mutation-types'
import router, { resetRouter } from '@/router'

const state = {
    token: getToken(),
    roles: [] // 用户角色
}

const mutations = {
    [SET_TOKEN](state, token) {
        state.token = token
    },
    [SET_ROLES](state, roles) {
        state.roles = roles
    }
}

const actions = {
    login({ commit }, userInfo) {
        const { username, password } = userInfo

        return new Promise((resolve, reject) => {
            login({
                username: username.trim(),
                password: password.trim()
            }).then(res => {
                commit(SET_TOKEN, res.data.token)
                setToken(res.data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit(SET_TOKEN, '')
                commit(SET_ROLES, [])
                removeToken()
                resetRouter()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getUserInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getUserInfo(state.token).then(res => {
                if (!res.data) {
                    reject('Verification failed, please Login again.')
                }

                if (!res.data.roles || res.data.roles.length === 0) {
                    reject('getInfo: roles must be a non-null array!')
                }

                commit(SET_ROLES, res.data.roles)
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 修改角色权限
    changeRoles({ commit, dispatch }, roles) {

    },
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit(SET_TOKEN, '')
            commit(SET_ROLES, [])
            removeToken()
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}