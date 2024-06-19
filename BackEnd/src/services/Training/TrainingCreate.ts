import { AppDataSource } from "../../data-source";
import { Training } from "../../entity/Training";
import { User } from "../../entity/User";
import { Exercise } from "../../entity/Exercises";
import { In } from "typeorm";

type data = {
    name: string;
    date: string;
    exercises: string[];
    user: number;
}

class CreateTraining {
    async create(data: data) {
        try {
            const trainingRepository = AppDataSource.getRepository(Training);
            const userRepository = AppDataSource.getRepository(User);
            const exerciseRepository = AppDataSource.getRepository(Exercise);

            // Find user by ID
            const user = await userRepository.findOneBy({ id: data.user });
            if (!user) {
                throw new Error("User not found");
            }

            // Find exercises by IDs
            const exercises = await exerciseRepository.find({ where: { id: In(data.exercises) } });
            if (exercises.length !== data.exercises.length) {
                throw new Error("Exercise not found");
            }

            // Create new Training entity
            const newTraining = new Training();
            newTraining.name = data.name;
            newTraining.date = data.date;
            newTraining.exercises = exercises;
            newTraining.user = user;

            console.log("Novo treino: ", newTraining);

            // Save the new training
            const result = await trainingRepository.save(newTraining);

            console.log("Resultado: ", result);
            return result;
        } catch (error: any) {
            console.log("Erro:", error);
            throw new Error(error.message);
        }
    }
}

export default new CreateTraining();
