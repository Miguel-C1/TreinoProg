import { AppDataSource } from "../../data-source";
import { Exercise } from "../../entity/Exercises";

type data = {
    name: string;
}

class CreateExercise {
    async create(data: data) {
        try {
            const exerciseRepository = AppDataSource.getRepository(Exercise);
            const exercise = exerciseRepository.create(data);
            await exerciseRepository.save(exercise);
            return exercise;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new CreateExercise;