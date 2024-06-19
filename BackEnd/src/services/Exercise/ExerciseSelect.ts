import { AppDataSource } from "../../data-source";
import { Exercise } from "../../entity/Exercises";

type data = {
    name: string;
}

class SelectExercise {

    async select() {
        try {
            const exerciseRepository = AppDataSource.getRepository(Exercise);
            const exercise = await exerciseRepository.find({relations: ['group']});
            return exercise;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async selectById(id: number) {
        try {
            const exerciseRepository = AppDataSource.getRepository(Exercise);
            const exercise = await exerciseRepository.find({ where: { id: id }, relations: ['group']});
            if (!exercise) {
                throw new Error("Exercise not found");
            }
            return exercise;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async selectByName(name: string) {
        try {
            const exerciseRepository = AppDataSource.getRepository(Exercise);
            const exercise = await exerciseRepository.findOneBy({ name: name });
            if (!exercise) {
                throw new Error("Exercise not found");
            }
            return exercise;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async selectByUserId(id: number) {
        try {
            const exerciseRepository = AppDataSource.getRepository(Exercise);
            const exercise = await exerciseRepository.find({ where: { id: id }, relations: ['group']});
            if (!exercise) {
                throw new Error("Exercise not found");
            }
            return exercise;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new SelectExercise;