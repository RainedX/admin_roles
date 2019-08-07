import Layout from '@/layout/index.vue'

export const constantRoutes = [
    {
        path: '/login',
        component: () => import(/* webpackChunkName:"login" */ '@/views/Login.vue'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import(/* webpackChunkName:"home" */ '@/views/Home.vue'),
                meta: {
                    title: 'Home'
                }
            }
        ]
    }
]

export const asyncRoutes = []
