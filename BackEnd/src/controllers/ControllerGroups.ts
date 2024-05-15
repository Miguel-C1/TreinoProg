import { Request, Response } from "express";
import CreateGroups from "../services/Groups/GroupsCreate";
import GroupsSelect from "../services/Groups/GroupsSelect";
import UpdateGroups from "../services/Groups/GroupsUpdate";
import DeleteGroups from "../services/Groups/GroupsDelete";

class ControllerGroups {

    async createGroup(req: Request, res: Response) {
        try {
            const groups = await CreateGroups.create(req.body);
            res.status(201).json(groups);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async selectGroups(req: Request, res: Response) {
        try {
            const groups = await GroupsSelect.select();
            res.status(200).json(groups);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
    
    async selectGroupById(req: Request, res: Response) {
        try {
            const groups = await GroupsSelect.selectById(Number(req.params.id));
            res.status(200).json(groups);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async selectGroupByName(req: Request, res: Response) {
        try {
            const groups = await GroupsSelect.selectByName(req.params.name);
            res.status(200).json(groups);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateGroup(req: Request, res: Response) {
        try {
            const groups = await UpdateGroups.update(Number(req.params.id), req.body);
            res.status(200).json(groups);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteGroup(req: Request, res: Response) {
        try {
            const groups = await DeleteGroups.delete(Number(req.params.id));
            res.status(200).json(groups);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

}

export default new ControllerGroups();