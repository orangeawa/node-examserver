import { ExamRoomRepository } from '../repositories/examRoomRepository';
import { ExamRoom } from '../types/examRoom';

export class ExamRoomService {
  private examRoomRepository: ExamRoomRepository;

  constructor() {
    this.examRoomRepository = new ExamRoomRepository();
  }

  /**
   * 获取考场列表
   */
  async getAllExamRooms(pageNum: number, pageSize: number, filters?: Partial<ExamRoom>) {
    return await this.examRoomRepository.findAll(pageNum, pageSize, filters);
  }

  /**
   * 新增考场
   */
  async addExamRoom(examRoomData: Omit<ExamRoom, 'id'>) {
    if (!this.validateExamRoom(examRoomData)) {
      throw new Error('考场信息无效');
    }
    return await this.examRoomRepository.create(examRoomData);
  }

  /**
   * 更新考场
   */
  async updateExamRoom(id: number, examRoomData: Partial<ExamRoom>) {
    if (!this.validateExamRoom(examRoomData)) {
      throw new Error('考场信息无效');
    }
    return await this.examRoomRepository.update(id, examRoomData);
  }

  /**
   * 删除考场
   */
  async deleteExamRoom(id: number) {
    return await this.examRoomRepository.delete(id);
  }

  /**
   * 验证考场信息
   */
  private validateExamRoom(examRoom: Partial<ExamRoom>): boolean {
    if (examRoom.room_name && examRoom.room_name.length > 26) {
      throw new Error('考场名称过长');
    }
    if (examRoom.capacity && (examRoom.capacity <= 0 || examRoom.capacity > 200)) {
      throw new Error('考场容量必须在1-200人之间');
    }
    return true;
  }
} 