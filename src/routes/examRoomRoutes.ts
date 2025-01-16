import { Router } from 'express';
import { ExamRoomController } from '../controllers/examRoomController';

const router = Router();
const examRoomController = new ExamRoomController();

router.get('/', examRoomController.getAllExamRooms.bind(examRoomController));
router.post('/', examRoomController.addExamRoom.bind(examRoomController));
router.put('/:id', examRoomController.updateExamRoom.bind(examRoomController));
router.delete('/:id', examRoomController.deleteExamRoom.bind(examRoomController));

export default router; 