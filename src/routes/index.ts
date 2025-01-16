import { Router } from "express";
import classRoutes from './classRoutes';

const router: Router = Router();

router.use('/classes', classRoutes);

export default router;
