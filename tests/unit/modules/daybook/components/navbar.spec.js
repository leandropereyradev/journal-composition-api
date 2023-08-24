import { shallowMount } from "@vue/test-utils";

import Navbar from "@/modules/daybook/components/Navbar.vue";
import createVuexStore from "../../../mocks/createVuexStore";
import mockRouterCompositionAPI from "../../../mocks/routerCompositionAPI";

mockRouterCompositionAPI();

describe("Navbar component", () => {
  const store = createVuexStore({
    user: {
      name: "Juan Carlos",
      email: "juan@gmail.com",
    },
    status: "authenticated",
    idToken: "ABC",
    refreshToken: "XYZ",
  });

  beforeEach(() => jest.clearAllMocks());

  test("Should display the component correctly", () => {
    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("Should log out and redirect when clicking logout", async () => {
    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.find("button").trigger("click");

    expect(wrapper.router.push).toHaveBeenCalledWith({ name: "login" });

    expect(store.state.auth).toEqual({
      user: null,
      status: "not-authenticated",
      idToken: null,
      refreshToken: null,
    });
  });
});
