import { ClassRepository } from '../repositories/classRepository';

export class ClassService {
  private classRepository: ClassRepository;

  constructor() {
    this.classRepository = new ClassRepository();
  }

  /**
   * 获取班级列表
   * @param pageNum 
   * @param pageSize 
   * @param class_code 
   * @returns 
   */
  async getAllClasses(pageNum: number, pageSize: number, class_code?: string) {
    return await this.classRepository.findAll(pageNum, pageSize, class_code);
  }

  /**
   * 新增班级
   * @param class_code 
   * @returns 
   */
  async addClass(class_code: string) {
    if (!class_code || class_code.length > 10) {
      throw new Error('班级代码无效');
    }
    return await this.classRepository.create(class_code);
  }

  /**
   * 更新班级
   * @param id 
   * @param class_code 
   * @returns 
   */
  async updateClass(id: number, class_code: string) {
    if (!class_code || class_code.length > 10) {
      throw new Error('班级代码无效');
    }
    return await this.classRepository.update(id, class_code);
  }

  /**
   * 删除班级
   * @param id 
   * @returns 
   */
  async deleteClass(id: number) {
    return await this.classRepository.delete(id);
  }

  /**
   * 根据学生表更新班级人数
   */
  async updateClassStudentCount(id: number) {
    return await this.classRepository.updateClassStudentCount(id);
  }

  /**
   * 批量添加班级
   * @param classCodes 
   * @returns 
   */
  async batchAddClass(classCodes: string[]) {
    return await this.classRepository.batchAddClass(classCodes);
  }
}
