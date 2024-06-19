import { Request, Response } from "express";
import  CreateUser  from "../services/User/UserCreate";
import  DeleteUser  from "../services/User/UserDelete";
import  SelectUser  from "../services/User/UserSelect";
import UpdateUser from "../services/User/UserUpdate";
import UserLogin from "../services/User/UserLogin";

class ControllerUser {

    async createUser(req: Request, res: Response) {
        try {
            const user = await CreateUser.create(req.body);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async selectUser(req: Request, res: Response) {
        try {
            const user = await SelectUser.select();
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async selectUserById(req: Request, res: Response) {
        try {
            const user = await SelectUser.selectById(Number(req.params.id));
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const user = await UpdateUser.update(Number(req.params.id), req.body);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const user = await DeleteUser.delete(Number(req.params.id));
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const user = await UserLogin.login(req.body.login, req.body.senha);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new ControllerUser();