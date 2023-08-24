import { shallowMount } from "@vue/test-utils";
import Login from "@/modules/auth/views/Login.vue";

import createVuexStore from "../../../mocks/createVuexStore";
import mockRouterCompositionAPI from "../../../mocks/routerCompositionAPI";

import Swal from "sweetalert2";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn(),
}));

mockRouterCompositionAPI();

describe("Login Component", () => {
  const store = createVuexStore({
    status: "not-authenticated", // 'authenticated','not-authenticated', 'authenticating'
    user: null,
    idToken: null,
    refreshToken: null,
  });

  store.dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("Should match the snapshot", () => {
    const wrapper = shallowMount(Login, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("Wrong credentials, trigger SWAL", async () => {
    store.dispatch.mockReturnValueOnce({
      ok: false,
      message: "Error en credenciales",
    });

    const wrapper = shallowMount(Login, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.find("form").trigger("submit");

    expect(store.dispatch).toHaveBeenCalledWith("auth/signInUser", {
      email: "",
      password: "",
    });

    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "Error en credenciales",
      "error"
    );
  });

  test("Should redirect to non-entry route", async () => {
    store.dispatch.mockReturnValueOnce({ ok: true });

    const wrapper = shallowMount(Login, {
      global: {
        plugins: [store],
      },
    });

    const [txtEmail, txtPassword] = wrapper.findAll("input");
    await txtEmail.setValue("fernando@gmail.com");
    await txtPassword.setValue("123456");

    await wrapper.find("form").trigger("submit");

    expect(store.dispatch).toHaveBeenCalledWith("auth/signInUser", {
      email: "fernando@gmail.com",
      password: "123456",
    });

    expect(wrapper.router.push).toHaveBeenCalledWith({ name: "non-entry" });
  });
});
