import { createRouter, createWebHashHistory } from 'vue-router'

export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: publicRoutes
})

export default router
