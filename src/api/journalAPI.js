import axios from "axios";

const journalAPI = axios.create({
  baseURL:
    "https://vue-demos-219b5-default-rtdb.europe-west1.firebasedatabase.app",
});

journalAPI.interceptors.request.use((config) => {
  config.params = {
    auth: localStorage.getItem("idToken"),
  };

  return config;
});

export default journalAPI;
