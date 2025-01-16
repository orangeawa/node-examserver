import { Request, Response } from 'express';
import { ExamScheduleService } from '../services/examScheduleService';
import { successResponse, errorResponse } from '../utils/response';

export class ExamScheduleController {
  private examScheduleService: ExamScheduleService;

  constructor() {
    this.examScheduleService = new ExamScheduleService();
  }

  /**
   * 获取考试安排列表
   */
  getAllSchedules = async (req: Request, res: Response) => {
    try {
      const { pageNum = 1, pageSize = 10, exam_id, class_id, room_id, student_id } = req.query;
      const { rows, total } = await this.examScheduleService.getAllSchedules(
        Number(pageNum),
        Number(pageSize),
        {
          exam_id: exam_id ? Number(exam_id) : undefined,
          class_id: class_id ? Number(class_id) : undefined,
          room_id: room_id ? Number(room_id) : undefined,
          student_id: student_id ? Number(student_id) : undefined
        }
      );
      
      res.json(successResponse(rows, 'success', 201, total));
    } catch (error) {
      res.json(errorResponse((error as Error).message));
    }
  };

  /**
   * 新增考试安排
   */
  addSchedule = async (req: Request, res: Response) => {
    try {
      const { exam_id, class_id, room_id, seat_number, student_id } = req.body;
      await this.examScheduleService.addSchedule({
        exam_id: Number(exam_id),
        class_id: Number(class_id),
        room_id: Number(room_id),
        seat_number: Number(seat_number),
        student_id: Number(student_id)
      });
      res.json(successResponse(null, '考试安排创建成功'));
    } catch (error) {
      res.json(errorResponse((error as Error).message));
    }
  };

  /**
   * 批量创建考试安排
   */
  batchCreateSchedules = async (req: Request, res: Response) => {
    try {
      const { exam_id, class_ids, room_ids } = req.body;
      await this.examScheduleService.batchCreateSchedules({
        exam_id: Number(exam_id),
        class_ids: class_ids.map(Number),
        room_ids: room_ids.map(Number)
      });
      res.json(successResponse(null, '批量创建考试安排成功'));
    } catch (error) {
      res.json(errorResponse((error as Error).message));
    }
  };

  /**
   * 更新考试安排
   */
  updateSchedule = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { exam_id, class_id, room_id, seat_number, student_id } = req.body;
      await this.examScheduleService.updateSchedule(Number(id), {
        exam_id: exam_id ? Number(exam_id) : undefined,
        class_id: class_id ? Number(class_id) : undefined,
        room_id: room_id ? Number(room_id) : undefined,
        seat_number: seat_number ? Number(seat_number) : undefined,
        student_id: student_id ? Number(student_id) : undefined
      });
      res.json(successResponse(null, '考试安排更新成功'));
    } catch (error) {
      res.json(errorResponse((error as Error).message));
    }
  };

  /**
   * 删除考试安排
   */
  deleteSchedule = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.examScheduleService.deleteSchedule(Number(id));
      res.json(successResponse(null, '考试安排删除成功'));
    } catch (error) {
      res.json(errorResponse((error as Error).message));
    }
  };
} 