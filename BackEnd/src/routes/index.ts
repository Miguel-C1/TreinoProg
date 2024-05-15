import { Router } from "express";
import { default as Group } from "./groups"

const router = Router();

router.use("/groups", Group);

export default router;