import { AppDataSource } from "../../data-source";
import { Training } from "../../entity/Training";
import { Exercise } from "../../entity/Exercises";
import { In } from "typeorm";

type data = {
    name: string;
    date: string;
    exercises: number[];
}

class UpdateTraining {
    async update(id: number, data: data) {
        try {
            const trainingRepository = AppDataSource.getRepository(Training);
            const exerciseRepository = AppDataSource.getRepository(Exercise);
            const training = await trainingRepository.findOneBy({ id: id });
            if (!training) {
                throw new Error("Training not found");
            }
            const exercises = await exerciseRepository.find({ where: { id: In(data.exercises) } });
            if (exercises.length !== data.exercises.length) {
                throw new Error("Exercise not found");
            }
            training.name = data.name;
            training.date = data.date;
            training.exercises = exercises;
            await trainingRepository.update(id, training);
            return training;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new UpdateTraining;