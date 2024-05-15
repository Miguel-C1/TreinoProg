import { Router } from "express";
import ControllerUser from "../controllers/ControllerUser";

const router = Router();

router.post("/", ControllerUser.createUser);
router.get("/", ControllerUser.selectUser);
router.get("/:id", ControllerUser.selectUserById);
router.put("/:id", ControllerUser.updateUser);
router.delete("/:id", ControllerUser.deleteUser);

export default router;