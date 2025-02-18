import { Router } from 'express';
import { ExamScheduleController } from '../controllers/examScheduleController';

const router = Router();
const examScheduleController = new ExamScheduleController();

router.get('/', examScheduleController.getAllSchedules.bind(examScheduleController));
router.post('/', examScheduleController.addSchedule.bind(examScheduleController));
router.put('/:id', examScheduleController.updateSchedule.bind(examScheduleController));
router.delete('/:id', examScheduleController.deleteSchedule.bind(examScheduleController));
// 根据'考试ID'、'班级ID'和'考场ID'批量创建考试安排
// router.post('/batch', examScheduleController.batchCreateSchedules.bind(examScheduleController));
// 根据'考试ID'和'班级ID'批量创建考试安排
// todo: 需要解决同一时间段内不同考试不能在同一考场内排考问题
router.post('/batch_by_exam_and_class', examScheduleController.batchCreateSchedulesByExamAndClass.bind(examScheduleController));
// 获取考试安排的座位信息：返回总坐位数、剩余座位数
router.get('/seats/:exam_id', examScheduleController.getExamRoomSeats.bind(examScheduleController));
// 根据考试id获取考试所有考场安排信息：返回{班级string,考试人数number,考试地点string}[]
router.get('/rooms/:exam_id', examScheduleController.getExamRooms.bind(examScheduleController));

export default router; 