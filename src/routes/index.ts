import { Router } from "express";
import classRoutes from './classRoutes';
import studentRoutes from './studentRoutes';
import examRoutes from './examRoutes';
import examRoomRoutes from './examRoomRoutes';
import examScheduleRoutes from './examScheduleRoutes';

const router: Router = Router();

router.use('/classes', classRoutes);
router.use('/students', studentRoutes);
router.use('/exams', examRoutes);
router.use('/exam_rooms', examRoomRoutes);
router.use('/exam_schedules', examScheduleRoutes);

export default router;
