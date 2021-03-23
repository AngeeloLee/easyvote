import { createRouter,createWebHashHistory } from 'vue-router'
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
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue')
  },
  {
    path: '/proposal/present',
    name: 'Present',
    component: () => import('../views/Present.vue')
  },
  {
    path: '/proposal/:paddr',
    name: 'Proposal',
    component: () => import('../views/Proposal.vue')
  },
  // {
  //   path: '/proposal/:paddr/tally',
  //   name: 'Tally',
  //   component: () => import('../views/Tally.vue')
  // },
  {
    path: '/vote/:vid',
    name: 'Vote',
    component: () => import('../views/Vote.vue')
  },
  {
    path: '/verify',
    name: 'Verify',
    component: () => import('../views/Verify.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

// routes.beforeEach((to, from, next) => {
//   if (to.matched.length !== 0) {
//     next()
//   } else {
//     next({ path: '/404' })
//   }
// })

export default router
