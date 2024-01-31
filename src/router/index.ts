import { createRouter } from 'vue-router'
// import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
  },
  // {
  //   path: '/goods',
  //   component: () => import('../views/Goods.vue')
  // },
  {
    path: '/about',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/gallery',
    component: () => import('../views/Gallery.vue'),
  },
]

export default function (history: any) {
  return createRouter({
    history,
    routes,
  })
}
