import { Router } from 'express';
import { ExamScheduleController } from '../controllers/examScheduleController';

const router = Router();
const examScheduleController = new ExamScheduleController();

router.get('/', examScheduleController.getAllSchedules.bind(examScheduleController));
router.post('/', examScheduleController.addSchedule.bind(examScheduleController));
router.post('/batch', examScheduleController.batchCreateSchedules.bind(examScheduleController));
router.put('/:id', examScheduleController.updateSchedule.bind(examScheduleController));
router.delete('/:id', examScheduleController.deleteSchedule.bind(examScheduleController));

export default router; 