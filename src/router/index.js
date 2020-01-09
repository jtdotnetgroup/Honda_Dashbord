import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/Home.vue'
import one from '../views/Report/one.vue'
import two from '../views/Report/two.vue'
import three from '../views/Report/three.vue'
import four from '../views/Report/four.vue'
import five from '../views/Report/five.vue'
import six from '../views/Report/six.vue'
import test from '../views/Report/test.vue'
import href from '../views/Report/href.vue'

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
  },
  {
    path: '/two',
    name: 'two',
    component: two
  },
  {
    path: '/three',
    name: 'three',
    component: three
  },
  {
    path: '/four',
    name: 'four',
    component: four
  },
  {
    path: '/five',
    name: 'five',
    component: five
  },
  {
    path: '/six',
    name: 'six',
    component: six
  },
  {
    path: '/test',
    name: 'test',
    component: test
  },
  {
    path: '/href',
    name: 'href',
    component: href
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
