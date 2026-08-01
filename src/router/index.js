import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const BASE = 'julichaan'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        title: {
          es: `${BASE} | Investigador de Seguridad y Bug Bounty Hunter`,
          en: `${BASE} | Security Researcher & Bug Bounty Hunter`,
        },
      },
    },
    {
      path: '/writeups',
      component: () => import('../views/Writeups.vue'),
      meta: { layout: 'default', title: `Writeups · ${BASE}` }
    },
    {
      path: '/about',
      component: () => import('../views/CV.vue'),
      meta: {
        layout: 'default',
        title: { es: `Sobre mí · ${BASE}`, en: `About · ${BASE}` },
      },
    },
    {
      path: '/blog',
      component: () => import('../views/Blog.vue'),
      meta: { layout: 'default', title: `Blog · ${BASE}` }
    },
    {
      path: '/notes',
      component: () => import('../views/Notes.vue'),
      meta: { layout: 'default', title: { es: `Notas · ${BASE}`, en: `Notes · ${BASE}` } }
    },
    {
      path: '/writeup',
      component: () => import('../views/WriteupViewer.vue'),
      meta: { title: `Writeup · ${BASE}` }   // no layout → no navbar/footer
    },
  ],
})

export default router
