import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/uer',
    name: 'User',
    component: () => import('../views/User.vue')
  },
  {
    path: '/proposal/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/proposal/:pid',
    name: 'Proposal',
    component: () => import('../views/Proposal.vue')
  },
  {
    path: '/proposal/:pid/tally',
    name: 'Tally',
    component: () => import('../views/Tally.vue')
  },
  {
    path: '/vote/:vid',
    name: 'Vote',
    component: () => import('../views/Vote.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
