import { Router } from 'express';
import { StudentController } from '../controllers/studentController';

const router = Router();
const studentController = new StudentController();

router.get('/', studentController.getAllStudents.bind(studentController));
router.post('/', studentController.addStudent.bind(studentController));
router.put('/:id', studentController.updateStudent.bind(studentController));
router.delete('/:id', studentController.deleteStudent.bind(studentController));
// 批量添加学生
router.post('/batch_add',studentController.batchAddStudent.bind(studentController))

export default router; 