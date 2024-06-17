import { AppDataSource } from "../../data-source";
import { Acompanhamento } from "../../entity/Acompanhamento";

type data = {
    data: Date;
}

class AcompanhamentoCreate {

    async create(data: data) {
        try {
            const acompanhamentoRepository = AppDataSource.getRepository(Acompanhamento);
            const acompanhamento = acompanhamentoRepository.create(data);
            await acompanhamentoRepository.save(acompanhamento);
            return acompanhamento;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new AcompanhamentoCreate;