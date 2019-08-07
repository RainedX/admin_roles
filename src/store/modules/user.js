import { getToken } from '@/utils/auth'

const state = {
    token: getToken(),
    roles: [] // 用户角色
}

const mutations = {

}

const actions = {
    login({ commit }, data) {
        
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}