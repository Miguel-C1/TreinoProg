import { AppDataSource } from "../../data-source";
import { Training } from "../../entity/Training";

class DeleteTraining {
    async delete(id: number) {
        try {
            const trainingRepository = AppDataSource.getRepository(Training);
            const training = await trainingRepository.findOneBy({ id: id });
            if (!training) {
                throw new Error("Training not found");
            }
            await trainingRepository.remove(training);
            return training;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new DeleteTraining;