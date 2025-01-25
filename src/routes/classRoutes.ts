import { Router } from 'express';
import { ClassController } from '../controllers/classController';

const router = Router();
const classController = new ClassController();

router.get('/', classController.getAllClasses.bind(classController));
router.post('/', classController.addClass.bind(classController));
router.put('/:id', classController.updateClass.bind(classController));
router.delete('/:id', classController.deleteClass.bind(classController));
router.get('/update_student_count/:id', classController.updateClassStudentCount.bind(classController));
// 批量添加班级请求
router.post('/batch_add', classController.batchAddClass.bind(classController));

export default router; 