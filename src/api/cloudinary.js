import axios from "axios";

const cloudname = process.env.VUE_APP_CLOUDNAME;

const cloudinary = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${cloudname}/image`,
});

export default cloudinary;
