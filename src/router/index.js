import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
    {
      path: '/second-page',
      name: 'second-page',
      component: () => import('@/views/SecondPage.vue'),
      meta: {
        pageTitle: 'Second Page',
        breadcrumb: [
          {
            text: 'Second Page',
            active: true,
          },
        ],
      },
    },
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
  ],
})

export default router
