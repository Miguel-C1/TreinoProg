import { User } from "../../entity/User";
import { AppDataSource } from "../../data-source";


class UserLogin {

    async login(login: string, senha: string) {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.find({ where: { login, senha } });
            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async verifyLogin(login: string) {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.find({ where: { login } });
            return user;
        } catch (error: any) {
            throw new Error(error.message);     
        }
    }
}

export default new UserLogin;