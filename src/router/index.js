import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/Home.vue";

import daybookRouter from "../modules/daybook/router";
import authRouter from "../modules/auth/router";
import isAuthenticatedGuard from "@/modules/auth/router/auth-guard";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },

  //Daybook Routes
  {
    beforeEnter: [isAuthenticatedGuard],
    ...daybookRouter,
  },

  //Auth Routes
  {
    ...authRouter,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
