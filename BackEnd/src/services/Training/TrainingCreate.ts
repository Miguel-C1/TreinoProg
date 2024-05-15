import { AppDataSource } from "../../data-source";
import { Training } from "../../entity/Training";
import { User } from "../../entity/User";
import { Exercise } from "../../entity/Exercises";
import { In } from "typeorm";

type data = {
    name: string;
    date: string;
    exercises: number[];
    user: number;
}

type training = {
    name: string;
    date: string;
    exercises: Exercise[];
    user: User;
}

class CreateTraining {
    async create(data: data) {
        try {
            const trainingRepository = AppDataSource.getRepository(Training);
            const userRepository = AppDataSource.getRepository(User);
            const exerciseRepository = AppDataSource.getRepository(Exercise);
            const user = await userRepository.findOneBy({ id: data.user });
            if (!user) {
                throw new Error("User not found");
            }
            const exercises = await exerciseRepository.find({ where: { id: In(data.exercises) } });
            if (exercises.length !== data.exercises.length) {
                throw new Error("Exercise not found");
            }
            const newTrainig: training = { ...data, exercises: exercises, user: user }; 
            const training = trainingRepository.create(newTrainig);
            await trainingRepository.save(training);
            return training;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new CreateTraining;