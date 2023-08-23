import cloudinary from "cloudinary";
import axios from "axios";

import uploadImage from "@/modules/daybook/helpers/uploadImage";

cloudinary.config({
  cloud_name: process.env.VUE_APP_CLOUDNAME,
  api_key: process.env.VUE_APP_API_KEY,
  api_secret: process.env.VUE_APP_API_SECRET,
});

describe("uploadImage Cloudinary ", () => {
  const testedImage =
    "https://res.cloudinary.com/dbr9eypvg/image/upload/v1692524181/curso-vue/kri1ul3drlebjcrtka0q.jpg";

  let createdImageByUploadImage;

  test("Should upload a file and return the url", async () => {
    //Trae una foto de Cloudinary seleccionada por nosotros
    const { data } = await axios.get(testedImage, {
      responseType: "arraybuffer",
    });

    //Reconstruimos el archivo y el segundo parámetro es el nombre que le querramos dar nosotros
    const file = new File([data], "foto.jpg");

    createdImageByUploadImage = await uploadImage(file);

    expect(typeof createdImageByUploadImage).toBe("string");

    // Divide el URL por segmentos
    const segments = createdImageByUploadImage.split("/");

    //Se toma el último segmento: "segments.length - 1" pasándolo como ubicación de mi array
    const imageId = segments[segments.length - 1].replace(".jpg", "");

    await cloudinary.v2.api.delete_resources(`curso-vue/${imageId}`);
  });

  test("The image should not exist", async () => {
    //Para probar que la prueba falle, reasignamos la variable createdImageByUploadImage con una imagen existente. Para que pase, comentamos esta variable así no la tiene en cuenta
    // createdImageByUploadImage = testedImage;

    try {
      const { status } = await axios.get(createdImageByUploadImage, {
        responseType: "arraybuffer",
      });

      // Si llega aquí, significa que la imagen existe, lo cual no es lo que esperamos.
      // Así que forzamos a que la prueba falle.
      expect(true).toBe(false);
    } catch (error) {
      // Aquí estamos esperando que el error tenga un código de estado 404.
      expect(error.response.status).toBe(404);
    }
  });
});
