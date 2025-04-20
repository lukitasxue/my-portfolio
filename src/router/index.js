// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../App.vue'
import ProjectsPage from '../views/ProjectsPage.vue'
import ProjectDetail from '../views/ProjectDetail.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/projects', component: ProjectsPage },
  { path: '/projects/:id', component: ProjectDetail },
]

const router = createRouter({
  history: createWebHistory(),
  routes,

  // This ensures every route change scrolls to the top
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

export default router
