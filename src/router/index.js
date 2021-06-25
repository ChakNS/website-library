import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '_c/main'
import Tools from './tools'

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      redirect: '/library-info',
      component: Main,
      children: [
        {
          path: 'library-info',
          name: 'library-info',
          component: () => import(/* webpackChunkName: "index" */ '@/pages/index')
        },
      ]
    },
    ...Tools,
  ]
})

export default router