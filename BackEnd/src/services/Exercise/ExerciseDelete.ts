import { AppDataSource } from "../../data-source";
import { Exercise } from "../../entity/Exercises";

class DeleteExercise {
    async delete(id: number) {
        try {
            const exerciseRepository = AppDataSource.getRepository(Exercise);
            const exercise = await exerciseRepository.findOneBy({ id: id });
            if (!exercise) {
                throw new Error("Exercise not found");
            }
            await exerciseRepository.delete(id);
            return exercise;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export  default new DeleteExercise;