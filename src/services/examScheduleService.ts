import { ExamScheduleRepository } from "../repositories/examScheduleRepository";
import {
  ExamSchedule,
  BatchCreateSchedule,
  BatchCreateScheduleByExamAndClass,
} from "../types/examSchedule";

export class ExamScheduleService {
  private examScheduleRepository: ExamScheduleRepository;

  constructor() {
    this.examScheduleRepository = new ExamScheduleRepository();
  }

  /**
   * 获取考试安排列表
   */
  async getAllSchedules(
    pageNum: number,
    pageSize: number,
    filters?: Partial<ExamSchedule>
  ) {
    return await this.examScheduleRepository.findAll(
      pageNum,
      pageSize,
      filters
    );
  }

  /**
   * 新增考试安排
   */
  async addSchedule(scheduleData: Omit<ExamSchedule, "id">) {
    // 验证考场容量
    const hasCapacity = await this.examScheduleRepository.checkRoomCapacity(
      scheduleData.room_id,
      scheduleData.exam_id
    );
    if (!hasCapacity) {
      throw new Error("考场容量已满");
    }

    // 验证座位号是否已被占用
    const occupiedSeats = await this.examScheduleRepository.getOccupiedSeats(
      scheduleData.room_id,
      scheduleData.exam_id
    );
    if (occupiedSeats.includes(scheduleData.seat_number)) {
      throw new Error("该座位已被占用");
    }

    return await this.examScheduleRepository.create(scheduleData);
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
        throw new Error("考场容量已满");
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

  /**
   * 批量创建考试安排
   * todo: 函数功能有问题，后续应该删除
   */
  async batchCreateSchedules(batchData: BatchCreateSchedule) {
    const schedules: Omit<ExamSchedule, "id">[] = [];
    let seatNumber = 1;

    for (const room_id of batchData.room_ids) {
      for (const class_id of batchData.class_ids) {
        const students = await this.examScheduleRepository.getStudentsByClassId(
          class_id
        );

        for (const student of students) {
          schedules.push({
            exam_id: batchData.exam_id,
            class_id,
            room_id,
            seat_number: seatNumber++,
            student_id: student.id,
          });
        }
      }
    }

    return await this.examScheduleRepository.batchCreate(schedules);
  }

  /**
   * 根据'考试ID'和'班级ID'批量创建考试安排
   */
  async batchCreateSchedulesByExamAndClass(batchData: BatchCreateScheduleByExamAndClass) {
    // 检查考试是否存在
    const exam = await this.examScheduleRepository.getExamById(
      batchData.exam_id
    );
    if (!exam[0]) {
      throw new Error("考试不存在");
    }

    // 所有班级的学生收集到一个数组中
    const students = await this.examScheduleRepository.getStudentsByClassIds(batchData.class_ids);
    
    // 检查时间冲突
    const conflictStudents = await this.examScheduleRepository.checkStudentTimeConflict(
      batchData.exam_id,
      students.map(s => s.id)
    );
    
    if (conflictStudents.length > 0) {
      const classIds = [...new Set(students.filter(s => 
        conflictStudents.some(cs => cs.student_id === s.id)
      ).map(s => s.class_id))];
      
      const studentNames = conflictStudents.map(s => s.student_name);
      
      throw new Error(
        `该时间段内，班级【${classIds.join('、')}】有学生存在时间冲突，影响的学生【${studentNames.join('、')}】`
      );
    }

    // 列出当前考试时间段所有考场座位信息
    const availableRooms = await this.examScheduleRepository.getAvailableRooms(batchData.exam_id);

    // 检查总座位数是否足够
    const totalAvailableSeats = availableRooms.reduce((sum, room) => sum + room.remaining_seats, 0);
    if (totalAvailableSeats < students.length) {
      throw new Error(`可用座位数不足，需要 ${students.length} 个座位，但只有 ${totalAvailableSeats} 个可用座位`);
    }

    // 用于存储最终生成的考试安排对象
    const schedules: Omit<ExamSchedule, "id">[] = [];
    let studentIndex = 0;

    for (const room of availableRooms) {
      let seatIndex = room.assigned_seats + 1;

      while (seatIndex <= room.total_seats && studentIndex < students.length) {
        const student = students[studentIndex];

        schedules.push({
          exam_id: batchData.exam_id,
          class_id: student.class_id,
          room_id: room.id,
          seat_number: seatIndex,
          student_id: student.id,
        });

        seatIndex++;
        studentIndex++;
      }
      
      if (studentIndex >= students.length) {
        break;
      }
    }
    
    return await this.examScheduleRepository.batchCreate(schedules);
  }

  /**
   * 获取考试时间段的座位信息
   */
  async getExamRoomSeats(exam_id: number) {
    // 检查考试是否存在
    const exam = await this.examScheduleRepository.getExamById(exam_id);
    if (!exam[0]) {
      throw new Error("考试不存在");
    }

    const rooms = await this.examScheduleRepository.getAvailableRooms(exam_id);
    
    // 计算总数
    const totalSeats = rooms.reduce((sum, room) => sum + room.total_seats, 0);
    const availableSeats = rooms.reduce((sum, room) => sum + room.remaining_seats, 0);
    
    return {
      total_seats: totalSeats,      // 总座位数
      remaining_seats: availableSeats  // 剩余座位数
    };
  }
}
