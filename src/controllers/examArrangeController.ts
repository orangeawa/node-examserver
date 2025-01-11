import { Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils/response';
import { getAllExamArrange as getExamArrangeService } from '../services/examArrangeServices';

export const getAllExamArrange = async (req: Request, res: Response) => {
  try {
    const examArranges = await getExamArrangeService();
    res.json(successResponse(examArranges, '获取考试安排成功'));
  } catch (error: unknown) {
    res.json(errorResponse('获取考试安排失败'));
  }
};