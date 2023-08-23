import cloudinary from "@/api/cloudinary";

const uploadImage = async (file) => {
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("upload_preset", "curso-vue");
    formData.append("file", file);

    const { data } = await cloudinary.post("/upload", formData);

    return data.secure_url;
  } catch (error) {
    console.log("Error al cargar la imagen");
    console.error(error);

    return null;
  }
};

export default uploadImage;
