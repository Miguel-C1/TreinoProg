import { AppDataSource } from "../../data-source";
import { Exercise } from "../../entity/Exercises";
import { Groups } from "../../entity/Groups";

type data = {
    name: string;
    id_group: number;
}

class UpdateExercise {
    async update(id: number, data: data) {
        try {
            const exerciseRepository = AppDataSource.getRepository(Exercise);
            const groupRepository = AppDataSource.getRepository(Groups);
            const group = await groupRepository.findOneBy({ id: data.id_group });
            const exercise = await exerciseRepository.findOneBy({ id: id });
            if (!exercise) {
                throw new Error("Exercise not found");
            }
            if (!group) {
                throw new Error("Group not found");
            }
            exercise.group = group;
            exercise.name = data.name;
            await exerciseRepository.update(id, exercise);
            return exercise;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new UpdateExercise;
