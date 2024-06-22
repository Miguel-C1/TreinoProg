import { Router } from 'express';
import multer from 'multer';
import ControllerImages from '../controllers/ControllerImages';
import timeOut from 'connect-timeout';
const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rota para upload de imagens
router.post('/upload', upload.single('image'), timeOut('1m'), ControllerImages.createImage);
router.get('/image/:id', ControllerImages.selectImageById);
router.get('/user/:id', ControllerImages.selectImageByUserId);
router.delete('/image/:id', ControllerImages.deleteImage);


export default router;
