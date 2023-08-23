import { shallowMount } from "@vue/test-utils";
import Fab from "@/modules/daybook/components/Fab.vue";

describe("Fab compontent", () => {
  test("Should show the icon by default", () => {
    const wrapper = shallowMount(Fab);
    const iTag = wrapper.find("i");

    expect(iTag.classes("fa-plus")).toBeTruthy();
  });

  test("Should show the icon per argument: fa-circle", () => {
    const wrapper = shallowMount(Fab, {
      props: {
        icon: "fa-circle",
      },
    });

    const iTag = wrapper.find("i");

    expect(iTag.classes("fa-circle")).toBeTruthy();
  });

  test("Should emit the on:click event when clicked", () => {
    const wrapper = shallowMount(Fab);

    wrapper.find("button").trigger("click");

    expect(wrapper.emitted("on:click")).toHaveLength(1);
  });
});
