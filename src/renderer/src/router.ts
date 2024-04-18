import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: '/', component: () => import('./pages/home.vue') },
  { path: '/admin', name: 'admin', component: () => import('./pages/admin.vue') },

  {
    path: '/404',
    name: 'notFound',
    label: 'notFound',
    component: () => import('./pages/404.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    label: 'notFound',
    component: () => import('./pages/404.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
