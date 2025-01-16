import { Router } from "express";
import classRoutes from './classRoutes';
import studentRoutes from './studentRoutes';

const router: Router = Router();

router.use('/classes', classRoutes);
router.use('/students', studentRoutes);

export default router;
