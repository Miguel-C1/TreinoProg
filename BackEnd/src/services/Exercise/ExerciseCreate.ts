import { AppDataSource } from "../../data-source";
import { Exercise } from "../../entity/Exercises";
import { Groups } from "../../entity/Groups";
import { User } from "../../entity/User";

type data = {
    id_user: number;
    name: string;
    id_group: number;
}

class CreateExercise {
    async create(data: data) {
        try {
            const exerciseRepository = AppDataSource.getRepository(Exercise);
            const userRepository = AppDataSource.getRepository(User);
            const groupRepository = AppDataSource.getRepository(Groups);
            const group = await groupRepository.findOneBy({ id: data.id_group });
            const user = await userRepository.findOneBy({ id: data.id_user });
            if (!group) {
                throw new Error("Group not found");
            }
            if (!user) {
                throw new Error("User not found");
            }
            const newExercise = {
                user: user,
                name: data.name,
                group: group
            }

            const exercise = exerciseRepository.create(newExercise);
            await exerciseRepository.save(exercise);
            return exercise;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new CreateExercise;