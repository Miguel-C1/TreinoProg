import { Groups } from "../../entity/Groups";
import { AppDataSource } from "../../data-source";

type data = {
    name: string;
    sub_group: string;
}

class CreateGroups {

    async create(data: data) {
        try {
            const groupsRepository = AppDataSource.getRepository(Groups);
            const groups = groupsRepository.create(data);
            await groupsRepository.save(groups);
            return groups;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new CreateGroups;