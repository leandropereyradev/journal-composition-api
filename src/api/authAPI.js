import axios from "axios";

const authAPI = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/accounts",
  params: {
    key: process.env.VUE_APP_FIREBASE_KEY,
  },
});

export default authAPI;
