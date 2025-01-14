import { Router } from 'express';
import examRoutes from './examRoutes';
import classRoutes from './classRoutes';
import studentRoutes from './studentRoutes';
import roomRoutes from './roomRoutes';
import examArrangeRoutes from './examArrangeRoutes';
import examRoomRoutes from './examRoomRoutes';

const router: Router = Router();

router.get('/', (req, res) => {
    
    res.send("后端api接口地址");
});

// 考试
router.use('/exams', examRoutes);
// 班级
router.use('/classes', classRoutes);
// 学生
router.use('/students', studentRoutes);
// 考场
router.use('/rooms', roomRoutes);
// 考试安排
router.use('/examArrange', examArrangeRoutes);
// 考试座位
router.use('/examRoomSeat', examRoomRoutes);

export default router;
