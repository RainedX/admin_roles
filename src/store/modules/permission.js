import { asyncRoutes, constantRoutes } from '@/router/routes'
import { SET_ROLES } from '../mutation-types';

const state = {
    routes: [], // 完整路由表
    addRoutes: [] // 用户可访问路由表
}

const mutations = {
    [SET_ROLES](state, routes) {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    }
}

const hasPermission = (roles, route) => {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

export const filterAsyncRoutes = (routes, roles) => {
    const res = []

    routes.forEach(route => {
        let singleRoute = { ...route }

        if (hasPermission(roles, singleRoute)) {
            if (singleRoute.children && singleRoute.children.length) {
                res.children = filterAsyncRoutes(singleRoute.children, roles)
            }

            res.push(singleRoute)
        }
    })

    return res
}

const actions = {
    generateRoutes({ commit }, roles) {
        return new Promise(resolve => {
            let accessRoutes = null

            if (roles.includes('admin') ) {
                accessRoutes = asyncRoutes || []
            } else {
                accessRoutes = filterAsyncRoutes(asyncRoutes, roles)
            }

            commit(SET_ROLES, accessRoutes)
            resolve(accessRoutes)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}