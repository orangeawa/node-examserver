import { Router } from 'express';
import { ExamScheduleController } from '../controllers/examScheduleController';

const router = Router();
const examScheduleController = new ExamScheduleController();

router.get('/', examScheduleController.getAllSchedules.bind(examScheduleController));
router.post('/', examScheduleController.addSchedule.bind(examScheduleController));
router.put('/:id', examScheduleController.updateSchedule.bind(examScheduleController));
router.delete('/:id', examScheduleController.deleteSchedule.bind(examScheduleController));
// 根据'考试ID'、'班级ID'和'考场ID'批量创建考试安排
router.post('/batch', examScheduleController.batchCreateSchedules.bind(examScheduleController));
// 根据'考试ID'和'班级ID'批量创建考试安排
router.post('/batch_by_exam_and_class', examScheduleController.batchCreateSchedulesByExamAndClass.bind(examScheduleController));
// 添加新路由
router.get('/seats/:exam_id', examScheduleController.getExamRoomSeats.bind(examScheduleController));

export default router; 