import { Request, Response } from 'express';
import { getAllExamRoom as getAllExamRoomService } from '../services/examRoomServices';
import { successResponse } from '../utils/response';

export const getAllExamRoom = async (req: Request, res: Response) => {
  const examRooms = await getAllExamRoomService();
  res.json(successResponse(examRooms, '获取考试座位列表成功'));
};

