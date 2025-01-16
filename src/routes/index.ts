import { Router } from "express";
import classRoutes from './classRoutes';
import studentRoutes from './studentRoutes';
import examRoutes from './examRoutes';

const router: Router = Router();

router.use('/classes', classRoutes);
router.use('/students', studentRoutes);
router.use('/exams', examRoutes);

export default router;
