import { Router } from 'express';
import multer from 'multer';
import  ControllerImages  from '../controllers/ControllerImages';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Rota para upload de imagens
router.post('/upload', upload.single('image'), ControllerImages.createImage);
export default router;
