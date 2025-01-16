import { Request, Response } from 'express';
import { ExamRoomService } from '../services/examRoomService';
import { successResponse, errorResponse } from '../utils/response';

export class ExamRoomController {
  private examRoomService: ExamRoomService;

  constructor() {
    this.examRoomService = new ExamRoomService();
  }

  /**
   * 获取考场列表
   */
  getAllExamRooms = async (req: Request, res: Response) => {
    try {
      const { pageNum = 1, pageSize = 10, room_name, capacity } = req.query;
      const { rows, total } = await this.examRoomService.getAllExamRooms(
        Number(pageNum),
        Number(pageSize),
        {
          room_name: room_name as string,
          capacity: capacity ? Number(capacity) : undefined
        }
      );
      
      res.json(successResponse(rows, 'success', 201, total));
    } catch (error) {
      res.json(errorResponse((error as Error).message));
    }
  };

  /**
   * 新增考场
   */
  addExamRoom = async (req: Request, res: Response) => {
    try {
      const { room_name, capacity } = req.body;
      await this.examRoomService.addExamRoom({
        room_name,
        capacity: Number(capacity)
      });
      res.json(successResponse(null, '考场创建成功'));
    } catch (error) {
      res.json(errorResponse((error as Error).message));
    }
  };

  /**
   * 更新考场
   */
  updateExamRoom = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { room_name, capacity } = req.body;
      await this.examRoomService.updateExamRoom(Number(id), {
        room_name,
        capacity: capacity ? Number(capacity) : undefined
      });
      res.json(successResponse(null, '考场更新成功'));
    } catch (error) {
      res.json(errorResponse((error as Error).message));
    }
  };

  /**
   * 删除考场
   */
  deleteExamRoom = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.examRoomService.deleteExamRoom(Number(id));
      res.json(successResponse(null, '考场删除成功'));
    } catch (error) {
      res.json(errorResponse((error as Error).message));
    }
  };
} 