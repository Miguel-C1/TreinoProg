import { AppDataSource } from "../../data-source";
import { Image } from "../../entity/Image";


class ImageSelect {

    async selectById(id: number) {
        try {
            const imageRepository = AppDataSource.getRepository(Image);
            const image = await imageRepository.findOneBy({ id: id });
            if (!image) {
                throw new Error("Image not found");
            }
            return image;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async selectByUserId(userId: number) {  
        try {
            const imageRepository = AppDataSource.getRepository(Image);
            const image = await imageRepository.find({where: {users: {id: userId}}});
            if (!image) {
                throw new Error("Image not found");
            }
            return image;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new ImageSelect;