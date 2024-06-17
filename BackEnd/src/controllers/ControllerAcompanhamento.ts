import { Request, Response } from "express";
import CreateAcompanhamento from "../services/Acompanhamento/AcompanhamentoCreate";
import SelectAcompanhamento from "../services/Acompanhamento/AcompanhamentoSelect";

class ControllerAcompanhamento {

    async createAcompanhamento(req: Request, res: Response) {
        try {
            const acompanhamento = await CreateAcompanhamento.create(req.body);
            res.status(201).json(acompanhamento);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async selectAcompanhamentoById(req: Request, res: Response) {
        try {
            const acompanhamento = await SelectAcompanhamento.selectById(Number(req.params.id));
            res.status(200).json(acompanhamento);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async selectAcompanhamentoByUserId(req: Request, res: Response) {
        try {
            const acompanhamento = await SelectAcompanhamento.selectByUserId(Number(req.params.id));
            res.status(200).json(acompanhamento);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

}

export default new ControllerAcompanhamento();