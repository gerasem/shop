import { createRouter, createWebHistory, type Router, RouterView } from "vue-router";
import { handleLocaleRouting } from "./beforeEnter";
import HomeView from "@/views/HomeView.vue";

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:locale(en|de)?",
      component: RouterView,
      beforeEnter: handleLocaleRouting,
      children: [
        {
          path: "",
          name: "main",
          component: HomeView,
        },
        {
          path: "category",
          name: "all-items",
          component: () => import("@/views/AllItemsView.vue"),
        },
        {
          path: "category/:slug",
          name: "catalog",
          component: () => import("@/views/CategoryView.vue"),
        },
        {
          path: "item/:slug?",
          name: "item",
          component: () => import("@/views/ItemView.vue"),
        },
        {
          path: "contact",
          name: "contact",
          component: () => import("@/views/ContactView.vue"),
        },
        {
          path: "cart",
          name: "cart",
          component: () => import("@/views/CartView.vue"),
        },
      ],
    },
  ],
});

export default router;
