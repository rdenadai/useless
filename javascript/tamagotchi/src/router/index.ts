import { createRouter, createWebHistory } from 'vue-router'
import TheCanvas from '../components/TheCanvas.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: TheCanvas
    }
  ]
})

export default router
