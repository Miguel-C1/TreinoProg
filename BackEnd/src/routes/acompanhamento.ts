import { Router } from "express";
import { ControllerAcompanhamento } from "../controllers";

const router = Router();

router.post('/', ControllerAcompanhamento.createAcompanhamento);
router.get('/user/:id', ControllerAcompanhamento.selectAcompanhamentoByUserId);
router.get('/:id', ControllerAcompanhamento.selectAcompanhamentoById);
router.post('/user', ControllerAcompanhamento.registrarAcompanhamentoCompleto)

export default router;