import Layout from '@/layout/index.vue'
import NoFound from '@/views/NotFound.vue'

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
    },
    {
        path: '/404',
        component: NoFound,
        hidden: true
    }
]

export const asyncRoutes = [
    {
        path: '/about',
        component: Layout,
        redirect: '/about/index',
        meta: {title: 'About', roles: ['admin']},
        children: [
            {
                path: 'index',
                component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
            }
        ]
    }
]
