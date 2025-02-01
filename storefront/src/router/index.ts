import {createRouter, createWebHistory, type Router, RouterView} from 'vue-router'
import {handleLocaleRouting} from './beforeEnter'
import HomeView from '@/views/HomeView.vue'

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
          path: 'catalog',
          name: 'catalog',
          component: () => import("@/views/CatalogView.vue"),
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import("@/views/CartView.vue"),
        },
        {
          path: ':pathMatch(.*)*',
          name: 'NotFound',
          component: () => import("@/views/404View.vue"),
        },
      ],
    },
  ],
})

export default router
