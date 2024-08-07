import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from '../views/home/Home.vue'
import NotFound from '../views/404.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import Userlist from '../views/userlist/Userlist.vue'
import Userinfo from '../views/userinfo/Userinfo.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        isAuth: true
      },
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: '/userlist',
          name: 'userlist',
          component: Userlist
        },
        {
          path: '/userinfo',
          name: 'userinfo',
          component: Userinfo
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/:pathMatch(.*)*', // 使用 .* 匹配任意字符，* 表示匹配 0 次或多次
      name: 'NotFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from) => {
  if (to.meta.isAuth) {
    const token = localStorage.getItem('token')
    if (!token) {
      return {
        path: '/login',
        query: {
          a: 100,
          b: 'abcdefg'
        }
      }
    }
  }
})

export default router
