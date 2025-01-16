import { Router } from 'express';
import { ClassController } from '../controllers/classController';

const router = Router();
const classController = new ClassController();

router.get('/', classController.getAllClasses.bind(classController));
router.post('/', classController.addClass.bind(classController));
router.put('/:id', classController.updateClass.bind(classController));
router.delete('/:id', classController.deleteClass.bind(classController));


export default router; 