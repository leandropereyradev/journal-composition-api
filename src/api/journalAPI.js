import axios from "axios";

const journalAPI = axios.create({
  baseURL:
    "https://vue-demos-219b5-default-rtdb.europe-west1.firebasedatabase.app",
});

export default journalAPI;
