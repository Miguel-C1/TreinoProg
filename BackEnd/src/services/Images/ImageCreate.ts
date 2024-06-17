import { AppDataSource } from "../../data-source";
import { Image } from "../../entity/Image";

type data = {
    data: Buffer;
}

class ImageCreate {

    async create(data: data) {
        try {
            const imageRepository = AppDataSource.getRepository(Image);
            const image = imageRepository.create(data);
            await imageRepository.save(image);
            return image;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new ImageCreate;