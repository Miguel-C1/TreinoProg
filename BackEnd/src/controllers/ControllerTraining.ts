import { Request, Response } from "express";
import CreateTraining from "../services/Training/TrainingCreate";
import UpdateTraining from "../services/Training/TrainingUpdate";
import DeleteTraining from "../services/Training/TrainingDelete";
import TrainingSelect from "../services/Training/TrainingSelect";

class ControllerTraining {
    
        async createTraining(req: Request, res: Response) {
            try {
                
                console.log(req.body);

                const training = await CreateTraining.create(req.body);
                
                res.status(201).json(training);
            } catch (error: any) {
                res.status(400).json({ message: error.message });
            }
        }
    
        async selectTraining(req: Request, res: Response) {
            try {
                const training = await TrainingSelect.selectAll();
                res.status(200).json(training);
            } catch (error: any) {
                res.status(400).json({ message: error.message });
            }
        }
        
        async selectTrainingById(req: Request, res: Response) {
            try {
                const training = await TrainingSelect.selectById(Number(req.params.id));
                res.status(200).json(training);
            } catch (error: any) {
                res.status(400).json({ message: error.message });
            }
        }
    
        async updateTraining(req: Request, res: Response) {
            try {
                const training = await UpdateTraining.update(Number(req.params.id), req.body);
                res.status(200).json(training);
            } catch (error: any) {
                res.status(400).json({ message: error.message });
            }
        }
    
        async deleteTraining(req: Request, res: Response) {
            try {
                const training = await DeleteTraining.delete(Number(req.params.id));
                res.status(200).json(training);
            } catch (error: any) {
                res.status(400).json({ message: error.message });
            }
        }
}
    
export default new ControllerTraining();