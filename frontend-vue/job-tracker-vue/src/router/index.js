import { createRouter, createWebHistory } from 'vue-router'
import JobList from '../views/JobList.vue'
import AddJob from '../views/AddJob.vue'
import EditJob from '../views/EditJob.vue'

const routes = [
  { path: '/', component: JobList },
  { path: '/add', component: AddJob },
  { path: '/edit/:id', component: EditJob },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
