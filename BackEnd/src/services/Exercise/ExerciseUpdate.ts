import { AppDataSource } from "../../data-source";
import { Exercise } from "../../entity/Exercises";

type data = {
    name: string;
}

class UpdateExercise {
    async update(id: number, data: data) {
        try {
            const exerciseRepository = AppDataSource.getRepository(Exercise);
            const exercise = await exerciseRepository.findOneBy({ id: id });
            if (!exercise) {
                throw new Error("Exercise not found");
            }
            exercise.name = data.name;
            await exerciseRepository.update(id, exercise);
            return exercise;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new UpdateExercise;
