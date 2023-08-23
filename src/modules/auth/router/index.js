export default {
  path: "/auth",
  name: "auth",
  component: () =>
    import(
      /* webpackChunkName: "Auth Layout" */ "@/modules/auth/layouts/AuthLayout.vue"
    ),
  children: [],
};
