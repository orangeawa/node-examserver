import { StudentRepository } from '../repositories/studentRepository';
import { Student } from '../types/student';

export class StudentService {
  private studentRepository: StudentRepository;

  constructor() {
    this.studentRepository = new StudentRepository();
  }

  /**
   * 获取学生列表
   * @param pageNum 
   * @param pageSize 
   * @param filters 
   * @returns 
   */
  async getAllStudents(pageNum: number, pageSize: number, filters?: Partial<Student>) {
    return await this.studentRepository.findAll(pageNum, pageSize, filters);
  }

  /**
   * 新增学生
   * @param studentData 
   * @returns 
   */
  async addStudent(studentData: Omit<Student, 'id'>) {
    console.log(studentData);
    
    if (!this.validateStudent(studentData)) {
      throw new Error('学生信息无效');
    }
    return await this.studentRepository.create(studentData);
  }

  /**
   * 更新学生信息
   * @param id 
   * @param studentData 
   * @returns 
   */
  async updateStudent(id: number, studentData: Partial<Student>) {
    if (!this.validateStudent(studentData)) {
      throw new Error('学生信息无效');
    }
    return await this.studentRepository.update(id, studentData);
  }

  /**
   * 删除学生
   * @param id 
   * @returns 
   */
  async deleteStudent(id: number) {
    return await this.studentRepository.delete(id);
  }

  /**
   * 批量导入学生
   * @param students 
   * @returns 
   */
  async batchAddStudent(students: Omit<Student, 'id'>[]) {
    console.time;
    for (const student of students) {
      if (!this.validateStudent(student)) {
        throw new Error('学生信息无效');
      }
    }
    console.timeEnd;
    return await this.studentRepository.batchAddStudent(students);
  }

  /**
   * 验证学生信息
   * @param student 
   * @returns boolean
   */
  private validateStudent(student: Partial<Student>): boolean {
    if (student.student_id && student.student_id.length > 10) {
      return false;
    }
    if (student.student_name && student.student_name.length > 26) {
      return false;
    }
    return true;
  }
} 