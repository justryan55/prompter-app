import AuthenticationPage from '@/pages/AuthenticationPage.vue'
import WelcomePage from '@/pages/WelcomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: WelcomePage
  },
  {
    path: '/authentication',
    name: 'Authentication',
    component: AuthenticationPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
