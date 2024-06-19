import { Router } from "express";
import ControllerTraining from '../controllers/ControllerTraining';

const router = Router();

router.post('/', ControllerTraining.createTraining);
router.get('/', ControllerTraining.selectTraining);
router.get('/:id', ControllerTraining.selectTrainingById);
router.put('/:id', ControllerTraining.updateTraining);
router.delete('/:id', ControllerTraining.deleteTraining);
router.get('/user/:id', ControllerTraining.selectTrainingByUserId);

export default router;