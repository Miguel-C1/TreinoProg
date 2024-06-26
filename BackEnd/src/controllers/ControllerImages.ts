import { Request, Response } from "express";
import multer from 'multer';
import ImageCreate from "../services/Images/ImageCreate";
import ImageSelect from "../services/Images/ImageSelect";
import ImageDelete from "../services/Images/ImageDelete";


class ControllerImages {

    async createImage(req: Request, res: Response) {
        try {
            console.log(req.body)
            const { idUser, image} = req.body;

            if (!image) {
                return res.status(400).send({ message: "No file uploaded" });
            }
            const data = {
                imagem: image,
                idUsuario: idUser
            }
            const imageCreate = await ImageCreate.create(data);
            if (!imageCreate) {
                return res.status(400).send({ message: "Error creating image" });
            } else {
                return res.status(201).json(imageCreate);
            }

        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }


    }

    async selectImageById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const image = await ImageSelect.selectById(id);
            res.status(200).json(image);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
    async deleteImage(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const image = await ImageDelete.delete(id);
            res.status(200).json(image);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async selectImageByUserId(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const image = await ImageSelect.selectByUserId(id);
            res.status(200).json(image);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

}

export default new ControllerImages();


