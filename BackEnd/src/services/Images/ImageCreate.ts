import { AppDataSource } from "../../data-source";
import { Image } from "../../entity/Image";
import { User } from "../../entity/User";
import AcompanhamentoService from "../Acompanhamento/AcompanhamentoService";
type ImageData = {
  imagem: string;
  idUsuario: number;
}

class ImageCreate {

  async create(data: ImageData) {
    try {
      const imageRepository = AppDataSource.getRepository(Image);
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.find({
        where: {
          id: data.idUsuario
        }
      });
      const imagem = {
        imagem: data.imagem,
        users: user[0]
      }

      const image = imageRepository.create(imagem);
      const resultado = await imageRepository.save(image);
      console.log("Reulstado: ")
      console.log(resultado)
      if (resultado) {
       
        await AcompanhamentoService.registrarAcompanhamentoCompleto(data.idUsuario, resultado.id);
      
      }
      return image;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default new ImageCreate;
