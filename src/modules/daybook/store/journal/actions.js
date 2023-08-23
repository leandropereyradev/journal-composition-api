// export const myAction = async ({commit}) => {}

import journalAPI from "@/api/journalAPI";

export const loadEntries = async ({ commit }) => {
  const { data } = await journalAPI.get("/entries.json");

  if (!data) return commit("setEntries", []);

  const entries = [];

  for (let id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id],
    });
  }

  commit("setEntries", entries);
};

export const updateEntry = async ({ commit }, entry) => {
  const { date, picture, text } = entry;

  const dataToSave = { date, picture, text };

  await journalAPI.put(`/entries/${entry.id}.json`, dataToSave);

  dataToSave.id = entry.id;

  commit("updateEntry", { ...dataToSave });
};

export const createEntry = async ({ commit }, entry) => {
  const { date, picture, text } = entry;

  const dataToSave = { date, picture, text };

  const { data } = await journalAPI.post(`/entries.json`, dataToSave);

  dataToSave.id = data.name;

  commit("addEntry", dataToSave);

  return data.name;
};

export const deleteEntry = async ({ commit }, id) => {
  await journalAPI.delete(`/entries/${id}.json`);

  commit("deleteEntry", id);
};
