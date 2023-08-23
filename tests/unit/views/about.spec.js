import { shallowMount } from "@vue/test-utils";
import About from "@/views/About";

describe("About View", () => {
  test("Should render the component correctly", () => {
    const wrapper = shallowMount(About);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
