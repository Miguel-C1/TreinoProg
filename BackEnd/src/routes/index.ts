import { Router } from "express";
import { default as Group } from "./groups"
import { default as Exercise } from "./exercise"
import { default as Training } from "./training"
import { default as User } from "./user"
import { default as imageRoutes } from "./image"
import { default as Acompanhamento } from "./acompanhamento"
const router = Router();

router.use("/groups", Group);
router.use("/exercise", Exercise);
router.use("/training", Training);
router.use("/user", User);
router.use('/images', imageRoutes);
router.use('/acompanhamento', Acompanhamento)

export default router;