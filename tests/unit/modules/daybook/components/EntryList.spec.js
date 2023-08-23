import { shallowMount } from "@vue/test-utils";

import EntryList from "@/modules/daybook/components/EntryList.vue";

import { journalState } from "../../../mocks/test-journal-state";
import createVuexStore from "../../../mocks/createVuexStore";
import mockRouter from "../../..//mocks/mockRouter";

describe("EntryList component", () => {
  const store = createVuexStore(journalState);

  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();

    wrapper = shallowMount(EntryList, {
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });
  });

  test("Should call getEntriesByTerm without term and show 2 entries and match with snapshot", () => {
    expect(wrapper.findAll("entry-stub").length).toBe(2);

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("Should call the getEntriesByTerm and filter the entries", async () => {
    const input = wrapper.find("input");
    await input.setValue("segunda");

    expect(wrapper.findAll("entry-stub").length).toBe(1);
  });

  test("The 'New' button should redirect to /new", () => {
    wrapper.find("button").trigger("click");

    expect(mockRouter.push).toHaveBeenCalledWith({
      name: "entry",
      params: { id: "new" },
    });
  });
});
