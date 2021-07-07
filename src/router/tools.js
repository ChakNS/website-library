import Main from '_c/main'

export default [
  {
    path: '/tools',
    name: 'tools',
    redirect: '/tools/list',
    component: Main,
    children: [
      {
        path: 'list',
        name: 'tools-list',
        component: () => import(/* webpackChunkName: "index" */ '@/pages/tools/tools-list.vue')
      },
      {
        path: 'decode',
        name: 'tools-decode',
        component: () => import(/* webpackChunkName: "index" */ '@/pages/tools/components/toolsDecode')
      }
    ]
  }
]
