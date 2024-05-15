import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

type data = {
    firsName: string;
    lastName: string;
    age: number;
}

class CreateUser {

    async create(data: data) {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = userRepository.create(data);
            await userRepository.save(user);
            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new CreateUser;