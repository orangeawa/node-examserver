import { Request, Response } from 'express';
import { ExamService } from '../services/examService';
import { successResponse, errorResponse } from '../utils/response';

export class ExamController {
  private examService: ExamService;

  constructor() {
    this.examService = new ExamService();
  }

  /**
   * 获取考试列表
   * @param req 
   * @param res 
   */
  getAllExams = async (req: Request, res: Response) => {
    try {
      const { pageNum = 1, pageSize = 10, course_name, exam_time, duration } = req.query;
      const { rows, total } = await this.examService.getAllExams(
        Number(pageNum),
        Number(pageSize),
        {
          course_name: course_name as string,
          exam_time: exam_time ? new Date(exam_time as string) : undefined,
          duration: duration ? Number(duration) : undefined
        }
      );
      
      res.json(successResponse(rows, 'success', 201, total));
    } catch (error) {
      res.json(errorResponse((error as Error).message));
    }
  };

  /**
   * 新增考试
   * @param req 
   * @param res 
   */
  addExam = async (req: Request, res: Response) => {
    try {
      const { course_name, exam_time, duration, description } = req.body;
      await this.examService.addExam({
        course_name,
        exam_time: new Date(exam_time),
        duration: Number(duration),
        description
      });
      res.json(successResponse(null, '考试创建成功'));
    } catch (error) {
      res.json(errorResponse((error as Error).message));
    }
  };

  /**
   * 更新考试
   * @param req 
   * @param res 
   */
  updateExam = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { course_name, exam_time, duration, description } = req.body;
      await this.examService.updateExam(Number(id), {
        course_name,
        exam_time: exam_time ? new Date(exam_time) : undefined,
        duration: duration ? Number(duration) : undefined,
        description
      });
      res.json(successResponse(null, '考试更新成功'));
    } catch (error) {
      res.json(errorResponse((error as Error).message));
    }
  };

  /**
   * 删除考试
   * @param req 
   * @param res 
   */
  deleteExam = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.examService.deleteExam(Number(id));
      res.json(successResponse(null, '考试删除成功'));
    } catch (error) {
      res.json(errorResponse((error as Error).message));
    }
  };
} 