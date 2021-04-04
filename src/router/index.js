import Vue from 'vue'
import VueRouter from 'vue-router'
import Start from '../views/Start.vue'
import Text from '../views/Text.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Start',
    component: Start
  },
  {
    path: '/text',
    name: 'Text',
    component: Text
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
