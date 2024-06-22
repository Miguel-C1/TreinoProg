import { AppDataSource } from "../../data-source";
import { Image } from "../../entity/Image";

type ImageData = {
    imagem: string;
    idUsuario: number;
}

class ImageCreate {

  async create(data: ImageData) {
    try {
        const imageRepository = AppDataSource.getRepository(Image);

      const image = imageRepository.create(data);
        const resultado = await imageRepository.save(image);
        console.log("Reulstado: ")
        console.log(resultado)
      return image;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default new ImageCreate;
