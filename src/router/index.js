import Vue from 'vue'
import Router from 'vue-router'
import { constantRoutes } from './routes'

Vue.use(Router)

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

// 重置路由
export const resetRouter = () => {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

const router = createRouter()

export default router