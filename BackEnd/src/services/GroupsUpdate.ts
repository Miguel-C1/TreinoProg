import { AppDataSource } from "../data-source";
import { Exercise } from "../entity/Exercises";
import { Groups } from "../entity/Groups";
import { In } from "typeorm";

type data = {
    name: string;
    sub_group: string;
    exercise: number[]
}

class UpdateGroups {
        async update(id: number, data: data) {
            try {
                const groupsRepository = AppDataSource.getRepository(Groups);
                const groups = await groupsRepository.findOneBy({ id:  id, });
                if (!groups) {
                    throw new Error("Group not found");
                }
                groups.name = data.name;
                groups.sub_group = data.sub_group;
                const exercisesRepository = AppDataSource.getRepository(Exercise);
                const exercises = await exercisesRepository.find({ where: { id: In(data.exercise) } });
                groups.exercise = exercises;
                await groupsRepository.update(id, groups);
                return groups;
            } catch (error: any) {
                throw new Error(error.message);
            }
        }
}

export default new UpdateGroups;