import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TerminalView from '../views/TerminalView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',          component: Home },
    { path: '/terminal',  component: TerminalView },
  ],
})

export default router
