import { createRouter, createWebHashHistory } from 'vue-router'
import dashboard from '../views/dashboard.vue'
// import dashboard from '../component/dashboard'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: dashboard
  },

  {
    path: '/URL',
    name: 'URL',
    component: () => import('@/views/URL.vue')
  },
  {
    path: '/Album',
    name: 'Album',
    component: () => import('@/views/Album.vue')
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('@/components/create.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue')
  },
  // {
  //   path: '/URLdashboard',
  //   name: 'URLdashboard',
  //   component: () => import('@/views/URLdashboard.vue')
  // },
  ,
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login.vue')
  },
  ,
  {
    path: '/register',
    name: 'register',
    component: () => import('@/components/Register.vue')
  },
  {
    path: '/searchurl',
    name: 'searchurl',
    component: () => import('@/components/searchurl.vue')
  },
  {
    path: '/story',
    name: 'story',
    component: () => import('@/components/story.vue')
  },

]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
