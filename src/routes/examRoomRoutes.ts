import express from 'express';
import { getAllExamRoom } from '../controllers/examRoomController';

const router = express.Router();

router.get('/', getAllExamRoom);
// router.post('/', addExamRoom);
// router.put('/:id', updateExamRoom);
// router.delete('/:id', deleteExamRoom);

export default router;

