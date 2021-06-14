import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { firebase } from '../firebase'

Vue.use(VueRouter)

const baseRoutes = [
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/error/Error404.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/auth/Signup.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/auth/ForgotPassword.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('@/views/auth/ResetPassword.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/reset-password-confirm',
    name: 'reset-password-confirm',
    component: () => import('@/views/auth/ResetPasswordConfirm.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/register-verify-email',
    name: 'register-verify-email',
    component: () => import('@/views/auth/RegisterVerifyEmail.vue'),
    meta: {
      layout: 'full',
    },
  },
]

const routesWithoutStores = [
  {
    path: '/store-connect',
    name: 'store-connect',
    component: () => import('@/views/StoreConnect.vue'),
    meta: {
      pageTitle: 'StoreConnect',
      requiresAuth: true,
    },
  },
]

const routesWithStores = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      pageTitle: 'Dashboard',
      requiresAuth: true,
    },
  },
  {
    path: '/customers',
    name: 'customers',
    component: () => import('@/views/Customers.vue'),
    meta: {
      pageTitle: 'Customers',
      requiresAuth: true,
    },
  },
  {
    path: '/customer-register',
    name: 'customer-register',
    component: () => import('@/views/CustomerRegister.vue'),
    meta: {
      pageTitle: 'Customer Register',
      requiresAuth: true,
    },
  },
  {
    path: '/customer',
    name: 'customer',
    component: () => import('@/views/Customer.vue'),
    meta: {
      pageTitle: 'Customer',
      requiresAuth: true,
    },
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: () => import('@/views/Transactions.vue'),
    meta: {
      pageTitle: 'Transactions',
      requiresAuth: true,
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/Settings.vue'),
    meta: {
      pageTitle: 'Settings',
      requiresAuth: true,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [...baseRoutes, ...routesWithStores, ...routesWithoutStores],
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const { currentUser } = firebase.auth

  const { stores } = store.state.app

  if (requiresAuth && !currentUser) next({ path: '/login', query: { redirect: to.fullPath } })
  else if (!requiresAuth && currentUser) next('/')
  else if (!requiresAuth && !currentUser) next()
  else if (requiresAuth && currentUser && stores.length === 0 && to.path !== '/store-connect') next('/store-connect')
  else next()
})

/* store.watch(state => {
  const stores = [...state.app.stores]
  // router.options.routes = []
  console.log(router)
  if (stores.length > 0) {
    router.addRoutes(routesWithStores)
    console.log('Loaded Stores')
  } else {
    router.addRoutes(routesWithoutStores)
    console.log('No Stores')
  }
}) */

export default router
