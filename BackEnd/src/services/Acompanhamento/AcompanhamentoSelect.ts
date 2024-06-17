import { AppDataSource } from "../../data-source";
import { Acompanhamento } from "../../entity/Acompanhamento";

type data = {
    data: Date;
}

class AcompanhamentoSelect {

    async selectById(id: number) {
        try {
            const acompanhamentoRepository = AppDataSource.getRepository(Acompanhamento);
            const acompanhamento = await acompanhamentoRepository.findOneBy({ id: id });
            if (!acompanhamento) {
                throw new Error("Acompanhamento not found");
            }
            return acompanhamento;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async selectByUserId(userId: number) {
        try {
            const acompanhamentoRepository = AppDataSource.getRepository(Acompanhamento);
            const acompanhamento = await acompanhamentoRepository.find({where: {users: {id: userId}}});
            if (!acompanhamento) {
                throw new Error("Acompanhamento not found");
            }
            return acompanhamento;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

}

export default new AcompanhamentoSelect;