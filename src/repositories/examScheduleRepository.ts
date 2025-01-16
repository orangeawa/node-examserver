import pool from '../config/db';
import { ExamSchedule } from '../types/examSchedule';

export class ExamScheduleRepository {
  /**
   * 获取考试安排列表
   */
  async findAll(pageNum: number, pageSize: number, filters?: Partial<ExamSchedule>) {
    let sql = `
      SELECT es.*, e.course_name, c.class_code, er.room_name, s.student_name 
      FROM ExamSchedule es
      LEFT JOIN Exam e ON es.exam_id = e.id
      LEFT JOIN Class c ON es.class_id = c.id
      LEFT JOIN ExamRoom er ON es.room_id = er.id
      LEFT JOIN Student s ON es.student_id = s.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (filters?.exam_id) {
      sql += ' AND es.exam_id = ?';
      params.push(filters.exam_id);
    }
    if (filters?.class_id) {
      sql += ' AND es.class_id = ?';
      params.push(filters.class_id);
    }
    if (filters?.room_id) {
      sql += ' AND es.room_id = ?';
      params.push(filters.room_id);
    }
    if (filters?.student_id) {
      sql += ' AND es.student_id = ?';
      params.push(filters.student_id);
    }

    sql += ' ORDER BY es.exam_id, es.room_id, es.seat_number LIMIT ? OFFSET ?';
    params.push(pageSize, (pageNum - 1) * pageSize);

    const [rows] = await pool.query(sql, params);
    const [total] = await pool.query('SELECT COUNT(*) as total FROM ExamSchedule');

    return {
      rows,
      total: (total as any)[0].total
    };
  }

  /**
   * 新增考试安排
   */
  async create(schedule: Omit<ExamSchedule, 'id'>) {
    const [result] = await pool.query(
      'INSERT INTO ExamSchedule (exam_id, class_id, room_id, seat_number, student_id) VALUES (?, ?, ?, ?, ?)',
      [schedule.exam_id, schedule.class_id, schedule.room_id, schedule.seat_number, schedule.student_id]
    );
    return result;
  }

  /**
   * 批量创建考试安排
   */
  async batchCreate(schedules: Omit<ExamSchedule, 'id'>[]) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      for (const schedule of schedules) {
        await connection.query(
          'INSERT INTO ExamSchedule (exam_id, class_id, room_id, seat_number, student_id) VALUES (?, ?, ?, ?, ?)',
          [schedule.exam_id, schedule.class_id, schedule.room_id, schedule.seat_number, schedule.student_id]
        );
      }

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  /**
   * 更新考试安排
   */
  async update(id: number, schedule: Partial<ExamSchedule>) {
    const [result] = await pool.query(
      'UPDATE ExamSchedule SET exam_id = ?, class_id = ?, room_id = ?, seat_number = ?, student_id = ? WHERE id = ?',
      [schedule.exam_id, schedule.class_id, schedule.room_id, schedule.seat_number, schedule.student_id, id]
    );
    return result;
  }

  /**
   * 删除考试安排
   */
  async delete(id: number) {
    const [result] = await pool.query('DELETE FROM ExamSchedule WHERE id = ?', [id]);
    return result;
  }

  /**
   * 检查考场容量
   * @param room_id 考场ID
   * @param exam_id 考试ID
   * @returns 是否容量充足(true: 容量充足, false: 容量不足)
   */
  async checkRoomCapacity(room_id: number, exam_id: number): Promise<boolean> {
    const [rows] = await pool.query(
      'SELECT er.capacity, COUNT(es.id) as current_count FROM ExamRoom er LEFT JOIN ExamSchedule es ON er.id = es.room_id AND es.exam_id = ? WHERE er.id = ? GROUP BY er.id',
      [exam_id, room_id]
    );
    const result = rows as any[];
    if (result.length === 0) return false;
    return result[0].current_count < result[0].capacity;
  }

  /**
   * 获取考场已占用的座位号
   * @param room_id 考场ID
   * @param exam_id 考试ID
   * @returns 已占用的座位号数组
   */
  async getOccupiedSeats(room_id: number, exam_id: number): Promise<number[]> {
    const [rows] = await pool.query(
      'SELECT seat_number FROM ExamSchedule WHERE room_id = ? AND exam_id = ?',
      [room_id, exam_id]
    );
    return (rows as any[]).map(row => row.seat_number);
  }

  /**
   * 获取班级学生列表
   * @param class_id 班级ID
   * @returns 学生列表
   */
  async getStudentsByClassId(class_id: number): Promise<any[]> {
    const [students] = await pool.query('SELECT id FROM Student WHERE class_id = ?', [class_id]);
    return students as any[];
  }
} 