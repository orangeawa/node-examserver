import { Request, Response } from 'express';
import { StudentService } from '../services/studentService';
import { successResponse, errorResponse } from '../utils/response';

export class StudentController {
  private studentService: StudentService;

  constructor() {
    this.studentService = new StudentService();
  }

  getAllStudents = async (req: Request, res: Response) => {
    try {
      const { pageNum = 1, pageSize = 10, student_id, student_name, class_id } = req.query;
      const { rows, total } = await this.studentService.getAllStudents(
        Number(pageNum),
        Number(pageSize),
        {
          student_id: student_id as string,
          student_name: student_name as string,
          class_id: class_id ? Number(class_id) : undefined
        }
      );
      
      res.json(successResponse(rows, 'success', 201, total));
    } catch (error) {
      res.json(errorResponse('获取学生列表失败'));
    }
  };

  addStudent = async (req: Request, res: Response) => {
    try {
      const { student_id, student_name, class_id } = req.body;
      console.log(req.body);
      
      await this.studentService.addStudent({ student_id, student_name, class_id });
      res.json(successResponse(null, `新增学生${student_name}成功`));
    } catch (error) {
      res.json(errorResponse((error as Error).message));
    }
  };

  updateStudent = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { student_id, student_name, class_id } = req.body;
      await this.studentService.updateStudent(Number(id), { 
        student_id, 
        student_name, 
        class_id 
      });
      res.json(successResponse(null, '学生信息更新成功'));
    } catch (error) {
      res.json(errorResponse((error as Error).message));
    }
  };

  deleteStudent = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.studentService.deleteStudent(Number(id));
      res.json(successResponse(null, '学生删除成功'));
    } catch (error) {
      res.json(errorResponse((error as Error).message));
    }
  };

  batchAddStudent = async (req: Request, res: Response) => {
    try {
      const students = req.body
      await this.studentService.batchAddStudent(students);
      res.json(successResponse(null, '批量添加学生成功'));
    } catch (error) {
      res.json(errorResponse((error as Error).message));
    }
  }
} 