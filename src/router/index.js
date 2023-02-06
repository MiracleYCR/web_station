import { createRouter, createWebHashHistory } from 'vue-router'

import layout from '@/views/layout/index.vue'

export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    component: layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home/index.vue'),
        meta: {
          title: '站点主页',
          icon: 'House'
        }
      }
    ]
  }
]

export const privateRoutes = [
  {
    path: '/social',
    component: layout,
    redirect: '/social/square',
    name: 'socialSquare',
    meta: {
      title: '社交广场',
      icon: 'Compass'
    },
    children: [
      {
        path: '/social/square',
        component: () =>
          import(
            /* webpackChunkName: "social-square" */ '@/views/social/square.vue'
          ),
        meta: {
          title: '微博大厅',
          icon: 'ChatDotRound'
        }
      },
      {
        path: '/social/posts',
        component: () =>
          import(
            /* webpackChunkName: "social-posts" */ '@/views/social/posts.vue'
          ),
        meta: {
          title: '写微博',
          icon: 'EditPen'
        }
      }
    ]
  },
  {
    path: '/profile',
    component: layout,
    redirect: '/profile/setting',
    name: 'profileCenter',
    meta: {
      title: '个人中心',
      icon: 'User'
    },
    children: [
      {
        path: '/profile/setting',
        component: () =>
          import(
            /* webpackChunkName: "profile-setting" */ '@/views/profile/setting.vue'
          ),
        meta: {
          title: '用户设置',
          icon: 'Setting'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: [...publicRoutes, ...privateRoutes]
})

export default router
