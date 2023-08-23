import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/Home.vue";

import daybookRouter from "../modules/daybook/router";

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
    ...daybookRouter,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
