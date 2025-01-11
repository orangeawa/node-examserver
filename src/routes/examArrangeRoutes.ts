import { Router } from 'express';
import { getAllExamArrange } from '../controllers/examArrangeController';

const router: Router = Router();

router.get('/', getAllExamArrange);

export default router;
