import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import setPageTitle from '@/utils/setPageTitle'

// not show circle
NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
    NProgress.start()

    document.title = setPageTitle(to.meta.title)

    const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/login') {
            // 跳转{path: '/'}时重定向到'/home',又触发一次beforeEach
            next({ path: '/' })
            NProgress.done()
        } else {
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            // 初始化时，角色为空
            if (hasRoles) {
                next()
            } else {
                try {
                    const { roles } = await store.dispatch('user/getUserInfo')
                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

                    router.addRoutes(accessRoutes)
                    next({ ...to, replace: true })
                } catch (error) {
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})