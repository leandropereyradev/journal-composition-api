import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home";
import mockRouter from "../mocks/mockRouter";

describe("Home View", () => {
  test("Should render the component correctly", () => {
    const wrapper = shallowMount(Home);

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("Should redirect to no-entry on button click", () => {
    const wrapper = shallowMount(Home, {
      // global: opciones globales del componente
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });

    wrapper.find("button").trigger("click");

    expect(mockRouter.push).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith({ name: "non-entry" });
  });
});
