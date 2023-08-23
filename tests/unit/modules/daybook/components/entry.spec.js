import { shallowMount } from "@vue/test-utils";
import Entry from "@/modules/daybook/components/Entry.vue";
import { journalState } from "../../../mocks/test-journal-state";
import { dateMock } from "../../../mocks/test-date";
import mockRouter from "../../..//mocks/mockRouter";

describe("Entry Component", () => {
  const testedEntry = journalState.entries[0];

  const wrapper = shallowMount(Entry, {
    props: {
      entry: testedEntry,
    },
    global: {
      mocks: {
        $router: mockRouter,
      },
    },
  });

  test("Should match the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("Should redirect on click on entry-container", () => {
    const entryContainer = wrapper.find(".entry-container");
    entryContainer.trigger("click");

    expect(mockRouter.push).toHaveBeenCalledWith({
      name: "entry",
      params: {
        id: testedEntry.id,
      },
    });
  });

  test("Computed properties", () => {
    const { date, month, yearDay } = dateMock(testedEntry.date);

    expect(wrapper.vm.day).toBe(date);
    expect(wrapper.vm.month).toBe(month);
    expect(wrapper.vm.yearDay).toBe(yearDay);
  });
});
