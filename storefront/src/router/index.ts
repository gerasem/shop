import {createRouter, createWebHistory, type Router, RouterView} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {handleLocaleRouting} from './beforeEnter'

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:locale(en|de)?',
      component: RouterView,
      beforeEnter: handleLocaleRouting,
      children: [
        {
          path: '',
          name: 'main',
          component: HomeView,
        },
        {
          path: ':pathMatch(.*)*',
          name: 'NotFound',
          component: HomeView,
        },
      ],
    },
  ],
})

export default router
