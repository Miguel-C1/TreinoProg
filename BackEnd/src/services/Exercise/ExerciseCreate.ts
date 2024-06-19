import { AppDataSource } from "../../data-source";
import { Exercise } from "../../entity/Exercises";
import { Groups } from "../../entity/Groups";

type data = {
    id_user: number;
    name: string;
    id_group: number;
}

class CreateExercise {
    async create(data: data) {
        try {
            const exerciseRepository = AppDataSource.getRepository(Exercise);
            const groupRepository = AppDataSource.getRepository(Groups);
            const group = await groupRepository.findOneBy({ id: data.id_group });
            const user = await groupRepository.findOneBy({ id: data.id_user });
            if (!group) {
                throw new Error("Group not found");
            }
            const newExercise = {
                user: user,
                name: data.name,
                group: group
            }

            const exercise = exerciseRepository.create(data);
            await exerciseRepository.save(newExercise);
            return exercise;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new CreateExercise;