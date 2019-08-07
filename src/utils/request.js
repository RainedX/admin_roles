import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
    baseUrl: process.env.VUE_APP_BASE_API,
    timeout: 3000
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

        if (res.code !== 0) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
        } else {
            return res
        }
    }
)

export default service