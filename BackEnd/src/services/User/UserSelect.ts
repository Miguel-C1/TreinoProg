import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

class UserSelect {
    async select() {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const users = await userRepository.find();
            return users;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async selectById(id: number) {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOneBy({ id: id });
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async selectByFirstName(firstName: string) {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOneBy({ firstName: firstName });
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new UserSelect;