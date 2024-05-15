import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

type data = {
    firsName: string;
    lastName: string;
    age: number;
}

class UpdateUser {
        async update(id: number, data: data) {
            try {
                const userRepository = AppDataSource.getRepository(User);
                const user = await userRepository.findOneBy({ id: id });
                if (!user) {
                    throw new Error("User not found");
                }
                await userRepository.update(id, data);
                return user;
            } catch (error: any) {
                throw new Error(error.message);
            }
        }
}

export default new UpdateUser;