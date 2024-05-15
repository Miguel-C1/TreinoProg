import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

class DeleteUser {
    async delete(id: number) {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOneBy({ id: id });
            if (!user) {
                throw new Error("User not found");
            }
            await userRepository.delete(id);
            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export  default new DeleteUser;