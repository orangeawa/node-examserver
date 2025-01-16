import { ExamRepository } from '../repositories/examRepository';
import { Exam } from '../types/exam';

export class ExamService {
  private examRepository: ExamRepository;

  constructor() {
    this.examRepository = new ExamRepository();
  }

  /**
   * 获取考试列表
   */
  async getAllExams(pageNum: number, pageSize: number, filters?: Partial<Exam>) {
    return await this.examRepository.findAll(pageNum, pageSize, filters);
  }

  /**
   * 新增考试
   */
  async addExam(examData: Omit<Exam, 'id'>) {
    if (!this.validateExam(examData)) {
      throw new Error('考试信息无效');
    }
    return await this.examRepository.create(examData);
  }

  /**
   * 更新考试信息
   */
  async updateExam(id: number, examData: Partial<Exam>) {
    if (!this.validateExam(examData)) {
      throw new Error('考试信息无效');
    }
    return await this.examRepository.update(id, examData);
  }

  /**
   * 删除考试
   */
  async deleteExam(id: number) {
    return await this.examRepository.delete(id);
  }

  /**
   * 验证考试信息
   */
  private validateExam(exam: Partial<Exam>): boolean {
    if (exam.course_name && exam.course_name.length > 26) {
      throw new Error('课程名称过长');
    }
    if (exam.duration && (exam.duration <= 0 || exam.duration > 300)) {
      throw new Error('考试时长必须在1-300分钟之间');
    }
    if (exam.description && exam.description.length > 255) {
      throw new Error('考试描述过长');
    }
    if (exam.exam_time && new Date(exam.exam_time) < new Date()) {
      throw new Error('考试时间不能早于当前时间');
    }
    return true;
  }
} 