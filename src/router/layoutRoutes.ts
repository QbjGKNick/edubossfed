import { RouteConfig } from 'vue-router'

const routes: Array<RouteConfig> = [
  {
    path: '', // 默认子路由
    name: 'home',
    component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
  },
  {
    path: '/course',
    name: 'course',
    component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue')
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue')
  },
  {
    path: '/resource',
    name: 'resource',
    component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue')
  },
  {
    path: '/role',
    name: 'role',
    component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue')
  },
  {
    path: '/advert',
    name: 'advert',
    component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue')
  },
  {
    path: '/advert-space',
    name: 'advert-space',
    component: () => import(/* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue')
  },
  {
    path: '/menu/create',
    name: 'menu-create',
    component: () => import(/* webpackChunkName: 'menu-create' */ '@/views/menu/create.vue')
  },
  {
    path: '/menu/edit',
    name: 'menu-edit',
    component: () => import(/* webpackChunkName: 'menu-edit' */ '@/views/menu/edit.vue')
  }
]

export default routes
