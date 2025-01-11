import { Router } from 'express';
import examRoutes from './examRoutes';
import classRoutes from './classRoutes';
import studentRoutes from './studentRoutes';
import roomRoutes from './roomRoutes';
import examArrangeRoutes from './examArrangeRoutes';

const router: Router = Router();

router.get('/', (req, res) => {
    
    res.send("后端api接口地址");
});

router.use('/exams', examRoutes);
router.use('/classes', classRoutes);
router.use('/students', studentRoutes);
router.use('/rooms', roomRoutes);
router.use('/examArrange', examArrangeRoutes);

export default router;
