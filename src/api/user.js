import request from '@/utils/request'

export const login = userInfo => {
    return request({
        url: '/api/login',
        method: 'post',
        data: userInfo
    })
}

export const logout = token => {
    return request({
        url: '/api/logout',
        method: 'get',
        params: { token } 
    })
}

export const getUserInfo = token => {
    return request({
        url: '/api/userinfo',
        methods: 'get',
        params: { token }
    })
}