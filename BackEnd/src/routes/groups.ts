import { Router } from 'express';
import ControllerGroups from '../controllers/ControllerGroups';

const router = Router();

router.post('/', ControllerGroups.createGroup);
router.get('/', ControllerGroups.selectGroups);
router.get('/:id', ControllerGroups.selectGroupById);
router.get('/name/:name', ControllerGroups.selectGroupByName);
router.put('/:id', ControllerGroups.updateGroup);
router.delete('/:id', ControllerGroups.deleteGroup);

export default router;