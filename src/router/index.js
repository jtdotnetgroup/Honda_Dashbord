import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/Home.vue'
import one from '../views/Report/one.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/one',
    name: 'one',
    component: one
  }
  // {
  //   path: '/two',
  //   name: 'two',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Report/two.vue')
  // },
  // {
  //   path: '/three',
  //   name: 'three',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Report/three.vue')
  // },
  // {
  //   path: '/four',
  //   name: 'four',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Report/four.vue')
  // },
  // {
  //   path: '/five',
  //   name: 'five',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Report/five.vue')
  // },
  // {
  //   path: '/six',
  //   name: 'six',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Report/six.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
