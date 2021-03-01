import Vue from 'vue'
import VueRouter from 'vue-router'
import Note from '../views/Note.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Note',
    component: Note
  },
  {
    path: '/notes',
    name: 'Note',
    component: Note
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
