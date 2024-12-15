import {createRouter, createWebHistory, RouterView} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:locale?",
      component: RouterView,
      children: [
        {
          path: "",
          name: "main",
          component: HomeView,
        },
        {
          path: ":pathMatch(.*)*",
          name: "NotFound",
          component: HomeView,
        },
      ],
    },
  ],
})

export default router
