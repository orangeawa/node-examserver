import { Request, Response } from 'express';
import { ClassService } from '../services/classService';
import { successResponse, errorResponse } from '../utils/response';

export class ClassController {
  private classService: ClassService;

  constructor() {
    this.classService = new ClassService();
  }

  /**
   * 获取班级列表
   * @param req 
   * @param res 
   */
  getAllClasses = async (req: Request, res: Response) => {
    try {
      const { pageNum = 1, pageSize = 10, class_code } = req.query;
      const { rows, total} = await this.classService.getAllClasses(
        Number(pageNum),
        Number(pageSize),
        class_code as string
      );
      
      res.json(successResponse(rows, 'success', 201, total));
    } catch (error) {
      res.json(errorResponse('获取班级列表失败'));
    }
  };

  /**
   * 新增班级
   * @param req 
   * @param res 
   */
  addClass = async (req: Request, res: Response) => {
    try {
      const { class_code } = req.body;
      await this.classService.addClass(class_code);
      res.json(successResponse(null, '新增班级成功'));
    } catch (error) {
      res.json(errorResponse('新增班级失败'));
    }
  };

  /**
   * 更新班级
   * @param req 
   * @param res 
   */
  updateClass = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { class_code } = req.body;
      await this.classService.updateClass(Number(id), class_code);
      res.json(successResponse(null, '班级信息更新成功'));
    } catch (error) {
      res.json(errorResponse('更新班级失败'));
    }
  };

  /**
   * 删除班级
   * @param req 
   * @param res 
   */
  deleteClass = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.classService.deleteClass(Number(id));
      res.json(successResponse(null, '班级删除成功'));
    } catch (error) {
      res.json(errorResponse('删除班级失败'));
    }
  };
}
