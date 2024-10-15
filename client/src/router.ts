import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import WelcomePage from '@/pages/WelcomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from './services/auth'
import ExplorePage from './pages/ExplorePage.vue'
import MyCirclePage from './pages/MyCirclePage.vue'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: WelcomePage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/explore',
    name: 'Explore',
    component: ExplorePage,
    meta: { requiresAuth: true }
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: HomePage,
  //   meta: { requiresAuth: true }
  // },
  {
    path: '/my-circle',
    name: 'My Circle',
    component: MyCirclePage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
