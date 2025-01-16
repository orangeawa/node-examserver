import { Router } from 'express';
import { ExamController } from '../controllers/examController';

const router = Router();
const examController = new ExamController();

router.get('/', examController.getAllExams.bind(examController));
router.post('/', examController.addExam.bind(examController));
router.put('/:id', examController.updateExam.bind(examController));
router.delete('/:id', examController.deleteExam.bind(examController));

export default router; 