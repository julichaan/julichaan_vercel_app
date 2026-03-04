import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TerminalView from '../views/TerminalView.vue'
import HtbTest from '../views/HtbTest.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',          component: Home },
    { path: '/terminal',  component: TerminalView },
    { path: '/htb-test',  component: HtbTest },
  ],
})

export default router
