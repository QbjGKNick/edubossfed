import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import layoutRoutes from './layoutRoutes'
import Layout from '@/layout/index.vue'

Vue.use(VueRouter)

// 路由配置规则
const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    // webpackChunkName: 'login' 方便打包后调试，不加它，默认被打包成1.vue 等等，使用它则用 login 别名代替
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: {
      requiresAuth: true // 自定义数据
    }, // meta 默认就是一个空对象
    children: layoutRoutes
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */'@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
