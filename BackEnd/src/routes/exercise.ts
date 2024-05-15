import { Router } from "express";
import ControllerExercise from '../controllers/ControllerExercise';

const router = Router();

router.post('/', ControllerExercise.createExercise);
router.get('/', ControllerExercise.selectExercise);
router.get('/:id', ControllerExercise.selectExerciseById);
router.put('/:id', ControllerExercise.updateExercise);
router.delete('/:id', ControllerExercise.deleteExercise);

export default router;