import { AppDataSource } from "../data-source";
import { Groups } from "../entity/Groups";

class DeleteGroups {
    
        async delete(id: number) {
            try {
                const groupsRepository = AppDataSource.getRepository(Groups);
                const groups = await groupsRepository.findOneBy({ id:  id, });
                if (!groups) {
                    throw new Error("Group not found");
                }
                await groupsRepository.remove(groups);
                return groups;
            } catch (error: any) {
                throw new Error(error.message);
            }
        }
} 

export default new DeleteGroups;