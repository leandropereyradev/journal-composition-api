import journalModule from "@/modules/daybook/store/journal";
import { createStore } from "vuex";

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journalModule,
        state: { ...initialState },
      },
    },
  });

export default createVuexStore;
