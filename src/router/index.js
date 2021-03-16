import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '_c/main'

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      redirect: '/index',
      component: Main,
      children: [
        {
          path: 'index',
          component: () => import(/* webpackChunkName: "index" */ '@/pages/index')
        },
      ]
    },
  ]
})

export default router