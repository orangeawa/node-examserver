import { Router } from 'express';
import examRoutes from './examRoutes';
import classRoutes from './classRoutes';
import studentRoutes from './studentRoutes';
import roomRoutes from './roomRoutes';

const router: Router = Router();

router.get('/', (req, res) => {
    
    res.send("后端api接口地址");
});

router.use('/exams', examRoutes);
router.use('/classes', classRoutes);
router.use('/students', studentRoutes);
router.use('/rooms', roomRoutes);

export default router;
