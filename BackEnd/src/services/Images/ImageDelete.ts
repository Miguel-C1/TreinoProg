import { AppDataSource } from "../../data-source";
import { Image } from "../../entity/Image";

type data = {
    data: Buffer;
}

class ImageDelete {

    async delete(id: number) {
        try {
            const imageRepository = AppDataSource.getRepository(Image);
            const image = await imageRepository.findOneBy({ id: id });
            if (!image) {
                throw new Error("Image not found");
            }
            await imageRepository.remove(image);
            return image;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new ImageDelete;