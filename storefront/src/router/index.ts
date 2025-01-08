import {createRouter, createWebHistory, type Router, RouterView} from 'vue-router'
import {handleLocaleRouting} from './beforeEnter'
import HomeView from '@/core/views/HomeView.vue'

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
          component: () => import("@/modules/product/view/CatalogView.vue"),
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import("@/modules/cart/view/CartView.vue"),
        },
        {
          path: ':pathMatch(.*)*',
          name: 'NotFound',
          component: () => import("@/core/views/404View.vue"),
        },
      ],
    },
  ],
})

export default router
