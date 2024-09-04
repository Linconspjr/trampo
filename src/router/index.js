import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LaborIndex from "@/views/laboratorios/index.vue";
import LaborAdicionar from "@/views/laboratorios/adicionar.vue";
import LaborAlterar from "@/views/laboratorios/editar.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/laboratorios/tabela.vue"),
    },

    {
      path: "/laboratorios",
      name: "Laboratorios",
      component: LaborIndex,
    },
    {
      path: "/laboratorios/adicionar",
      name: "adicionar",
      component: LaborAdicionar
    },{
      path: "/laboratorios/alterar/:id",
      name: "alterar",
      component: LaborAlterar
    }
  ],
});

export default router;

