export default {
  path: "/daybook",
  name: "daybook",
  component: () =>
    import(
      /* webpackChunkName: "Daybook Layout" */ "@/modules/daybook/layouts/DaybookLayout.vue"
    ),
  children: [
    {
      path: "",
      name: "non-entry",
      component: () =>
        import(
          /* webpackChunkName: "Daybook Non-Entry" */ "@/modules/daybook/views/EntryNonSelected.vue"
        ),
    },
    {
      path: ":id",
      name: "entry",
      component: () =>
        import(
          /* webpackChunkName: "Daybook Non-Entry" */ "@/modules/daybook/views/EntryView.vue"
        ),
      props: (route) => {
        return {
          id: route.params.id,
        };
      },
    },
  ],
};
