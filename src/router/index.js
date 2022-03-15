import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/index'
import HomeIndex from '@/views/home/index'
import Layout from '@/views/layout/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeIndex
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  // 如果要访问的页面不是login，则校验登陆状态，如果没登陆则跳转到登陆页面
  if (to.path !== '/login') {
    const user = window.localStorage.getItem('token')
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
