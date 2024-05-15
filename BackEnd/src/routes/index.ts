import { Router } from "express";
import { default as Group } from "./groups"
import { default as Exercise } from "./exercise"
import { default as Training } from "./training"
import { default as User } from "./user"

const router = Router();

router.use("/groups", Group);
router.use("/exercise", Exercise);
router.use("/training", Training);
router.use("/user", User);

export default router;