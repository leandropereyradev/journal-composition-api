import { journalState } from "../../../../mocks/test-journal-state";
import createVuexStore from "../../../../mocks/createVuexStore";
import authAPI from "@/api/authAPI";

describe("Vuex - Journal Module testing", () => {
  beforeAll(async () => {
    const { data } = await authAPI.post(":signInWithPassword", {
      email: "test@test.com",
      password: "123456",
      returnSecureToken: true,
    });

    localStorage.setItem("idToken", data.idToken);
  });

  // State
  test("Debería tener este state", () => {
    const store = createVuexStore(journalState);
    const { isLoading, entries } = store.state.journal;

    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(journalState.entries);
  });

  // Mutations ==================
  test("Mutation: setEntries", () => {
    const store = createVuexStore({ isLoading: true, entries: [] });

    store.commit("journal/setEntries", journalState.entries);
    expect(store.state.journal.entries.length).toBe(2);

    //Al volver a crear el commit se sumarán ambos commits (2 de antes + 2 de ahora = 4 en total)
    store.commit("journal/setEntries", journalState.entries);
    expect(store.state.journal.entries.length).toBe(4);

    expect(store.state.journal.isLoading).toBeFalsy();
  });

  test("Mutation: updateEntry", () => {
    const store = createVuexStore(journalState);
    const updatedEntry = {
      id: "-NcDajnqii52q08YUU6l",
      date: 1627077227978,
      text: "Hola mundo desde pruebas",
    };

    store.commit("journal/updateEntry", updatedEntry);

    const storeEntries = store.state.journal.entries;

    expect(storeEntries.length).toBe(2);
    expect(storeEntries.find((entry) => entry.id === updatedEntry.id)).toEqual(
      updatedEntry
    );
  });

  test("Mutation: addEntry and deleteEntry", () => {
    const store = createVuexStore(journalState);

    store.commit("journal/addEntry", { id: "ABC-123", text: "Hola Mundo" });

    const stateEntries = store.state.journal.entries;

    expect(stateEntries.length).toBe(3);
    expect(stateEntries.find((entry) => entry.id === "ABC-123")).toBeTruthy();

    store.commit("journal/deleteEntry", "ABC-123");
    expect(store.state.journal.entries.length).toBe(2);
    expect(
      store.state.journal.entries.find((entry) => entry.id === "ABC-123")
    ).toBeFalsy();
  });

  // Getters ==================
  test("Getters: getEntriesByTerm and getEntryById", () => {
    const store = createVuexStore(journalState);

    const [entry1, entry2] = journalState.entries;

    //Si al getter le pasamos como argumento un string vacío, devolverá todas las entradas
    expect(store.getters["journal/getEntriesByTerm"]("").length).toBe(2);

    //Si le pasamos como argumento alguna pasala que contenda el Entry, es lo que buscará y traerá esa entrada. en este caso es la palagra "segunda"
    expect(store.getters["journal/getEntriesByTerm"]("segunda").length).toBe(1);

    expect(store.getters["journal/getEntriesByTerm"]("segunda")).toEqual([
      entry2,
    ]);

    expect(
      store.getters["journal/getEntryById"]("-NcDajnqii52q08YUU6l")
    ).toEqual(entry1);
  });

  // Actions ==================
  test("Actions: loadEntries", async () => {
    const store = createVuexStore({ isLoading: true, entries: [] });

    await store.dispatch("journal/loadEntries");

    expect(store.state.journal.entries.length).toBe(2);
  });

  test("Actions: updateEntry", async () => {
    const store = createVuexStore(journalState);

    const updatedEntry = {
      id: "-NcDajnqii52q08YUU6l",
      date: 1627077227978,
      text: "Hola mundo desde mock data",
      otroCampo: true,
      otroMas: { a: 1 },
    };

    await store.dispatch("journal/updateEntry", updatedEntry);

    expect(store.state.journal.entries.length).toBe(2);

    expect(
      store.state.journal.entries.find((entry) => entry.id === updatedEntry.id)
    ).toEqual({
      id: "-NcDajnqii52q08YUU6l",
      date: 1627077227978,
      text: "Hola mundo desde mock data",
    });
  });

  test("Actions: createEntry and deleteEntry", async () => {
    const store = createVuexStore(journalState);

    const newEntry = {
      date: 1627077227978,
      text: "Nueva entrada desde las pruebas",
    };

    const id = await store.dispatch("journal/createEntry", newEntry);

    expect(typeof id).toBe("string");

    expect(
      store.state.journal.entries.find((entry) => entry.id === id)
    ).toBeTruthy();

    await store.dispatch("journal/deleteEntry", id);

    expect(
      store.state.journal.entries.find((entry) => entry.id === id)
    ).toBeFalsy();
  });
});
