import { shallowMount } from "@vue/test-utils";

import Swal from "sweetalert2";

import mockRouter from "../../../mocks/mockRouter";
import createVuexStore from "../../../mocks/createVuexStore";

import EntryView from "@/modules/daybook/views/EntryView.vue";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
}));

describe("EntryView", () => {
  const store = createVuexStore();
  store.dispatch = jest.fn();

  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryView, {
      props: {
        id: "-MfKM6PrX3s9QqURdLx5",
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });
  });

  test("Should remove the user because the id does not exist", () => {
    wrapper = shallowMount(EntryView, {
      props: {
        id: "Este ID no existe en el STORE",
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });

    expect(mockRouter.push).toHaveBeenCalledWith({ name: "non-entry" });
  });

  test("should display the input correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();

    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  test("should delete the entry and exit", (done) => {
    Swal.fire.mockReturnValueOnce(Promise.resolve({ isConfirmed: true }));

    wrapper.find(".btn-danger").trigger("click");

    expect(Swal.fire).toHaveBeenCalledWith({
      title: "Está seguro?",
      text: "Una vez borrado, no se puede recuperar",
      showDenyButton: true,
      confirmButtonText: "Sí, estoy seguro!",
    });

    setTimeout(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        "journal/deleteEntry",
        "-MfKM6PrX3s9QqURdLx5"
      );

      expect(mockRouter.push).toHaveBeenCalled();

      done();
    }, 1);
  });
});
