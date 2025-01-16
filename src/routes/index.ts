import { Router } from "express";
import classRoutes from './classRoutes';
import studentRoutes from './studentRoutes';
import examRoutes from './examRoutes';
import examRoomRoutes from './examRoomRoutes';

const router: Router = Router();

router.use('/classes', classRoutes);
router.use('/students', studentRoutes);
router.use('/exams', examRoutes);
router.use('/exam_rooms', examRoomRoutes);

export default router;
