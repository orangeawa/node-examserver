import { ExamScheduleRepository } from '../repositories/examScheduleRepository';
import { ExamSchedule, BatchCreateSchedule } from '../types/examSchedule';

export class ExamScheduleService {
  private examScheduleRepository: ExamScheduleRepository;

  constructor() {
    this.examScheduleRepository = new ExamScheduleRepository();
  }

  /**
   * 获取考试安排列表
   */
  async getAllSchedules(pageNum: number, pageSize: number, filters?: Partial<ExamSchedule>) {
    return await this.examScheduleRepository.findAll(pageNum, pageSize, filters);
  }

  /**
   * 新增考试安排
   */
  async addSchedule(scheduleData: Omit<ExamSchedule, 'id'>) {
    // 验证考场容量
    const hasCapacity = await this.examScheduleRepository.checkRoomCapacity(
      scheduleData.room_id,
      scheduleData.exam_id
    );
    if (!hasCapacity) {
      throw new Error('考场容量已满');
    }

    // 验证座位号是否已被占用
    const occupiedSeats = await this.examScheduleRepository.getOccupiedSeats(
      scheduleData.room_id,
      scheduleData.exam_id
    );
    if (occupiedSeats.includes(scheduleData.seat_number)) {
      throw new Error('该座位已被占用');
    }

    return await this.examScheduleRepository.create(scheduleData);
  }

  /**
   * 批量创建考试安排
   */
  async batchCreateSchedules(batchData: BatchCreateSchedule) {
    const schedules: Omit<ExamSchedule, 'id'>[] = [];
    let seatNumber = 1;

    for (const room_id of batchData.room_ids) {
      for (const class_id of batchData.class_ids) {
        const students = await this.examScheduleRepository.getStudentsByClassId(class_id);
        
        for (const student of students) {
          schedules.push({
            exam_id: batchData.exam_id,
            class_id,
            room_id,
            seat_number: seatNumber++,
            student_id: student.id
          });
        }
      }
    }

    return await this.examScheduleRepository.batchCreate(schedules);
  }

  /**
   * 更新考试安排
   */
  async updateSchedule(id: number, scheduleData: Partial<ExamSchedule>) {
    if (scheduleData.room_id && scheduleData.exam_id) {
      const hasCapacity = await this.examScheduleRepository.checkRoomCapacity(
        scheduleData.room_id,
        scheduleData.exam_id
      );
      if (!hasCapacity) {
        throw new Error('考场容量已满');
      }
    }
    return await this.examScheduleRepository.update(id, scheduleData);
  }

  /**
   * 删除考试安排
   */
  async deleteSchedule(id: number) {
    return await this.examScheduleRepository.delete(id);
  }
} 