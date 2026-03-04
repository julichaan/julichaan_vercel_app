import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Landing — sin header ni footer
    { path: '/', component: Home },
    // Páginas con layout completo
    { path: '/about',          component: () => import('../views/About.vue'),          meta: { layout: 'default' } },
    { path: '/certificaciones', component: () => import('../views/Certificaciones.vue'), meta: { layout: 'default' } },
    { path: '/writeups',        component: () => import('../views/Writeups.vue'),        meta: { layout: 'default' } },
    { path: '/blog',            component: () => import('../views/Blog.vue'),            meta: { layout: 'default' } },
    { path: '/notes',           component: () => import('../views/Notes.vue'),           meta: { layout: 'default' } },
  ],
})

export default router
