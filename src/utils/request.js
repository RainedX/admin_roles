import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers.Authorization = getToken()
        }

        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code === 2001) {
            Message({
                message: '登录成功',
                type: 'success',
                duration: 3 * 1000
            })

            return res
        }
        if (res.code !== 0) {
            Message({
                message: res.message || 'Error code',
                type: 'error',
                duration: 3 * 1000
            })
            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                MessageBox.confirm('You have been logged out', 'tip', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })
            }
            return Promise.reject('error: you can cancel to stay on this page, or log in again')
        } else {
            return res
        }
    },
    error => {
        console.log('err:', error)
        Message({
            message: error.message,
            type: 'error',
            duration: 3 * 1000
        })

        return Promise.reject(error)
    }   
)

export default service