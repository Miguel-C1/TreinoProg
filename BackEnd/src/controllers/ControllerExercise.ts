import { Request, Response } from "express";
import CreateExercise from "../services/Exercise/ExerciseCreate";
import SelectExercise from "../services/Exercise/ExerciseSelect";
import UpdateExercise from "../services/Exercise/ExerciseUpdate";
import DeleteExercise from "../services/Exercise/ExerciseDelete";

class ControllerExercise {

    async createExercise(req: Request, res: Response) {
        try {
            const exercise = await CreateExercise.create(req.body);
            res.status(201).json(exercise);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async selectExercise(req: Request, res: Response) {
        try {
            const exercise = await SelectExercise.select();
            res.status(200).json(exercise);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
    
    async selectExerciseById(req: Request, res: Response) {
        try {
            const exercise = await SelectExercise.selectById(Number(req.params.id));
            res.status(200).json(exercise);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateExercise(req: Request, res: Response) {
        try {
            const exercise = await UpdateExercise.update(Number(req.params.id), req.body);
            res.status(200).json(exercise);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteExercise(req: Request, res: Response) {
        try {
            const exercise = await DeleteExercise.delete(Number(req.params.id));
            res.status(200).json(exercise);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new ControllerExercise();