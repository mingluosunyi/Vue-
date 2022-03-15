import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/index'
import HomeIndex from '@/views/home/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: HomeIndex
  }
]

const router = new VueRouter({
  routes
})

export default router
