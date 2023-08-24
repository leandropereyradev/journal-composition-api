import { createStore } from "vuex";
import journalModule from "@/modules/daybook/store/journal";
import authModule from "@/modules/auth/store";
import { journalState } from "./test-journal-state";

const createVuexStore = (
  authInitialState,
  journalInitialState = journalState
) =>
  createStore({
    modules: {
      journal: {
        ...journalModule,
        state: { ...journalInitialState },
      },
      auth: {
        ...authModule,
        state: { ...authInitialState },
      },
    },
  });

export default createVuexStore;
