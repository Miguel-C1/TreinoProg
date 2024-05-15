import { AppDataSource } from "../../data-source";
import { Groups } from "../../entity/Groups";

class SelectGroups {
    async select() {
        try {
            const groupsRepository = AppDataSource.getRepository(Groups);
            const groups = await groupsRepository.find();
            return groups;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async selectById(id: number) {
        try {
            const groupsRepository = AppDataSource.getRepository(Groups);
            const groups = await groupsRepository.findOneBy({ id: id });
            if (!groups) {
                throw new Error("Group not found");
            }
            return groups;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async selectByName(name: string) {
        try {
            const groupsRepository = AppDataSource.getRepository(Groups);
            const groups = await groupsRepository.findOneBy({ name: name });
            if (!groups) {
                throw new Error("Group not found");
            }
            return groups;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new SelectGroups;