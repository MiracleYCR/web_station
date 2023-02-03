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
          import(/* webpackChunkName: "profile" */ '@/views/home/index.vue'),
        meta: {
          title: '个人主页',
          icon: 'User'
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
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: [...publicRoutes, ...privateRoutes]
})

export default router
