import { AppDataSource } from "../../data-source";
import { Training } from "../../entity/Training";

class TrainingSelect {
    async selectById(id: number) {
        try {
            const trainingRepository = AppDataSource.getRepository(Training);
            const training = await trainingRepository.find({where: { id: id}, relations: ["exercises"]});
            if (!training) {
                throw new Error("Training not found");
            }
            return training;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async selectAll() {
        try {
            const trainingRepository = AppDataSource.getRepository(Training);
            const training = await trainingRepository.find();
            return training;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async selectByUserId(id: number) {
        try {
            const trainingRepository = AppDataSource.getRepository(Training);
            const training = await trainingRepository.find({ where: { user:{ id: id} }, relations: ['exercises']});
            if (!training) {
                throw new Error("Training not found");
            }
            return training;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async selectByName(name: string) {  
        try {
            const trainingRepository = AppDataSource.getRepository(Training);
            const training = await trainingRepository.findOneBy({ name: name });
            if (!training) {
                throw new Error("Training not found");
            }
            return training;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new TrainingSelect;