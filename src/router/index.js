import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home/Home')
  },
  {
    path: '/hammer',
    name: 'hammer',
    component: () => import('../views/hammer/hammer')
  },
  {
    path: '/moveCard',
    name: 'moveCard',
    component: () => import('../views/hammer/moveCard')
  },
  {
    path: '/face',
    name: 'face',
    component: () => import('../views/face/index')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
